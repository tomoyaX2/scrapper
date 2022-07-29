import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { backendUrl } from '@shared/api';
import { PaginatedResponse } from '@shared/types/responses';
import axios from 'axios';
import { LanguageModel, LanguagesState } from './types';

const initialState: LanguagesState = {
  languagesList: []
};

export const getLanguages = createAsyncThunk('get languages', async () => {
  const languages = await axios.get<PaginatedResponse<LanguageModel>>(
    `${backendUrl}/languages`
  );

  return languages.data.data.map(el => ({ label: el.name, value: el.id }));
});

export const languagesSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder.addCase(getLanguages.fulfilled, (state, action) => {
      state.languagesList = action.payload;
    })
});
export default languagesSlice.reducer;
