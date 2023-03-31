import { configureStore } from '@reduxjs/toolkit';

import { adsmApiSlice } from 'Store/apiSlices/mainAPISlice';
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
