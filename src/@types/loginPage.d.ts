interface UserInfo {
  userName: string;
  email: string;
  phoneNumber: string;
  friends: string[];
  friendRequests: {
    requestedTo: string[];
    requestedBy: string[];
  };
}

interface LoggedUserInfoApiRes {
  status: number;
  credentialsVerified: string;
  details: UserInfo;
}

interface UserCredentials {
  username: string;
  password: string;
}

interface CreateAccountPayload {
  username: string;
  password: string;
  email: string;
  phonenumber: phnNumber;
}

interface CreateAccountSucessRes {
  status: 200;
  updated: 'OK';
}

interface CreateAccountErrRes {
  status: 400;
  updated: 'FAILED';
  message:
    | 'ACCOUNT_LIMIT_EXCEEDED'
    | 'ALREADY_EXISTING_ACCOUNT'
    | 'UNKNOWN_ERROR';
}

interface ErrorViewProps {
  setView: (state: CreateAccountStates) => void;
  errorType: string;
}

type CreateAccountStates =
  | 'CREATE_ACCOUNT'
  | 'ERROR_VIEW'
  | 'ACCOUNT_CREATED'
  | 'LOADING';

interface CreateAccountProps {
  setErrorType: React.Dispatch<React.SetStateAction<string>>;
}
