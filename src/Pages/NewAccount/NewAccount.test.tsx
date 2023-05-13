/* eslint-disable import/order */
import { renderWithStore, screen } from 'test-utils/TestUtils';

import userEvent from '@testing-library/user-event';

import NewAccount from '.';

import {
  CreateAccountConstants,
  LoginAccountConstants,
} from 'Common/AppLabels/LoginPageLabels';

const {
  NEWACCOUNT_HEADER,
  EMAIL_PLACEHOLDER,
  PHN_NUMBER_PLACEHOLDER,
  PRIVATE_OPTION,
  CONFIRM_PWD_PLACEHOLDER,
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_SUCCESS,
  PWD_ERROR,
  ACCOUNT_LIMIT_EXCEEDED,
  BACK_TO_CREATE_ACC,
  ALREADY_EXISTING_ACCOUNT,
  UNKNOWN_ERROR,
} = CreateAccountConstants;
const { USERNAME_PLACEHOLDER, PWD_PLACEHOLDER } = LoginAccountConstants;

const user = userEvent.setup();

describe('Testing New Account Page', () => {
  beforeEach(() => {
    renderWithStore(<NewAccount />, {
      initialEntries: ['/newaccount', '/newaccount'],
    });
    expect(screen.queryByText(NEWACCOUNT_HEADER)).toBeInTheDocument();
  });

  it('Creating Account Success', async () => {
    await user.type(screen.getByPlaceholderText(USERNAME_PLACEHOLDER), 'seenu');
    expect(screen.getByPlaceholderText(USERNAME_PLACEHOLDER)).toHaveValue(
      'seenu'
    );
    await user.type(
      screen.getByPlaceholderText(EMAIL_PLACEHOLDER),
      'seenu@gmail.com'
    );
    expect(screen.getByPlaceholderText(EMAIL_PLACEHOLDER)).toHaveValue(
      'seenu@gmail.com'
    );
    await user.type(
      screen.getByPlaceholderText(PHN_NUMBER_PLACEHOLDER),
      '9962268369'
    );
    await user.selectOptions(
      screen.getByTestId('account-type-dropdown'),
      PRIVATE_OPTION
    );
    expect(screen.getByTestId('account-type-dropdown')).toHaveValue(
      PRIVATE_OPTION
    );
    await user.type(screen.getByPlaceholderText(PWD_PLACEHOLDER), 'qwerty123');
    await user.type(
      screen.getByPlaceholderText(CONFIRM_PWD_PLACEHOLDER),
      'qwerty123'
    );
    await user.click(screen.getByText(CREATE_ACCOUNT));
    expect(await screen.findByText(CREATE_ACCOUNT_SUCCESS)).toBeInTheDocument();
  });

  it('Password mismatch', async () => {
    await user.type(screen.getByPlaceholderText(USERNAME_PLACEHOLDER), 'seenu');
    expect(screen.getByPlaceholderText(USERNAME_PLACEHOLDER)).toHaveValue(
      'seenu'
    );
    await user.type(
      screen.getByPlaceholderText(EMAIL_PLACEHOLDER),
      'seenu@gmail.com'
    );
    expect(screen.getByPlaceholderText(EMAIL_PLACEHOLDER)).toHaveValue(
      'seenu@gmail.com'
    );
    await user.type(
      screen.getByPlaceholderText(PHN_NUMBER_PLACEHOLDER),
      '9962268369'
    );
    await user.selectOptions(
      screen.getByTestId('account-type-dropdown'),
      PRIVATE_OPTION
    );
    expect(screen.getByTestId('account-type-dropdown')).toHaveValue(
      PRIVATE_OPTION
    );
    await user.type(screen.getByPlaceholderText(PWD_PLACEHOLDER), 'qwerty123');
    await user.type(
      screen.getByPlaceholderText(CONFIRM_PWD_PLACEHOLDER),
      'qwerty1234'
    );
    await user.click(screen.getByText(CREATE_ACCOUNT));
    expect(screen.queryByText(PWD_ERROR)).toBeInTheDocument();
  });

  it('Create Account Failure', async () => {
    await user.type(
      screen.getByPlaceholderText(USERNAME_PLACEHOLDER),
      'ACC_LIMIT_TEST_USER'
    );
    expect(screen.getByPlaceholderText(USERNAME_PLACEHOLDER)).toHaveValue(
      'ACC_LIMIT_TEST_USER'
    );
    await user.type(
      screen.getByPlaceholderText(EMAIL_PLACEHOLDER),
      'seenu@gmail.com'
    );
    expect(screen.getByPlaceholderText(EMAIL_PLACEHOLDER)).toHaveValue(
      'seenu@gmail.com'
    );
    await user.type(
      screen.getByPlaceholderText(PHN_NUMBER_PLACEHOLDER),
      '9962268369'
    );
    await user.selectOptions(
      screen.getByTestId('account-type-dropdown'),
      PRIVATE_OPTION
    );
    expect(screen.getByTestId('account-type-dropdown')).toHaveValue(
      PRIVATE_OPTION
    );
    await user.type(screen.getByPlaceholderText(PWD_PLACEHOLDER), 'qwerty123');
    await user.type(
      screen.getByPlaceholderText(CONFIRM_PWD_PLACEHOLDER),
      'qwerty123'
    );
    await user.click(screen.getByText(CREATE_ACCOUNT));
    expect(await screen.findByText(ACCOUNT_LIMIT_EXCEEDED)).toBeInTheDocument();
    await user.click(screen.getByText(BACK_TO_CREATE_ACC));
    expect(screen.queryByText(NEWACCOUNT_HEADER)).toBeInTheDocument();
  });

  it('Create Existing Account failure', async () => {
    await user.type(
      screen.getByPlaceholderText(USERNAME_PLACEHOLDER),
      'EXISTING_USER'
    );
    await user.type(
      screen.getByPlaceholderText(EMAIL_PLACEHOLDER),
      'user@gmail.com'
    );
    await user.type(
      screen.getByPlaceholderText(PHN_NUMBER_PLACEHOLDER),
      '9962268369'
    );
    await user.type(screen.getByPlaceholderText(PWD_PLACEHOLDER), 'qwerty123');
    await user.type(
      screen.getByPlaceholderText(CONFIRM_PWD_PLACEHOLDER),
      'qwerty123'
    );
    await user.click(screen.getByText(CREATE_ACCOUNT));
    expect(
      await screen.findByText(ALREADY_EXISTING_ACCOUNT)
    ).toBeInTheDocument();
  });

  it('Create Account unknown error', async () => {
    await user.type(
      screen.getByPlaceholderText(USERNAME_PLACEHOLDER),
      'UNKNOWN_USER'
    );
    await user.type(
      screen.getByPlaceholderText(EMAIL_PLACEHOLDER),
      'user@gmail.com'
    );
    await user.type(
      screen.getByPlaceholderText(PHN_NUMBER_PLACEHOLDER),
      '9962268369'
    );
    await user.type(screen.getByPlaceholderText(PWD_PLACEHOLDER), 'qwerty123');
    await user.type(
      screen.getByPlaceholderText(CONFIRM_PWD_PLACEHOLDER),
      'qwerty123'
    );
    await user.click(screen.getByText(CREATE_ACCOUNT));
    expect(await screen.findByText(UNKNOWN_ERROR)).toBeInTheDocument();
  });
});
