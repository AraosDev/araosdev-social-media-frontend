/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable simple-import-sort/imports */
import { rest } from 'msw';

import { appApiBaseURL } from 'Store/apiSlices/mainAPISlice';
import {
  loginAPIResponse,
  loginAPIErrResponse,
  createAccountAPIRes,
  createAccountAPILimitExceedRes,
  createAccountAPIExistingAcc,
  createAccountAPIUnknownErr,
} from './mockJsons/loginApiMocks';
import {
  GetTimelineApiRes,
  searchFrndsAPIErr,
  searchFrndsAPIRes,
} from './mockJsons/timelineApiMocks';

// Do not include '/' in the prefix of relative as appApiBaseURL has trailing '/'
export const getAbsoluteApiUrl = (relativePath: string) => {
  return `${appApiBaseURL}${relativePath}`;
};
const handlers = [
  rest.post(getAbsoluteApiUrl('login'), async (req, res, ctx) => {
    const { username } = await req.json();
    if (username === 'Invalid user')
      return res(ctx.status(200), ctx.json(loginAPIErrResponse));
    return res(ctx.status(200), ctx.json(loginAPIResponse));
  }),
  rest.post(getAbsoluteApiUrl('createaccount'), async (req, res, ctx) => {
    const { username } = await req.json();
    if (username === 'ACC_LIMIT_TEST_USER')
      return res(ctx.status(200), ctx.json(createAccountAPILimitExceedRes));
    if (username === 'EXISTING_USER')
      return res(ctx.status(200), ctx.json(createAccountAPIExistingAcc));
    if (username === 'UNKNOWN_USER')
      return res(ctx.status(200), ctx.json(createAccountAPIUnknownErr));
    return res(ctx.status(200), ctx.json(createAccountAPIRes));
  }),
  rest.get(
    getAbsoluteApiUrl('gcp-apis/timeline-images/seenu'),
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(GetTimelineApiRes));
    }
  ),
  rest.get(
    getAbsoluteApiUrl('searchfriends/Seenu/:searchKey'),
    (req, res, ctx) => {
      const { searchKey } = req.params;
      if (searchKey === 'Unknown Key' || !searchKey)
        return res(ctx.status(200), ctx.json(searchFrndsAPIErr));
      return res(ctx.status(200), ctx.json(searchFrndsAPIRes));
    }
  ),
];

export default handlers;
