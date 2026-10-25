import { configureStore } from '@reduxjs/toolkit';
import fitnessReducer from './fitnessSlice';

export const store = configureStore({
  reducer: {
    fitness: fitnessReducer,
  },
});