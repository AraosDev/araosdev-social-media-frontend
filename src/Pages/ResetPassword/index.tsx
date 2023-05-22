import { useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';

import '../Login/index.css';

import AppButton, { AppButtonOutline } from 'Common/AppButton';
import { Loader } from 'Common/DataTransitionHandlers';
import FormHeader from 'Common/FormHeader';
import { useResetPasswordMutation } from 'Store/apiSlices/mainAPISlice';

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [
    resetPassword,
    {
      isLoading: resetPwdLoading,
      data: resetPwdData,
      isSuccess: resetPwdSuccess,
      isError: resetPwdError,
    },
  ] = useResetPasswordMutation();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const getJsxContent = () => {
    if (resetPwdLoading) return <Loader message="Resetting your password" />;
    if (resetPwdSuccess && resetPwdData?.status === 'SUCCESS')
      navigate('/', { replace: true });
    else if (resetPwdError)
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
              <Form.Label>
                New Password
                <Form.Control
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Label>
            </Form.Group>
            <Form.Group
              className="mb-3 d-flex justify-content-between"
              controlId="formBasicEmail"
            >
              <Form.Label>
                Confirm New Password
                <Form.Control
                  value={confirmPassword}
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Label>
            </Form.Group>
            <Form.Group className="d-flex justify-content-between">
              <AppButton
                className="mx-3"
                onClick={() => {
                  if (password === confirmPassword)
                    resetPassword({
                      password,
                      confirmPassword,
                      token: searchParams.get('token') || '',
                    });
                }}
              >
                Reset Password
              </AppButton>
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

export default ResetPassword;
