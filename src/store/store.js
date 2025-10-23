import { configureStore } from '@reduxjs/toolkit';
import vehiclesReducer from './vehiclesSlice.js';

export default configureStore({
  reducer: {
    vehicles: vehiclesReducer,
  }
})