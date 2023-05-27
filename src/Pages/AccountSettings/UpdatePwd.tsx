/* eslint-disable import/order */
import { useState } from 'react';
import { Form } from 'react-bootstrap';

import { StyledUpdatePwd } from './index.styles';

import AppButton, { AppButtonOutline } from 'Common/AppButton';
import AppToast from 'Common/AppToast';
import { Loader } from 'Common/DataTransitionHandlers';
import { useUpdateCurrentUserPasswordMutation } from 'Store/apiSlices/mainAPISlice';
import { updateAccountPwdTrigger } from 'Store/mutationTriggers/accountSettingsTrigger';

function UpdatePwd() {
  const [trigger] = useUpdateCurrentUserPasswordMutation();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [updateAccPwdState, setUpdateAccPwdState] =
    useState<GeneralSettingUpdateState>('LOADED');
  const [showToast, setShowToast] = useState({ state: false, message: '' });

  const resetFields = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const onUpdatePwd = () => {
    const reqBody = { oldPassword, newPassword, confirmNewPassword };

    if (confirmNewPassword === newPassword)
      updateAccountPwdTrigger(trigger, reqBody, (state, msg) => {
        setUpdateAccPwdState(state);
        if (state === 'LOADED') {
          resetFields();
          setShowToast({
            state: true,
            message: msg || 'Password updated successfully',
          });
        }
        if (state === 'ERROR')
          setShowToast({
            state: true,
            message: msg || 'Unknown error occurred',
          });
      });
  };

  return (
    <StyledUpdatePwd fluid className="d-flex justify-content-center mt-5 h-100">
      <AppToast
        toastHeader={
          updateAccPwdState === 'LOADED'
            ? 'Passwor updated !'
            : 'Password update Error !!'
        }
        toastPosition="top-center"
        show={showToast.state}
        setShow={(state) => setShowToast({ state, message: '' })}
        toastBody={showToast.message}
      />
      {updateAccPwdState === 'LOADING' ? (
        <Loader message="Updating your password" />
      ) : (
        <Form className="mt-5">
          <Form.Group>
            <Form.Label className="caveatBold">Old Password</Form.Label>
            <Form.Control
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              type="password"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="caveatBold">New Password</Form.Label>
            <Form.Control
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="caveatBold">Confirm New Password</Form.Label>
            <Form.Control
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              type="password"
            />
          </Form.Group>
          <div className="d-flex justify-content-between">
            <AppButton onClick={onUpdatePwd}>Update Password</AppButton>
            <AppButtonOutline onClick={resetFields}>Reset</AppButtonOutline>
          </div>
        </Form>
      )}
    </StyledUpdatePwd>
  );
}

export default UpdatePwd;
