// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import variablesReducer from './features/variables/variablesSlice';

const store = configureStore({
  reducer: variablesReducer
});



export default store;
