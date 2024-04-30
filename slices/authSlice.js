import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signup: null,
  login: null,
  users: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUp: (state, action) => {
      state.signup = action.payload;
    },
    storeUsers: (state, action) => {
      state.users = [...state.users, action.payload];
    },
    logIn: (state, action) => {
      state.login = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signUp, logIn, storeUsers } = authSlice.actions;

export const selectSignup = (state) => state.auth.signup;

export const selectLogin = (state) => state.auth.login;

export const selectUsers = (state) => state.auth.users;

export default authSlice.reducer;
