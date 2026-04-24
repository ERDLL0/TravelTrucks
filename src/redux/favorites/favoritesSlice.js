import { createSlice } from '@reduxjs/toolkit';

// Load from localStorage on startup
const loadFavorites = () => {
  try {
    const stored = localStorage.getItem('traveltrucks_favorites');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveFavorites = (items) => {
  try {
    localStorage.setItem('traveltrucks_favorites', JSON.stringify(items));
  } catch {
    // localStorage write may fail in private browsing; silently ignore
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: loadFavorites(),
  },
  reducers: {
    toggleFavorite(state, action) {
      const camper = action.payload;
      const idx = state.items.findIndex((c) => c.id === camper.id);
      if (idx >= 0) {
        state.items.splice(idx, 1);
      } else {
        state.items.push(camper);
      }
      saveFavorites(state.items);
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
