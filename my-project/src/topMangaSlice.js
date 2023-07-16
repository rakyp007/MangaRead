// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { fetchTopManga } from './api';

// export const fetchTopMangaAsync = createAsyncThunk(
//   'topManga/fetchTopManga',
//   async () => {
//     const data = await fetchTopManga();
//     return data;
//   }
// );

// const topMangaSlice = createSlice({
//   name: 'topManga',
//   initialState: { mangaList: [], status: 'idle', error: null },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTopMangaAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchTopMangaAsync.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.mangaList = action.payload;
//       })
//       .addCase(fetchTopMangaAsync.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export default topMangaSlice.reducer;



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTopManga } from './api';

export const fetchTopMangaAsync = createAsyncThunk(
  'topManga/fetchTopManga',
  async () => {
    const data = await fetchTopManga();
    return data;
  }
);

const topMangaSlice = createSlice({
  name: 'topManga',
  initialState: { mangaList: [], status: 'idle', error: null, currentPage: 1 }, // Add currentPage state
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopMangaAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTopMangaAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.mangaList = action.payload;
      })
      .addCase(fetchTopMangaAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage } = topMangaSlice.actions; // Export setCurrentPage action

export default topMangaSlice.reducer;
