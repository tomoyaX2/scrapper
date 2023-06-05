import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { backendUrl } from '@shared/api';
import { PaginatedResponse } from '@shared/types/responses';
import axios from 'axios';
import { LanguageModel, LanguagesState } from './types';

const initialState: LanguagesState = {
  languagesList: []
};

export const getVideoLanguages = createAsyncThunk(
  'get video languages',
  async () => {
    const languages = await axios.get<PaginatedResponse<LanguageModel>>(
      `${backendUrl}/video-languages`
    );

    return languages.data.data.map(el => ({ label: el.name, value: el.id }));
  }
);

export const languagesSlice = createSlice({
  name: 'video-languages',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder.addCase(getVideoLanguages.fulfilled, (state, action) => {
      state.languagesList = action.payload;
    })
});
export default languagesSlice.reducer;
