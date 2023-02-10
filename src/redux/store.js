/* eslint-disable linebreak-style */
import { configureStore } from '@reduxjs/toolkit';
import options from './reducers/options';

const store = configureStore({
  reducer: {
    options,
  },
});

export default store;
