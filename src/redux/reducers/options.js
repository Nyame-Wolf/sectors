/* eslint-disable  */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  status: 'idle',
};

export const getOptions = createAsyncThunk('options/getOptions', async () => {
  const response = await fetch('https://sectors.onrender.com', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // credentials: 'include',
    // mode: 'no-cors',
  });
  if (response.ok) {
    return response.json();
  }
  throw response;
});

export const optionSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOptions.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getOptions.pending, (state) => {
        state.status = 'loading';
      });
  },
});

export default optionSlice.reducer;
