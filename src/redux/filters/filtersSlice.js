import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: '',
  form: '',        // alcove | panelTruck | fullyIntegrated | semiIntegrated
  engine: '',      // petrol | diesel | hybrid | electric
  transmission: '', // automatic | manual
  // Equipment checkboxes (multi-select)
  AC: false,
  bathroom: false,
  kitchen: false,
  TV: false,
  radio: false,
  refrigerator: false,
  microwave: false,
  gas: false,
  water: false,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
    },
    setForm(state, action) {
      state.form = action.payload;
    },
    setEngine(state, action) {
      state.engine = action.payload;
    },
    setTransmission(state, action) {
      state.transmission = action.payload;
    },
    toggleEquipment(state, action) {
      const key = action.payload;
      if (key in state) {
        state[key] = !state[key];
      }
    },
    clearFilters() {
      return initialState;
    },
  },
});

export const {
  setLocation,
  setForm,
  setEngine,
  setTransmission,
  toggleEquipment,
  clearFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
