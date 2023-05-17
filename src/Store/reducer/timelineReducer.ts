import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimelineReducerInitialState {
  timelineState: TimelineStates;
  createAccountState: CreateAccountStates;
}

export const initialState: TimelineReducerInitialState = {
  timelineState: 'TIMELINE_VIEW',
  createAccountState: 'CREATE_ACCOUNT',
};

const timelineReducer = createSlice({
  name: 'timelineReducer',
  initialState,
  reducers: {
    setTimelineState(state, action: PayloadAction<TimelineStates>) {
      const newState = { ...state };
      newState.timelineState = action.payload;
      return newState;
    },
    setCreateAccountState(state, action: PayloadAction<CreateAccountStates>) {
      const newState = { ...state };
      newState.createAccountState = action.payload;
      return newState;
    },
  },
});

const { actions, reducer } = timelineReducer;

export const { setTimelineState, setCreateAccountState } = actions;

export default reducer;
