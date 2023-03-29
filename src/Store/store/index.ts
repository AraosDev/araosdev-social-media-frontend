import { adsmApiSlice } from 'api/apiSlice';

import { configureStore } from '@reduxjs/toolkit';

import timelineReducer from 'Store/reducer/timelineReducer';

const store = configureStore({
  reducer: {
    timelineReducer,
    [adsmApiSlice.reducerPath]: adsmApiSlice.reducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(adsmApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
