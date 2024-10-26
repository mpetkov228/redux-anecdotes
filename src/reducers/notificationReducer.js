import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    hideNotification() {
      return '';
    }
  }
});

export const { createNotification, hideNotification } = notificationSlice.actions;

export const setNotification = (content, duration) => {
  return async dispatch => {
    dispatch(createNotification(content));
    setTimeout(() => {
      dispatch(hideNotification());
    }, duration * 1000);
  };
};

export default notificationSlice.reducer;