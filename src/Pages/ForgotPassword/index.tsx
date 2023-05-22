import { useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import '../Login/index.css';

import AppButton, { AppButtonOutline } from 'Common/AppButton';
import { Loader } from 'Common/DataTransitionHandlers';
import FormHeader from 'Common/FormHeader';
import { useLazyForgotPasswordQuery } from 'Store/apiSlices/mainAPISlice';

function ForgotPassword() {
  const navigate = useNavigate();

  const [
    forgotPasswordTrigger,
    {
      isLoading: forgotPwdLoading,
      isSuccess: forgotPwdSuccess,
      data: forgotPwdData,
      isError: forgotPwdError,
    },
  ] = useLazyForgotPasswordQuery();

  const [userDetail, setUserDetail] = useState('');

  const getJsxContent = () => {
    if (forgotPwdLoading)
      return <Loader message="Sending a reset password link to your mail" />;
    if (forgotPwdSuccess && forgotPwdData)
      return (
        <>
          <Card.Header as="h5" className="cardHeader caveatBold">
            {forgotPwdData.status}
          </Card.Header>
          <Card.Body>
            {forgotPwdData.message}
            <Row>
              <Col>
                <AppButton
                  onClick={() => forgotPasswordTrigger(userDetail, false)}
                >
                  Resend Email
                </AppButton>
              </Col>
              <Col>
                <AppButtonOutline
                  onClick={() => navigate('/', { replace: true })}
                >
                  Back to Sign in
                </AppButtonOutline>
              </Col>
            </Row>
          </Card.Body>
        </>
      );

    if (forgotPwdError)
      return (
        <Card.Body>
          Something went wrong. Please try again.
          <Row>
            <Col>
              <AppButton onClick={() => window.location.reload()}>
                Try Again
              </AppButton>
            </Col>
            <Col>
              <AppButtonOutline
                onClick={() => navigate('/', { replace: true })}
              >
                Back to Sign in
              </AppButtonOutline>
            </Col>
          </Row>
        </Card.Body>
      );

    return (
      <>
        <Card.Header as="h5" className="cardHeader caveatBold">
          Reset your password
        </Card.Header>
        <Card.Body>
          <Form className="form-grp-style">
            <Form.Group
              className="mb-3 d-flex justify-content-between"
              controlId="formBasicEmail"
            >
              <Form.Label
                style={{ flexDirection: 'column' }}
                className="mx-3 d-flex justify-content-start caveatBold"
              >
                Username or Email or phone number
                <Form.Control
                  type="text"
                  placeholder="Type your username or email or phone number"
                  value={userDetail}
                  onChange={(e) => setUserDetail(e.target.value)}
                />
              </Form.Label>
            </Form.Group>
            <Form.Group className="d-flex justify-content-between">
              <AppButton
                className="mx-3"
                onClick={() => forgotPasswordTrigger(userDetail, false)}
              >
                Reset Password
              </AppButton>
              <AppButtonOutline
                onClick={() => navigate('/', { replace: true })}
              >
                Back to Sign in
              </AppButtonOutline>
            </Form.Group>
          </Form>
        </Card.Body>
      </>
    );
  };

  return (
    <div className="wrapper">
      <div className="cardWrapper">
        <FormHeader />
        <Card className="m-4">{getJsxContent()}</Card>
      </div>
    </div>
  );
}

export default ForgotPassword;
