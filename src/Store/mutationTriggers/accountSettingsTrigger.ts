import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from '@reduxjs/toolkit/dist/query';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';

const updateAccountInfoTrigger = (
  trigger: MutationTrigger<
    MutationDefinition<
      FormData,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        object,
        FetchBaseQueryMeta
      >,
      'UPDATE_TIMELINE',
      UpdateUserInfoApiRes,
      'adsmMainReducer'
    >
  >,
  reqBody: FormData,
  captureTriggerStatus: (
    state: GeneralSettingUpdateState,
    data?: UpdateUserInfoApiRes['user']
  ) => void
) => {
  captureTriggerStatus('LOADING');
  trigger(reqBody)
    .unwrap()
    .then((res) => {
      if (res.status === 'SUCCESS') captureTriggerStatus('LOADED', res.user);
      else captureTriggerStatus('ERROR');
    })
    .catch(() => captureTriggerStatus('ERROR'));
};

export const updateAccountPwdTrigger = (
  trigger: MutationTrigger<
    MutationDefinition<
      UpdateUserPwdApiReq,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        object,
        FetchBaseQueryMeta
      >,
      'UPDATE_TIMELINE',
      UpdateUserPwdApiRes,
      'adsmMainReducer'
    >
  >,
  reqBody: UpdateUserPwdApiReq,
  captureTriggerStatus: (
    state: GeneralSettingUpdateState,
    message?: string
  ) => void
) => {
  captureTriggerStatus('LOADING');
  trigger(reqBody)
    .unwrap()
    .then((res) => {
      if (
        res.status === 'SUCCESS' &&
        res.message === 'Password updated successfully.'
      )
        captureTriggerStatus('LOADED', res.message);
      else captureTriggerStatus('ERROR', 'Unknown error occurred');
    })
    .catch((e) => captureTriggerStatus('ERROR', e.message));
};

export default updateAccountInfoTrigger;
