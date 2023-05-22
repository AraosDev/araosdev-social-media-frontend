interface UserInfo {
  accountType: 'public' | 'private' | 'celebrity' | 'professional';
  email: string;
  followers: UserInfo[];
  following: UserInfo[];
  userName: string;
  id: string;
  phoneNumber: string;
  friends: UserInfo[];
  friendRequests: {
    requestedTo: UserInfo[];
    requestedBy: UserInfo[];
  };
}

interface LoggedUserInfoApiRes {
  status: string;
  details: UserInfo;
}

interface LogoutApiRes {
  status: string;
  message: string;
  token: string;
}

interface UserCredentials {
  userDetail: string;
  password: string;
}

interface CreateAccountPayload {
  userName: string;
  password: string;
  email: string;
  phoneNumber: string;
  confirmPassword: string;
  accountType: 'public' | 'private' | 'professional' | 'celebrity';
}

interface CreateAccountSucessRes {
  status: 'SUCCESS';
  user: {
    email: UserInfo['email'];
    phoneNumber: UserInfo['phoneNumber'];
    userName: UserInfo['username'];
  };
}

interface CreateAccountErrRes {
  status: 400;
  updated: 'FAILED';
  message:
    | 'ACCOUNT_LIMIT_EXCEEDED'
    | 'ALREADY_EXISTING_ACCOUNT'
    | 'UNKNOWN_ERROR';
}

type CreateAccountStates =
  | 'CREATE_ACCOUNT'
  | 'ERROR_VIEW'
  | 'ACCOUNT_CREATED'
  | 'LOADING';

interface ErrorViewProps {
  setView: (state: CreateAccountStates) => void;
  errorType: string;
}

interface CreateAccountProps {
  setErrorType: React.Dispatch<React.SetStateAction<string>>;
}

interface ForgotPasswordApiRes {
  status: string;
  message: string;
}

interface ResetPwdReq {
  password: string;
  confirmPassword: string;
  token: string;
}
