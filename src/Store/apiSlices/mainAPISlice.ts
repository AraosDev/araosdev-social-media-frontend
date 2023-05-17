import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  currentUser,
  currentUserInfo,
  randomString,
  unixTimeToReadableFormat,
} from 'Common/helperFns';
import {
  transformTimeLineResponse,
  updateCommentTransformer,
  updateLikeCountTransformer,
} from 'Store/transformers/timelineTransformer';

export const appApiBaseURL = 'http://localhost:5000/araosdevsm/';

export const adsmApiSlice = createApi({
  reducerPath: 'adsmMainReducer',
  baseQuery: fetchBaseQuery({ baseUrl: appApiBaseURL }),
  tagTypes: ['UPDATE_TIMELINE'],
  endpoints: (builder) => ({
    // Getting logged in user details
    loggedInUserInfo: builder.mutation<LoggedUserInfoApiRes, UserCredentials>({
      query: (userCredentials) => ({
        url: '/login',
        method: 'POST',
        body: userCredentials,
      }),
      transformResponse: (res: LoggedUserInfoApiRes) => {
        localStorage.setItem('userInfo', JSON.stringify({ ...res }));
        return { ...res };
      },
    }),
    // Creating an user account API
    createAccount: builder.mutation<
      CreateAccountSucessRes | CreateAccountErrRes,
      CreateAccountPayload
    >({
      query: (createAccountpayload) => ({
        url: '/createaccount',
        method: 'POST',
        body: createAccountpayload,
      }),
      transformErrorResponse: (errorRes) => {
        const { data } = errorRes as { data: Partial<CreateAccountErrRes> };
        return {
          status: typeof data.status === 'number' ? data.status : 400,
          updated: typeof data.updated === 'string' ? data.updated : 'FAILED',
          message:
            typeof data.message === 'string' ? data.message : 'UNKNOWN_ERROR',
        };
      },
    }),
    // Getting timeline image APIs
    getTimeLineImgs: builder.query<TransformedTimelineImgRes[], string>({
      query: (userName) => `/gcp-apis/timeline-images/${userName}`,
      providesTags: ['UPDATE_TIMELINE'],
      transformResponse: (res) => {
        return transformTimeLineResponse(res as TimeLineImgApiRes)
          .trnsformedResponse;
      },
    }),
    // Posting an image in timeline API
    postTimelineImg: builder.mutation<
      TransformedTimelineImgRes,
      PostTimelineImgPayload
    >({
      query: (postTimelineImgReq) => {
        const { file, caption, username } = postTimelineImgReq;
        const body = new FormData();
        body.append('file', file);
        return {
          url: `gcp-apis/post-image/${username}?caption=${caption}`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['UPDATE_TIMELINE'],
      transformResponse: (response: PostTimelineImgRes, _meta, arg) => {
        const { caption, username, file } = arg;
        const newTimelineData = {
          userName: username,
          image: response.status === 'UPLOADED' ? file.name : '',
          imageLink:
            response.status === 'UPLOADED'
              ? `https://storage.googleapis.com/araosdev-social-media.appspot.com/${username}/${file.name}`
              : '',
          imageName:
            response.status === 'UPLOADED'
              ? file.name
                  .split('.jpg')
                  .join('')
                  .split('jpeg')
                  .join('')
                  .split('png')[0]
              : '',
          postedDate:
            response.status === 'UPLOADED'
              ? unixTimeToReadableFormat(
                  Math.round(new Date().getTime() / 1000)
                )
              : '',
          postedOn:
            response.status === 'UPLOADED'
              ? Math.round(new Date().getTime() / 1000)
              : NaN,
          likes: '0',
          likedBy: [],
          caption,
          commentSection: [],
          _id: randomString(10),
        };

        return newTimelineData;
      },
    }),
    // Updating a like count (Increment/Decrement)
    updateLikeCount: builder.mutation<UpdateLikeCountRes, UpdateLikeReqBody>({
      query: (body) => {
        const { postName, postedBy, likedFlag } = body;
        return {
          url: `/updateImgMetaData/updateLike/${currentUser()}`,
          method: 'POST',
          body: { postName, postedBy, likedFlag },
        };
      },
      onQueryStarted(reqBody, { dispatch, queryFulfilled }) {
        const updatedData = dispatch(
          adsmApiSlice.util.updateQueryData(
            'getTimeLineImgs',
            currentUser(),
            (posts) => {
              return updateLikeCountTransformer(
                posts,
                reqBody.imgDetail,
                reqBody.likedFlag
              ).allTimelineImages;
            }
          )
        );
        queryFulfilled.catch(updatedData.undo);
      },
    }),
    // Adding a comment API
    updateComment: builder.mutation<UpdateCommentRes, UpdateCommentReqBody>({
      query: (body) => {
        const { postName, postedBy, comment } = body;
        return {
          url: `/updateImgMetaData/updateComment/${currentUser()}`,
          method: 'POST',
          body: { postName, postedBy, comment },
        };
      },
      onQueryStarted(reqBody, { dispatch, queryFulfilled }) {
        const updatedData = dispatch(
          adsmApiSlice.util.updateQueryData(
            'getTimeLineImgs',
            currentUser(),
            (posts) => {
              return updateCommentTransformer(
                posts,
                reqBody.imgDetail,
                reqBody.comment
              );
            }
          )
        );
        reqBody.onCacheUpdate();
        queryFulfilled.catch(updatedData.undo);
      },
    }),
    // Searching friend list API
    searchFriendList: builder.query<TransFormedFrndSearchList, string>({
      query: (searchKey) => `/searchfriends/${currentUser()}/${searchKey}`,
      transformResponse: (response: FrndListSearchRes) => {
        const { status, filteredUsers } = response;
        if (status === 'OK') {
          return filteredUsers.map((frnd, index) => ({
            value: frnd,
            valueId: index,
          }));
        }
        if (status === 'NO_USERS_FOUND_FOR_THIS_KEYWORD') return 'EMPTY';
        return 'ERROR';
      },
      transformErrorResponse: (errorRes) => {
        const { data } = errorRes as {
          data: Pick<FrndListSearchRes, 'status'>;
        };
        if (data.status === 'NO_USERS_FOUND_FOR_THIS_KEYWORD') return 'EMPTY';
        return 'ERROR';
      },
    }),
    // Sending Friend request API
    friendRequest: builder.mutation<string, frndRequestReq>({
      query: (reqBody) => {
        const { user, requestType, friend } = reqBody;
        return {
          url: `friendReq/${user || currentUser()}`,
          method: 'POST',
          body: { requestType, friend },
        };
      },
      transformResponse: (response: { status: string }, _meta, arg) => {
        const { requestType, friend, user } = arg;
        const { status } = response;
        if (status === `${requestType}_SUCESS`) {
          const existingUserInfo = currentUserInfo();
          let newUserInfo;
          switch (requestType) {
            case 'SEND_REQ': {
              newUserInfo = {
                ...existingUserInfo,
                friendRequests: {
                  ...existingUserInfo.friendRequests,
                  requestedTo: [
                    ...existingUserInfo.friendRequests.requestedTo,
                    friend,
                  ],
                },
              };
              break;
            }
            case 'REVOKE_REQ': {
              newUserInfo = {
                ...existingUserInfo,
                friendRequests: {
                  ...existingUserInfo.friendRequests,
                  requestedTo:
                    existingUserInfo.friendRequests.requestedTo.filter(
                      (frnd: string) => frnd !== friend
                    ),
                },
              };
              break;
            }
            case 'ACCEPT_REQ':
            case 'REJECT_REQ': {
              newUserInfo = {
                ...existingUserInfo,
                friendRequests: {
                  ...existingUserInfo.friendRequests,
                  requestedBy:
                    existingUserInfo.friendRequests.requestedBy.filter(
                      (frnd: string) => frnd !== user
                    ),
                },
              };
              break;
            }
            case 'REMOVE_FRIEND': {
              newUserInfo = {
                ...existingUserInfo,
                friends: existingUserInfo.friends.filter(
                  (frnd: string) => frnd !== friend
                ),
              };
              break;
            }
            default:
              break;
          }
          localStorage.setItem(
            'userInfo',
            JSON.stringify({
              details: { ...newUserInfo },
              credentialsVerified: 'OK',
              status: 200,
            })
          );
          return '';
        }
        return 'ERROR';
      },
      transformErrorResponse: () => 'ERROR',
    }),
  }),
});

export const {
  useGetTimeLineImgsQuery,
  useLoggedInUserInfoMutation,
  useCreateAccountMutation,
  usePostTimelineImgMutation,
  useUpdateLikeCountMutation,
  useUpdateCommentMutation,
  useSearchFriendListQuery,
  useFriendRequestMutation,
} = adsmApiSlice;
