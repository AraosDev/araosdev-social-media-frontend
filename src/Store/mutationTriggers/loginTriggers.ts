import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from '@reduxjs/toolkit/dist/query';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';

export const getLoggedInUserInfo = (
  trigger: MutationTrigger<
    MutationDefinition<
      UserCredentials,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        object,
        FetchBaseQueryMeta
      >,
      'UPDATE_TIMELINE',
      LoggedUserInfoApiRes,
      'adsmMainReducer'
    >
  >,
  reqBody: UserCredentials,
  captureTriggerStatus: (state: string) => void
) => {
  trigger(reqBody)
    .unwrap()
    .then((res) => {
      const { credentialsVerified: isVerified, status } = res;
      if (isVerified === 'OK' && status === 200) {
        captureTriggerStatus('SUCCESS');
      }
    })
    .catch(() => captureTriggerStatus('ERROR'));
};

export const createUserAccount = (
  trigger: MutationTrigger<
    MutationDefinition<
      CreateAccountPayload,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        object,
        FetchBaseQueryMeta
      >,
      'UPDATE_TIMELINE',
      CreateAccountSucessRes | CreateAccountErrRes,
      'adsmMainReducer'
    >
  >,
  reqBody: CreateAccountPayload,
  captureTriggerStatus: (state: string, errMessage?: string) => void
) => {
  if (captureTriggerStatus) captureTriggerStatus('LOADING');
  trigger(reqBody)
    .unwrap()
    .then((res) => {
      if (res.status === 400 && res.updated === 'FAILED' && res.message) {
        captureTriggerStatus('ERROR_VIEW', res.message.toUpperCase());
      } else if (res.status === 200 && res.updated === 'OK') {
        captureTriggerStatus('ACCOUNT_CREATED');
      }
    })
    .catch(() => captureTriggerStatus('ERROR_VIEW'));
};
