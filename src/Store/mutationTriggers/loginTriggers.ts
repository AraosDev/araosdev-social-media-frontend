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
      const { status } = res;
      if (status === 'SUCCESS') captureTriggerStatus('SUCCESS');
      else captureTriggerStatus('ERROR');
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
  captureTriggerStatus: (
    state: CreateAccountStates,
    errMessage?: string
  ) => void
) => {
  if (captureTriggerStatus) captureTriggerStatus('LOADING');
  trigger(reqBody)
    .unwrap()
    .then((res) => {
      if (res.status === 'SUCCESS') captureTriggerStatus('ACCOUNT_CREATED');
      else captureTriggerStatus('ERROR_VIEW');
    })
    .catch(() => captureTriggerStatus('ERROR_VIEW'));
};
