import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {},
    logout(state, action) {},
  },
});

export default authSlice;

export const AuthReducer = authSlice.reducer;
