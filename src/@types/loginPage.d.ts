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
  setView: React.Dispatch<React.SetStateAction<string>>;
  errorType: string;
}

interface CreateAccountProps {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  confirmpassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  phnNumber: null | string;
  setPhnNumber: React.Dispatch<React.SetStateAction<string | null>>;
  accountType: null | string;
  setAccountType: React.Dispatch<React.SetStateAction<string | null>>;
  pwdError: boolean;
  onCreateAccount: () => void;
}
