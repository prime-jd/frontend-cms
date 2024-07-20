// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import variablesReducer from './features/variables/variablesSlice';

const persistConfig = {
  key: 'variables',
  storage,
};

const persistedReducer = persistReducer(persistConfig, variablesReducer);

const store = configureStore({
  reducer: {
    variables: persistedReducer,
  },
});

export const persistor = persistStore(store);
export default store;
