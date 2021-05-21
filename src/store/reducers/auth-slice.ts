import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Auth, AuthToken } from '../../models/Auth';

const initialState = {
  token: localStorage.getItem('token'),
  isLoggedIn: !!localStorage.getItem('token'),
} as Auth;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state: Auth, action: PayloadAction<AuthToken>) {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('token', action.payload!);
    },
    logout(state: Auth) {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token');
    },
  },
});

export default authSlice.reducer;
