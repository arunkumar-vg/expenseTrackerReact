import { configureStore } from '@reduxjs/toolkit';
import dateReducer from './states/dateSlice';

const store = configureStore({
  reducer: {
    date: dateReducer,
  },
});

export default store;
