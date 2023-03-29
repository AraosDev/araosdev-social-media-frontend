/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { currentUser, randomString, unixTimeToReadableFormat } from 'Common/helperFns'
import { transformTimeLineResponse, updateCommentTransformer, updateLikeCountTransformer } from 'Store/transformers/timelineTransformer'

export const adsmApiSlice = createApi({
  reducerPath: 'adsmMainReducer',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/araosdevsm/' }),
  tagTypes: ['UPDATE_TIMELINE'],
  endpoints: (builder) => ({
    // Getting logged in user details
    loggedInUserInfo: builder.mutation<LoggedUserInfoApiRes, UserCredentials>({
      query: (userCredentials) => ({ url: '/login', method: 'POST', body: userCredentials }),
      transformResponse: (res: LoggedUserInfoApiRes) => {
        localStorage.setItem('userInfo', JSON.stringify({ ...res }))
        return { ...res }
      }
    }),
    // Creating an user account API
    createAccount: builder.mutation<CreateAccountSucessRes | CreateAccountErrRes, CreateAccountPayload>({
      query: (createAccountpayload) => ({ url: '/createaccount', method: 'POST', body: createAccountpayload }),
      transformErrorResponse: (errorRes) => {
        const { data } = errorRes as { data: Partial<CreateAccountErrRes> }
        return {
          status: typeof data.status === 'number' ? data.status : 400,
          updated: typeof data.updated === 'string' ? data.updated : 'FAILED',
          message: typeof data.message === 'string' ? data.message : 'UNKNOWN_ERROR'
        }
      }
    }),
    // Getting timeline image APIs
    getTimeLineImgs: builder.query<TransformedTimelineImgRes[], string>({
      query: (userName) => `/gcp-apis/timeline-images/${userName}`,
      providesTags: ['UPDATE_TIMELINE'],
      transformResponse: (res, meta) => {
        console.log(meta)
        return transformTimeLineResponse(res as TimeLineImgApiRes).trnsformedResponse
      }
    }),
    // Posting an image in timeline API
    postTimelineImg: builder.mutation<TransformedTimelineImgRes, PostTimelineImgPayload>({
      query: (postTimelineImgReq) => {
        const { file, caption, username } = postTimelineImgReq
        const body = new FormData()
        body.append('file', file)
        return { url: `gcp-apis/post-image/${username}?caption=${caption}`, method: 'POST', body }
      },
      invalidatesTags: ['UPDATE_TIMELINE'],
      transformResponse: (response: PostTimelineImgRes, _meta, arg) => {
        const { caption, username, file } = arg
        const newTimelineData = {
          userName: username,
          image: response.status === 'UPLOADED' ? file.name : '',
          imageLink: response.status === 'UPLOADED' ? `https://storage.googleapis.com/araosdev-social-media.appspot.com/${username}/${file.name}` : '',
          imageName: response.status === 'UPLOADED' ? file.name.split('.jpg').join('').split('jpeg').join('').split('png')[0] : '',
          postedDate: response.status === 'UPLOADED' ? unixTimeToReadableFormat(Math.round(new Date().getTime() / 1000)) : '',
          postedOn: response.status === 'UPLOADED' ? Math.round(new Date().getTime() / 1000) : NaN,
          likes: '0',
          likedBy: [],
          caption,
          commentSection: [],
          _id: randomString(10)
        }

        return newTimelineData
      }
    }),
    // Updating a like count (Increment/Decrement)
    updateLikeCount: builder.mutation<UpdateLikeCountRes, UpdateLikeReqBody>({
      query: (body) => {
        const { postName, postedBy, likedFlag } = body
        return { url: `/updateImgMetaData/updateLike/${currentUser()}`, method: 'POST', body: { postName, postedBy, likedFlag } }
      },
      onQueryStarted (reqBody, { dispatch, queryFulfilled }) {
        const updatedData = dispatch(adsmApiSlice.util.updateQueryData('getTimeLineImgs', currentUser(), (posts) => {
          return updateLikeCountTransformer(posts, reqBody.imgDetail, reqBody.likedFlag).allTimelineImages
        }))
        queryFulfilled.catch(updatedData.undo)
      }
    }),
    // Adding a comment API
    updateComment: builder.mutation<UpdateCommentRes, UpdateCommentReqBody>({
      query: (body) => {
        const { postName, postedBy, comment } = body
        return { url: `/updateImgMetaData/updateComment/${currentUser()}`, method: 'POST', body: { postName, postedBy, comment } }
      },
      onQueryStarted (reqBody, { dispatch, queryFulfilled }) {
        const updatedData = dispatch(adsmApiSlice.util.updateQueryData('getTimeLineImgs', currentUser(), (posts) => {
          return updateCommentTransformer(posts, reqBody.imgDetail, reqBody.comment)
        }))
        reqBody.onCacheUpdate()
        queryFulfilled.catch(updatedData.undo)
      }
    }),
    // Searching friend list
    searchFriendList: builder.query<FrndListSearchRes, string>({
      query: (searchKey) => `${currentUser()}/${searchKey}`
    })
  })
})

export const {
  useGetTimeLineImgsQuery,
  useLoggedInUserInfoMutation,
  useCreateAccountMutation,
  usePostTimelineImgMutation,
  useUpdateLikeCountMutation,
  useUpdateCommentMutation
} = adsmApiSlice
