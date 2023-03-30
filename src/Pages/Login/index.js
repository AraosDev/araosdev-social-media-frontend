import { useLoggedInUserInfoMutation } from 'api/apiSlice';
import { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getLoggedInUserInfo } from 'Store/mutationTriggers/loginTriggers';
import './index.css';

function Login() {
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
        <h2 className="caveatBold">AraosDev</h2>
        <h2 className="caveatBold">Social Media Web App</h2>
        <hr className="my-2" style={{ border: '1px solid', width: '100%' }} />
        <Card className="m-4">
          <Card.Header as="h5" className="cardHeader caveatBold">
            Login to your account
          </Card.Header>
          <Card.Body>
            <Form className="form-grp-style">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label
                  style={{ flexDirection: 'column' }}
                  className="mx-3 d-flex justify-content-start caveatBold"
                >
                  User Name
                  <Form.Control
                    type="text"
                    placeholder="Enter your user name"
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
                  Password
                  <Form.Control
                    type="password"
                    placeholder="Type your Password"
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
                Login
              </Button>
            </Form>
            <div className="mt-3 d-flex justify-content-evenly">
              <Card.Link
                style={{ textDecoration: 'none' }}
                className="caveatBold"
                href="#"
              >
                Forgot Password?
              </Card.Link>
              <Link to="/newaccount" style={{ textDecoration: 'none' }}>
                <Card.Link
                  style={{ textDecoration: 'none' }}
                  className="caveatBold"
                  href="#"
                >
                  New Account?
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
