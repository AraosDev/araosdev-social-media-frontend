import { getTimelineImgApi, postUpdateImgMetaDataAPI } from "../../api/getApi";
import { currentUser } from "../../Common/helperFns";
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
