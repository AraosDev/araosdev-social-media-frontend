import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';

import { adsmApiSlice } from 'Store/apiSlices/mainAPISlice';
import timelineReducer from 'Store/reducer/timelineReducer';

const rootReducer = combineReducers({
  timelineReducer,
  [adsmApiSlice.reducerPath]: adsmApiSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(adsmApiSlice.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (defaultMiddleware) =>
      defaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(adsmApiSlice.middleware),
    preloadedState,
  });
};

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
