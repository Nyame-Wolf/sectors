/* eslint-disable */
import { configureStore } from '@reduxjs/toolkit';
import options from './reducers/options';
import formPost from './reducers/formPost';

const store = configureStore({
  reducer: {
    options,
    formPost,
  },
});

export default store;
