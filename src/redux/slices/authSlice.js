// Auth slice for Redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../api/axiosClient";
// Async thunk for user login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const res = await axiosClient.post("/api/login", { email, password });
    const token = res.data;
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
    }
    return token;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    // login: (state, action) => {
    //   state.user = action.payload;
    //   state.isAuthenticated = true;
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.user = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default authSlice.reducer;
