/* eslint-disable import/order */
import { useRef, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

import StyledAccountSetting from './index.styles';

import DefaultDp from 'Assets/default.jpg';
import AppButton, { AppButtonOutline } from 'Common/AppButton';
import AppToast from 'Common/AppToast';
import { Loader } from 'Common/DataTransitionHandlers';
import { currentUserInfo } from 'Common/helperFns';
import { useUpdateCurrentUserInfoMutation } from 'Store/apiSlices/mainAPISlice';
import updateAccountInfoTrigger from 'Store/mutationTriggers/accountSettingsTrigger';

function GeneralSettings() {
  const [updateAccountTrigger] = useUpdateCurrentUserInfoMutation();

  const {
    email: mail,
    userName: name,
    phoneNumber: phoneNo,
  } = currentUserInfo();
  const imageSrc = currentUserInfo().photo || DefaultDp;

  const [updateAccountState, setUpdateAccountState] =
    useState<GeneralSettingUpdateState>('LOADED');
  const [show, setShow] = useState({ state: false, message: '' });
  const [userName, setUserName] = useState(name);
  const [email, setEmail] = useState(mail);
  const [phoneNumber, setPhoneNumber] = useState(phoneNo);
  const [currentDp, setCurrentDp] = useState(imageSrc);

  const dpFileIpRef: React.RefObject<HTMLInputElement> = useRef(null);

  const resetFields = () => {
    setUserName(name);
    setEmail(mail);
    setPhoneNumber(phoneNo);
    setCurrentDp(imageSrc);
  };

  const onSaveChanges = () => {
    const formData = new FormData();

    formData.append('userName', userName);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    if (typeof currentDp !== 'string') formData.append('photo', currentDp);

    updateAccountInfoTrigger(updateAccountTrigger, formData, (state, user) => {
      setUpdateAccountState(state);
      if (state === 'LOADED' && user) {
        const storageUserInfo = localStorage.getItem('userInfo');
        const updatedInfo = storageUserInfo
          ? { ...JSON.parse(storageUserInfo), user }
          : null;
        if (updatedInfo !== null)
          localStorage.setItem('userInfo', JSON.stringify(updatedInfo));
        setUserName(user.userName);
        setEmail(user.email);
        setPhoneNumber(user.phoneNumber);
        setShow({
          state: true,
          message: 'Account Info successfully updated',
        });
      } else if (state === 'ERROR') {
        resetFields();
        setShow({
          state: true,
          message: 'Something went wrong. Please try again !',
        });
      }
    });
  };

  return (
    <StyledAccountSetting className="h-100 py-4">
      <AppToast
        toastHeader={
          updateAccountState === 'LOADED'
            ? 'Account info updated !'
            : 'Account info update Error !!'
        }
        toastPosition="top-center"
        show={show.state}
        setShow={(state) => setShow({ state, message: '' })}
        toastBody={show.message}
      />
      {updateAccountState === 'LOADING' ? (
        <Loader message="Updating your data" />
      ) : (
        <Row className="h-100">
          <Col lg={6} xl={6}>
            <Form.Label className="caveatBold">User name</Form.Label>
            <Form.Control
              onChange={(e) => setUserName(e.target.value)}
              className="caveatBold"
              value={userName}
            />
            <Form.Label className="caveatBold">Email</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="caveatBold"
            />
            <Form.Label className="caveatBold">Phone number</Form.Label>
            <Form.Control
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              className="caveatBold"
            />
            <Row>
              <Col className="d-flex justify-content-center">
                <AppButton className="me-3" onClick={onSaveChanges}>
                  Save Changes
                </AppButton>
                <AppButtonOutline onClick={resetFields} className="mx-3">
                  Reset
                </AppButtonOutline>
              </Col>
            </Row>
          </Col>
          <Col
            lg={6}
            xl={6}
            className="d-flex justify-content-center flex-column align-items-center"
          >
            <img
              src={
                typeof currentDp === 'string'
                  ? currentDp
                  : URL.createObjectURL(currentDp)
              }
              className="dp-image"
              alt="user-dp"
            />
            <AppButtonOutline
              onClick={() => {
                if (typeof dpFileIpRef.current !== 'string')
                  dpFileIpRef.current?.click();
              }}
              className="mx-3"
            >
              Change DP
            </AppButtonOutline>
            <input
              ref={dpFileIpRef}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setCurrentDp(e.target.files[0]);
                  if (dpFileIpRef.current && dpFileIpRef.current.value)
                    dpFileIpRef.current.value = '';
                }
              }}
              type="file"
              style={{ display: 'none' }}
            />
          </Col>
        </Row>
      )}
    </StyledAccountSetting>
  );
}

export default GeneralSettings;
