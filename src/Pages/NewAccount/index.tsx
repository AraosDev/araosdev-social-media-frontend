/* eslint-disable import/order */
import { useState } from 'react';

import AccountCreated from './AccountCreated';
import CreateAccount from './CreateAccount';
import ErrorView from './ErrorView';

import '../Login/index.css';

import { Loader } from 'Common/DataTransitionHandlers';
import FormHeader from 'Common/FormHeader';
import { setCreateAccountState } from 'Store/reducer/timelineReducer';
import { useAppDispatch, useAppSelector } from 'Store/store/hooks';

function NewAccount(): React.ReactElement | null {
  const { createAccountState } = useAppSelector(
    (state) => state.timelineReducer
  );
  const dispatch = useAppDispatch();

  const [errorType, setErrorType] = useState('');

  switch (createAccountState) {
    case 'CREATE_ACCOUNT': {
      return <CreateAccount setErrorType={setErrorType} />;
    }

    case 'ERROR_VIEW': {
      return (
        <ErrorView
          errorType={errorType}
          setView={(state) => dispatch(setCreateAccountState(state))}
        />
      );
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
