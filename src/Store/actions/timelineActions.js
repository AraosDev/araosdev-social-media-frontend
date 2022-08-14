import { getTimelineImgApi, postTimelineImgApi, postUpdateImgMetaDataAPI } from "../../api/getApi";
import { currentUser, randomString, unixTimeToReadableFormat } from "../../Common/helperFns";
import {
  transformTimeLineResponse,
  updateCommentTransformer,
  updateLikeCountTransformer,
} from "../transformers/timelineTransformer";

export const setTimeline = (val) => {
  return {
    type: "SET_TIMELINE",
    payload: val,
  };
};

export const getTimeLineImagesAction = () => (dispatch) => {
  const userName = currentUser();
  getTimelineImgApi(userName)
    .then((res) => {
      const timeLineResponse = {
        state: "TIMELINE_LOADED",
        images: transformTimeLineResponse(res.data).trnsformedResponse,
      };
      dispatch(setTimeline(timeLineResponse));
    })
    .catch((err) => {
      console.log({ ...err });
      const timelineResponse = {
        state: "TIMELINE_ERROR",
        images: [],
      };
      dispatch(setTimeline(timelineResponse));
    });
};

export const postTimelineImageAction = (file, caption, callback) => (dispatch, getState) => {
  const reqBody = new FormData();
  reqBody.append('file', file);
  if (callback) callback('LOADING');
  postTimelineImgApi(currentUser(), reqBody, { caption })
  .then(res => {
    if (res.data.status === 'UPLOADED') {
      let newTimelineData = {
        userName: currentUser(),
        image: file.name,
        imageLink: `https://storage.googleapis.com/araosdev-social-media/${currentUser()}/${file.name}`,
        imageName: file.name.split(".jpg").join("").split("jpeg").join("").split("png")[0],
        postedDate: unixTimeToReadableFormat(Math.round(new Date().getTime() / 1000)),
        postedOn: Math.round(new Date().getTime() / 1000),
        likes: "0",
        likedBy: [],
        caption,
        commentSection: [],
        _id: randomString(10),
      };
      const timelineImges = getState().timelineReducer.timelineImages;
      const newTimeline = {
        state: "TIMELINE_LOADED",
        images: [newTimelineData, ...timelineImges],
      };
      dispatch(setTimeline(newTimeline));
      if (callback) callback ('LOADED');
    }
  })
  .catch(() => callback && callback('ERROR'))
}

export const updateLikeCountAction =
  (imgDetail, likedFlag) => (dispatch, getState) => {
    const allTimeLineImgs = getState().timelineReducer.timelineImages;

    let updatedTimelineImgs = updateLikeCountTransformer(
      allTimeLineImgs,
      imgDetail,
      likedFlag
    ).allTimelineImages;

    let timelineRollBack = {
      state: "TIMELINE_LOADED",
      images: allTimeLineImgs,
    };
    let updatedTimeLine = {
      state: "TIMELINE_LOADED",
      images: updatedTimelineImgs,
    };

    dispatch(setTimeline(updatedTimeLine));

    let property = `updateLike/${currentUser()}`;
    const reqBody = {
      postName: imgDetail.image,
      postedBy: imgDetail.userName,
      likedFlag,
    };

    postUpdateImgMetaDataAPI(property, reqBody)
      .then((res) => {
        const status = res.data.status;
        if (status !== "LIKE_UPDATED") dispatch(setTimeline(timelineRollBack));
      })
      .catch(() => dispatch(setTimeline(timelineRollBack)));
  };

export const updateImgCommentAction =
  (imgDetail, comment, callback) => (dispatch, getState) => {
    const allTimeLineImgs = getState().timelineReducer.timelineImages;

    let updatedTimeLine = {
      state: "TIMELINE_LOADED",
      images: updateCommentTransformer(allTimeLineImgs, imgDetail, comment),
    };
    let timelineRollBack = {
      state: "TIMELINE_LOADED",
      images: allTimeLineImgs,
    };

    dispatch(setTimeline(updatedTimeLine));
    if (callback) callback();

    let property = `updateComment/${currentUser()}`;
    const reqBody = {
      postName: imgDetail.image,
      postedBy: imgDetail.userName,
      comment,
    };

    postUpdateImgMetaDataAPI(property, reqBody)
      .then((res) => {
        let status = res.data.status;
        if (status !== "COMMENT_UPDATED")
          dispatch(setTimeline(timelineRollBack));
      })
      .catch(() => dispatch(setTimeline(timelineRollBack)));
  };
