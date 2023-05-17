import { loginAPIResponse } from 'apiMocks/mockJsons/loginApiMocks';
import { renderWithStore, screen, waitFor } from 'test-utils/TestUtils';

import userEvent from '@testing-library/user-event';

import Timeline from '.';

const user = userEvent.setup({ applyAccept: false });

global.URL.createObjectURL = jest.fn(
  () => 'blob:http://localhost:3000/2236a1ad-5bbe-4d4e-b3b4-7ed2e36d5c7f'
);

const blob = new Blob();
const file = new File([':)'], 'profile-pic (2).jpg', {
  type: 'image/jpeg',
});
console.log(file);

describe('Testing Timeline images', () => {
  beforeEach(() => {
    const localStorageMock = jest
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation(() => {
        return JSON.stringify(loginAPIResponse);
      });
    renderWithStore(<Timeline />, { initialEntries: ['/timeline'] });
    expect(localStorageMock).toBeCalled();
  });
  it('Get Timeline images', async () => {
    expect(screen.queryByText('Loading your feeds . . .')).toBeInTheDocument();
    expect(await screen.findByText('Some crazy shit')).toBeInTheDocument();
  });
  it('Post timeline images', async () => {
    expect(await screen.findByText('Some crazy shit')).toBeInTheDocument();
    await user.click(screen.getByTestId('add-post'));
    await waitFor(
      () => expect(screen.queryByText('Add your post')).toBeInTheDocument(),
      { timeout: 1000 }
    );
    const inputElement = screen.getByTestId(
      'post-image-input'
    ) as HTMLInputElement;
    await user.upload(inputElement, file);
    /* await waitFor(() =>
      fireEvent.change(inputElement, { target: { files: [file] } })
    ); */
    expect(inputElement.files?.[0]).toStrictEqual(file);
    await waitFor(
      () =>
        expect(
          screen.getByRole('img', {
            name: 'posted-img-blob:http://localhost:3000/2236a1ad-5bbe-4d4e-b3b4-7ed2e36d5c7f',
          })
        ).toHaveAttribute(
          'src',
          'blob:http://localhost:3000/2236a1ad-5bbe-4d4e-b3b4-7ed2e36d5c7f'
        ),
      { timeout: 1000 }
    );
    await user.click(screen.getByTestId('post-image-clear'));
    expect(
      screen.queryByRole('img', {
        name: 'posted-img-blob:http://localhost:3000/2236a1ad-5bbe-4d4e-b3b4-7ed2e36d5c7f',
      })
    ).not.toBeInTheDocument();
  });
});
