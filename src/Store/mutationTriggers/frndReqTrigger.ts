/* eslint-disable import/prefer-default-export */
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from '@reduxjs/toolkit/dist/query';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';

export const friendRequestTrigger = (
  trigger: MutationTrigger<
    MutationDefinition<
      frndRequestReq,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        object,
        FetchBaseQueryMeta
      >,
      'UPDATE_TIMELINE',
      string,
      'adsmMainReducer'
    >
  >,
  reqBody: frndRequestReq & {
    event?: React.MouseEvent<HTMLElement, MouseEvent>;
  },
  captureTriggerStatus: (state: string) => void
) => {
  const { event, ...restReqBody } = reqBody;
  if (captureTriggerStatus) captureTriggerStatus('LOADING');
  trigger(restReqBody)
    .unwrap()
    .then((res) => {
      if (event) {
        event.stopPropagation();
        event.preventDefault();
      }
      if (captureTriggerStatus) captureTriggerStatus(res);
    })
    .catch(() => captureTriggerStatus('ERROR'));
};
