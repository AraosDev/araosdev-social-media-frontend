export const loginAPIResponse = {
  credentialsVerified: 'OK',
  status: 200,
  details: {
    userName: 'Seenu',
    email: 'seenu@gmail.com',
    phoneNumber: '9962268369',
    friends: ['araosDev'],
    friendRequests: {
      requestedTo: ['Prakash'],
      requestedBy: ['Deepak'],
    },
  },
};

export const loginAPIErrResponse = {
  status: 400,
  credentialsVerified: 'FAILED',
};

export const createAccountAPIRes = { status: 200, updated: 'OK' };

export const createAccountAPILimitExceedRes = {
  status: 400,
  updated: 'FAILED',
  message: 'ACCOUNT_LIMIT_EXCEEDED',
};

export const createAccountAPIExistingAcc = {
  status: 400,
  updated: 'FAILED',
  message: 'ALREADY_EXISTING_ACCOUNT',
};

export const createAccountAPIUnknownErr = {
  status: 400,
  updated: 'FAILED',
  message: 'UNKNOWN_ERROR',
};
