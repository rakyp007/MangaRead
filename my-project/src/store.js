import { configureStore } from '@reduxjs/toolkit';
import topMangaReducer from './topMangaSlice';

const store = configureStore({
  reducer: {
    topManga: topMangaReducer,
  },
});

export default store;
