import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface NavigationState {
  to: string | null;
}

const initialState: NavigationState = {
  to: null
};

export const navigationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    redirect: (state, action: PayloadAction<string>) => {
      state.to = action.payload;
    },
    clearRedirect: state => {
      state.to = null;
    }
  }
});

export const { redirect, clearRedirect } = navigationSlice.actions;

export default navigationSlice.reducer;
