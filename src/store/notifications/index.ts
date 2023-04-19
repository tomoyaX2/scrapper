import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PlacementType } from 'rsuite/esm/toaster/ToastContainer';

interface NotificationsState {
  text: string;
  type: 'success' | 'info' | 'error';
  placement?: PlacementType;
  header: string;
  isVisible?: boolean;
}

const initialState: NotificationsState = {
  text: '',
  type: 'success',
  placement: 'topEnd',
  header: '',
  isVisible: false
};

const defaultErrorMessage: NotificationsState = {
  type: 'error',
  header: 'Error',
  text: 'Server error',
  isVisible: true
};

const defaultSuccessMessage: NotificationsState = {
  type: 'success',
  header: 'Success',
  text: 'Your changes was saved ',
  isVisible: true
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<NotificationsState>) => {
      state.header = action.payload.header;
      state.type = action.payload.type;
      state.text = action.payload.text;
      state.isVisible = true;
    },
    hideNotification: state => {
      state.isVisible = false;
    }
  }
});

export const { showNotification, hideNotification } =
  notificationsSlice.actions;
export { defaultErrorMessage, defaultSuccessMessage };
export default notificationsSlice.reducer;
