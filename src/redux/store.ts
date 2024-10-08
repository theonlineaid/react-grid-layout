import { configureStore } from '@reduxjs/toolkit';
import layoutSlice from './slice/layoutSlice';
import authSlice from './slice/authSlice';

const store = configureStore({
  reducer: {
    layout: layoutSlice,
    auth:  authSlice 
  },
});

export type RootState = ReturnType<typeof store.getState>

export default store;
