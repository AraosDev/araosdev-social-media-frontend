import { useCreateAccountMutation } from 'api/apiSlice';
import React, { useState } from 'react';
import { Loader } from '../../Common/DataTransitionHandlers';
import FormHeader from '../../Common/FormHeader';
import '../Login/index.css';
import AccountCreated from './AccountCreated';
import CreateAccount from './CreateAccount';
import ErrorView from './ErrorView';

function NewAccount() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [phnNumber, setPhnNumber] = useState(null);
  const [accountType, setAccountType] = useState(null);
  const [pwdError, setPwdError] = useState(false);
  const [view, setView] = useState('CREATE_ACCOUNT');
  const [errorType, setErrorType] = useState('');
  const [createAccount, { isLoading, isError, isSuccess }] =
    useCreateAccountMutation();

  const onCreateAccount = () => {
    if (password !== confirmpassword) {
      setPwdError(true);
    } else {
      const req = {
        username: userName,
        password,
        email,
        phonenumber: phnNumber,
      };
      if (isLoading) setView('LOADING');
      createAccount(req)
        .unwrap()
        .then((res) => {
          if (isLoading) setView('LOADING');
          else if (res.status === 400 && res.updated === 'FAILED') {
            setErrorType(res.message.toUpperCase());
            setView('ERROR_VIEW');
          } else if (isSuccess && res.status === 200 && res.updated === 'OK') {
            setView('ACCOUNT_CREATED');
          }
        })
        .catch((errRes) => {
          if (isError) {
            setErrorType(errRes.message.toUpperCase());
            setView('ERROR_VIEW');
          }
        });
    }
  };

  switch (view) {
    case 'CREATE_ACCOUNT': {
      return (
        <CreateAccount
          userName={userName}
          setUserName={setUserName}
          password={password}
          setPassword={setPassword}
          email={email}
          setEmail={setEmail}
          confirmpassword={confirmpassword}
          setConfirmPassword={setConfirmPassword}
          phnNumber={phnNumber}
          setPhnNumber={setPhnNumber}
          accountType={accountType}
          setAccountType={setAccountType}
          pwdError={pwdError}
          onCreateAccount={onCreateAccount}
        />
      );
    }

    case 'ERROR_VIEW': {
      return <ErrorView errorType={errorType} setView={setView} />;
    }

    case 'ACCOUNT_CREATED': {
      return <AccountCreated />;
    }

    case 'LOADING': {
      return (
        <div className="wrapper">
          <div className="cardWrapper">
            <FormHeader />
            <Loader />
          </div>
        </div>
      );
    }

    default:
      return null;
  }
}

export default NewAccount;
