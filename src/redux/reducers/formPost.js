/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  sector: '',
  terms: false,
};

export const postformData = createAsyncThunk(
  'user/userPreference',
  async (user_preference) => {
    return await fetch('http://localhost:4000/user_preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_preference }),
    }).then(async (res) => {
      if (res.ok) {
        const response = await res.json();
        localStorage.setItem('user_preference', response.id);
        return response;
      }
      throw new Error(res);
    });
  }
);

export const postFormUpdate = createAsyncThunk(
  'user/userPreferenceUpdate',
  async (user_preference) => {
    const id = localStorage.getItem('user_preference');
    return await fetch(`http://localhost:4000/user_preferences/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_preference }),
    }).then(async (res) => {
      if (res.ok) {
        const response = await res.json();
        localStorage.setItem('user_preference', response.id);
        return response;
      }
      throw new Error(res);
    });
  }
);

export const getuserPreference = createAsyncThunk(
  'user/getUserPreference',
  async () => {
    const id = localStorage.getItem('user_preference');
    return await fetch(`http://localhost:4000/user_preferences/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (res) => {
      if (res.ok) {
        const response = await res.json();
        return response;
      }
      throw new Error(res);
    });
  }
);

export const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postformData.fulfilled, (state, action) => action.payload)
      .addCase(getuserPreference.fulfilled, (state, action) => action.payload);
  },
});

export default formDataSlice.reducer;
