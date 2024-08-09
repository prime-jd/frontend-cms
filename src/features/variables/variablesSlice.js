// src/features/variables/variablesSlice.js
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export const variablesSlice = createSlice({
  name: 'variables',
  initialState: {
    user: '',
    userType: false,
    var3: '', // Initialize var3 as an empty string or null
  },
  reducers: {
    setuser: (state, action) => {
      state.user = action.payload;
    },
    setUserType: (state, action) => {
      state.userType = action.payload; // Updated key from var2 to userType
    },
    setVar3: (state, action) => {
      state.var3 = action.payload;
    },
    loadAccessToken: (state) => {
      const token = Cookies.get('accessToken'); // Read the access token using js-cookie
      state.var3 = token; // Store the token in var3, default to an empty string if undefined
    },
  },
});

export const { setuser, setUserType, setVar3, loadAccessToken } = variablesSlice.actions;

export default variablesSlice.reducer;
