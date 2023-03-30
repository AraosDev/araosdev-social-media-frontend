import { createSlice } from '@reduxjs/toolkit';

interface TimelineReducerInitialState {
  timelineState: TimelineStates;
}

const initialState: TimelineReducerInitialState = {
  timelineState: 'TIMELINE_VIEW',
};

const timelineReducer = createSlice({
  name: 'timelineReducer',
  initialState,
  reducers: {
    setTimelineState(state, action) {
      const newState = { ...state };
      newState.timelineState = action.payload;
      return newState;
    },
  },
});

const { actions, reducer } = timelineReducer;

export const { setTimelineState } = actions;

export default reducer;
