/* eslint-disable import/prefer-default-export */
export const setTimeline = (val) => {
  return {
    type: 'SET_TIMELINE',
    payload: val,
  };
};
