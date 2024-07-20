// src/features/variables/variablesSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const variablesSlice = createSlice({
  name: 'variables',
  initialState: {
    user: '',
    userType: false,
    var3: false,
  },
  reducers: {
    setuser: (state, action) => {
      state.user = action.payload;
    },
    setusertype: (state, action) => {
      state.var2 = action.payload;
    },
    setVar3: (state, action) => {
      state.var3 = action.payload;
    },
  },
});

export const { setuser, setusertype, setVar3 } = variablesSlice.actions;

export default variablesSlice.reducer;
