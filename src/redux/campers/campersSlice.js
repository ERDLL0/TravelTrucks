import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCampers, fetchCamperById } from '../../services/api';

// Async thunks
export const getCampers = createAsyncThunk(
  'campers/getCampers',
  async (params, { rejectWithValue }) => {
    try {
      const data = await fetchCampers(params);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const loadMoreCampers = createAsyncThunk(
  'campers/loadMoreCampers',
  async (params, { rejectWithValue }) => {
    try {
      const data = await fetchCampers(params);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getCamperById = createAsyncThunk(
  'campers/getCamperById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await fetchCamperById(id);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    items: [],
    current: null,
    total: 0,
    hasMore: true,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    loadMoreStatus: 'idle',
    error: null,
  },
  reducers: {
    clearCampers(state) {
      state.items = [];
      state.total = 0;
      state.hasMore = true;
      state.status = 'idle';
      state.error = null;
    },
    clearCurrentCamper(state) {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    // getCampers – replaces results
    builder
      .addCase(getCampers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getCampers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const payload = action.payload;
        const limit = action.meta.arg.limit || 4;
        
        if (Array.isArray(payload)) {
          state.items = payload;
          state.hasMore = payload.length === limit;
        } else {
          state.items = payload.items ?? [];
          state.total = payload.total ?? 0;
          state.hasMore = state.items.length < state.total;
        }
      })
      .addCase(getCampers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    // loadMoreCampers – appends results
    builder
      .addCase(loadMoreCampers.pending, (state) => {
        state.loadMoreStatus = 'loading';
      })
      .addCase(loadMoreCampers.fulfilled, (state, action) => {
        state.loadMoreStatus = 'succeeded';
        const payload = action.payload;
        const limit = action.meta.arg.limit || 4;
        const newItems = Array.isArray(payload) ? payload : (payload.items ?? []);
        
        state.items = [...state.items, ...newItems];
        state.hasMore = newItems.length === limit;
      })
      .addCase(loadMoreCampers.rejected, (state, action) => {
        state.loadMoreStatus = 'failed';
        state.error = action.payload;
      });

    // getCamperById
    builder
      .addCase(getCamperById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getCamperById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.current = action.payload;
      })
      .addCase(getCamperById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearCampers, clearCurrentCamper } = campersSlice.actions;
export default campersSlice.reducer;
