import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { backendUrl } from '@shared/api';
import { PaginatedResponse } from '@shared/types/responses';
import axios from 'axios';
import { TypeModel, TypeState } from './types';

const initialState: TypeState = {
  typesList: []
};

export const getTypes = createAsyncThunk('get types', async () => {
  const types = await axios.get<PaginatedResponse<TypeModel>>(
    `${backendUrl}/types`
  );

  return types.data.data.map(el => ({ label: el.name, value: el.id }));
});

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder.addCase(getTypes.fulfilled, (state, action) => {
      state.typesList = action.payload;
    })
});
export default tagsSlice.reducer;
