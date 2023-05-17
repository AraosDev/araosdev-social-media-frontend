/* eslint-disable import/order */
import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

import FormHeader from '../../Common/FormHeader';

import '../Login/index.css';

import {
  CreateAccountConstants,
  LoginAccountConstants,
} from 'Common/AppLabels/LoginPageLabels';
import { useCreateAccountMutation } from 'Store/apiSlices/mainAPISlice';
import { createUserAccount } from 'Store/mutationTriggers/loginTriggers';
import { setCreateAccountState } from 'Store/reducer/timelineReducer';
import { useAppDispatch } from 'Store/store/hooks';

function CreateAccount(props: CreateAccountProps): React.ReactElement {
  const { setErrorType } = props;
  const [createAccount] = useCreateAccountMutation();
  const dispatch = useAppDispatch();
  const {
    NEWACCOUNT_HEADER,
    EMAIL_LABEL,
    EMAIL_PLACEHOLDER,
    PHN_NUMBER_LABEL,
    PHN_NUMBER_PLACEHOLDER,
    ACCOUNT_TYPE_LABEL,
    DEFAULT_OPTION,
    PRIVATE_OPTION,
    PUBLIC_OPTION,
    CONFIRM_PWD_LABEL,
    CONFIRM_PWD_PLACEHOLDER,
    CREATE_ACCOUNT,
    PWD_ERROR,
  } = CreateAccountConstants;
  const { USERNAME_LABEL, USERNAME_PLACEHOLDER, PWD_LABEL, PWD_PLACEHOLDER } =
    LoginAccountConstants;
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [phonenumber, setPhonenumber] = useState<null | string>(null);
  const [accountType, setAccountType] = useState<null | string>(null);
  const [pwdError, setPwdError] = useState(false);

  const onCreateAccount = () => {
    if (password !== confirmpassword) setPwdError(true);
    else {
      const req = { username, password, email, phonenumber };
      createUserAccount(createAccount, req, (state, errMsg) => {
        dispatch(setCreateAccountState(state));
        if (state === 'ERROR_VIEW' && errMsg) setErrorType(errMsg);
      });
    }
  };
  return (
    <div className="wrapper">
      <div className="cardWrapper">
        <FormHeader />
        <Card className="m-4">
          <Card.Header as="h5" className="cardHeader caveatBold">
            {NEWACCOUNT_HEADER}
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
                  {USERNAME_LABEL}
                  <Form.Control
                    type="text"
                    placeholder={USERNAME_PLACEHOLDER}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Label>

                <Form.Label
                  style={{ flexDirection: 'column' }}
                  className=" mx-3 d-flex justify-content-start caveatBold"
                >
                  {EMAIL_LABEL}
                  <Form.Control
                    type="email"
                    placeholder={EMAIL_PLACEHOLDER}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Label>
              </Form.Group>

              <Form.Group
                className="mb-3 d-flex justify-content-between"
                controlId="formBasicEmail"
              >
                <Form.Label
                  style={{ flexDirection: 'column' }}
                  className=" mx-3 d-flex justify-content-start caveatBold"
                >
                  {PHN_NUMBER_LABEL}
                  <Form.Control
                    type="text"
                    placeholder={PHN_NUMBER_PLACEHOLDER}
                    value={phonenumber || ''}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPhonenumber(e.target.value.replace(/\D/, ''))
                    }
                  />
                </Form.Label>
                <Form.Label
                  style={{ flexDirection: 'column' }}
                  className=" mx-3 d-flex justify-content-start caveatBold"
                >
                  {ACCOUNT_TYPE_LABEL}
                  <Form.Select
                    data-testid="account-type-dropdown"
                    value={accountType || ''}
                    onInput={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setAccountType(e.target.value)
                    }
                  >
                    <option disabled>{DEFAULT_OPTION}</option>
                    <option value={PRIVATE_OPTION}>{PRIVATE_OPTION}</option>
                    <option value={PUBLIC_OPTION}>{PUBLIC_OPTION}</option>
                  </Form.Select>
                </Form.Label>
              </Form.Group>

              <Form.Group
                className="mb-3 d-flex justify-content-between"
                controlId="formBasicPassword"
              >
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
                <Form.Label
                  style={{ flexDirection: 'column' }}
                  className="mx-3 d-flex justify-content-start caveatBold"
                >
                  {CONFIRM_PWD_LABEL}
                  <Form.Control
                    type="password"
                    placeholder={CONFIRM_PWD_PLACEHOLDER}
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Label>
              </Form.Group>

              <Button
                onClick={onCreateAccount}
                className="caveatBold loginBtn"
                style={{ color: 'black' }}
              >
                {CREATE_ACCOUNT}
              </Button>
              <div className="caveatBold" style={{ color: 'red' }}>
                {pwdError ? PWD_ERROR : ''}
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default CreateAccount;
