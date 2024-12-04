import { configureStore } from '@reduxjs/toolkit';
import dateReducer from './states/dateSlice';

export const store = configureStore({
  reducer: {
    date: dateReducer,
  },
});
