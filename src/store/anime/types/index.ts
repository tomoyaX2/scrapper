import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { backendUrl } from '@shared/api';
import { PaginatedResponse } from '@shared/types/responses';
import axios from 'axios';
import { TypeModel, TypeState } from './types';

const initialState: TypeState = {
  typesList: []
};

export const getVideoTypes = createAsyncThunk('get video types', async () => {
  const types = await axios.get<PaginatedResponse<TypeModel>>(
    `${backendUrl}/video-types`
  );

  return types.data.data.map(el => ({ label: el.name, value: el.id }));
});

export const videoTypesSlice = createSlice({
  name: 'video-types',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder.addCase(getVideoTypes.fulfilled, (state, action) => {
      state.typesList = action.payload;
    })
});
export default videoTypesSlice.reducer;
