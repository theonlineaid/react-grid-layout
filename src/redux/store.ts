import { configureStore } from '@reduxjs/toolkit';
import layoutSlice from './slice/layoutSlice';

const store = configureStore({
  reducer: {
    layout: layoutSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>

export default store;
