import { configureStore } from '@reduxjs/toolkit';

import { AuthReducer } from './reducers/auth-slice';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});
