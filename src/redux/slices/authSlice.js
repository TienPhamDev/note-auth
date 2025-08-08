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
    console.log(token);
    return token;
  }
);
export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password }) => {
    const res = await axiosClient.post("/api/signup", { email, password });
    const token = res.data;
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
    }
    console.log(token);
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
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.user = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload; // Store access token
        // state.user = action.payload.email; // Store user email
        // console.log(state.user);
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.user = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
// export const { logout } = authSlice.actions;
export default authSlice.reducer;
