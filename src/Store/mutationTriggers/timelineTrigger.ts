/* eslint-disable import/prefer-default-export */
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from '@reduxjs/toolkit/dist/query';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';

export const postImageInTimeline = (
  trigger: MutationTrigger<
    MutationDefinition<
      PostTimelineImgPayload,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        object,
        FetchBaseQueryMeta
      >,
      'UPDATE_TIMELINE',
      TransformedTimelineImgRes,
      'adsmMainReducer'
    >
  >,
  reqBody: PostTimelineImgPayload,
  captureTriggerStatus: (state: 'LOADING' | 'SUCCESS' | 'ERROR') => void
) => {
  if (captureTriggerStatus) captureTriggerStatus('LOADING');
  trigger(reqBody)
    .unwrap()
    .then(() => {
      if (captureTriggerStatus) captureTriggerStatus('SUCCESS');
    })
    .catch(() => captureTriggerStatus('ERROR'));
};
