import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import './index.css';

import { LoginAccountConstants } from 'Common/AppLabels/LoginPageLabels';
import { useLoggedInUserInfoMutation } from 'Store/apiSlices/mainAPISlice';
import { getLoggedInUserInfo } from 'Store/mutationTriggers/loginTriggers';

const {
  HEADER_1,
  HEADER_2,
  LOGIN_HEADER,
  USERNAME_LABEL,
  USERNAME_PLACEHOLDER,
  PWD_LABEL,
  PWD_PLACEHOLDER,
  LOGIN_BTN_LABEL,
  FORGOT_PWD,
  NEW_ACCOUNT,
} = LoginAccountConstants;

function Login(): React.ReactElement {
  const navigate = useNavigate();
  const [loggedInUserInfo] = useLoggedInUserInfoMutation();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    getLoggedInUserInfo(
      loggedInUserInfo,
      { username: userName, password },
      (state) => {
        if (state === 'SUCCESS') navigate('/timeline', { replace: true });
        else if (state === 'ERROR') alert('Login Failed !!');
      }
    );
  };

  return (
    <div className="wrapper">
      <div className="cardWrapper">
        <h2 className="caveatBold">{HEADER_1}</h2>
        <h2 className="caveatBold">{HEADER_2}</h2>
        <hr className="my-2" style={{ border: '1px solid', width: '100%' }} />
        <Card className="m-4">
          <Card.Header as="h5" className="cardHeader caveatBold">
            {LOGIN_HEADER}
          </Card.Header>
          <Card.Body>
            <Form className="form-grp-style">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label
                  style={{ flexDirection: 'column' }}
                  className="mx-3 d-flex justify-content-start caveatBold"
                >
                  {USERNAME_LABEL}
                  <Form.Control
                    type="text"
                    placeholder={USERNAME_PLACEHOLDER}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Form.Label>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label
                  style={{ flexDirection: 'column' }}
                  className="mx-3 d-flex justify-content-start caveatBold"
                >
                  {PWD_LABEL}
                  <Form.Control
                    type="password"
                    placeholder={PWD_PLACEHOLDER}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Label>
              </Form.Group>
              <Button
                onClick={onLogin}
                className="caveatBold loginBtn"
                style={{ color: 'black' }}
              >
                {LOGIN_BTN_LABEL}
              </Button>
            </Form>
            <div className="mt-3 d-flex justify-content-evenly">
              <Card.Link
                style={{ textDecoration: 'none' }}
                className="caveatBold"
                href="#"
              >
                {FORGOT_PWD}
              </Card.Link>
              <Link to="/newaccount" style={{ textDecoration: 'none' }}>
                <Card.Link
                  style={{ textDecoration: 'none' }}
                  className="caveatBold"
                >
                  {NEW_ACCOUNT}
                </Card.Link>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Login;
