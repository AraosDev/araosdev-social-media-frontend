import { getTimelineImgApi } from "../../api/getApi";
import { transformTimeLineResponse } from "../transformers/timelineTransformer";

export const setTimeline = (val) => {
    return {
        type: 'SET_TIMELINE',
        payload: val,
    };
};

export const getTimeLineImagesAction = () => (dispatch) => {
    const { userName } = JSON.parse(localStorage.getItem('userInfo'));
    getTimelineImgApi(userName)
    .then(res=> {
        const timeLineResponse = {
            state: 'TIMELINE_LOADED',
            images: transformTimeLineResponse(res.data).trnsformedResponse,
        }
        dispatch(setTimeline(timeLineResponse));
        console.log(timeLineResponse);
    })
    .catch(err => {
        console.log({...err});
        const timelineResponse = {
            state: 'TIMELINE_ERROR',
            images: []
        }
        dispatch(setTimeline(timelineResponse));
    })
}