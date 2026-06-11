import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "./authActions";

const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;

const initialState = {
  loading: false,
  user: null,
  token,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginRedux: (state, action) => {
      state.user = action.payload;
      state.token = localStorage.getItem('token');
      state.success = true;
      state.error = null;
    },
    logoutRedux: (state) => {
      state.user = null;
      state.token = null;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Current user lifecycle handlers
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.user = payload;
    });

    builder.addCase(getCurrentUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
      state.user = null;
      state.token = null;
    });
  },
});

export const { loginRedux, logoutRedux } = authSlice.actions;
export default authSlice;
