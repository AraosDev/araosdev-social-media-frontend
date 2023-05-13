/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
import { renderWithStore, screen } from 'test-utils/TestUtils';

import userEvent from '@testing-library/user-event';

import Login from '.';

import { LoginAccountConstants } from 'Common/AppLabels/LoginPageLabels';

const user = userEvent.setup();

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));
const { HEADER_1, USERNAME_PLACEHOLDER, PWD_PLACEHOLDER, LOGIN_BTN_LABEL } =
  LoginAccountConstants;

const alertMock = jest.spyOn(global, 'alert').mockImplementation(() => '');
jest.spyOn(window, 'alert').mockImplementation(() => '');

describe('Testing LoginPage', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => '');
    renderWithStore(<Login />, {
      initialEntries: ['/'],
    });
    expect(screen.queryByText(HEADER_1)).toBeInTheDocument();
  });

  it('With Correct pwd and username', async () => {
    await user.type(screen.getByPlaceholderText(USERNAME_PLACEHOLDER), 'Seenu');
    await user.type(screen.getByPlaceholderText(PWD_PLACEHOLDER), 'qwerty123');
    await user.click(screen.getByText(LOGIN_BTN_LABEL));
    expect(await screen.findByText(HEADER_1)).toBeInTheDocument();
    expect(mockedUsedNavigate).toBeCalled();
  });

  it('With incorrect pwd and username', async () => {
    await user.type(
      screen.getByPlaceholderText(USERNAME_PLACEHOLDER),
      'Invalid user'
    );
    await user.type(screen.getByPlaceholderText(PWD_PLACEHOLDER), '***');
    await user.click(screen.getByText(LOGIN_BTN_LABEL));
    expect(await screen.findByText(HEADER_1)).toBeInTheDocument();
    expect(alertMock).toBeCalled();
  });
});
