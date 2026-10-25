import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  consumed: 0,
  burned: 0,
  waterTotal: 0,
  foodLog: [],
  workoutLog: [],
  waterLog: []
};

export const fitnessSlice = createSlice({
  name: 'fitness',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    addFood: (state, action) => {
      state.foodLog.push(action.payload);
      state.consumed = state.foodLog.reduce((sum, item) => sum + item.calories, 0);
    },
    addWorkout: (state, action) => {
      state.workoutLog.push(action.payload);
      state.burned = state.workoutLog.reduce((sum, item) => sum + item.calories, 0);
    },
    addWater: (state, action) => {
      state.waterLog.push(action.payload);
      state.waterTotal = state.waterLog.reduce((sum, item) => sum + item.ml, 0);
    },
    logoutUser: (state) => {
      state.user = null;
      state.foodLog = [];
      state.workoutLog = [];
      state.waterLog = [];
      state.consumed = 0;
      state.burned = 0;
      state.waterTotal = 0;
    }
  }
});

export const { setUser, addFood, addWorkout, addWater, logoutUser } = fitnessSlice.actions;
export default fitnessSlice.reducer;