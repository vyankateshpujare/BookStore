import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_BACKEND_SERVER_URL;

export const createUser = createAsyncThunk("createUser", async (payload) => {
  const response = await axios.post(`${apiUrl}/api/user/sign-up`, payload);
});

export const loginUser = createAsyncThunk("loginUser", async (payload) => {
  try {
    const response = await axios.post(`${apiUrl}/api/user/sign-in`, payload);
    return response;
  } catch (error) {
    console.log("loginUser", error);
    return error.response;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    isLoggedIn: false,
    role: "user",
    error: null,
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    changeRole(state,action) {
      state.role = action.payload
    },
    logout(state){
      state.isLoggedIn = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.status === 200) {
        state.error = null;
        state.role = action.payload.data.user.role;
        state.isLoggedIn = true;
        localStorage.setItem("token", action.payload.data.token);
        localStorage.setItem("id", action.payload.data.user._id);
        localStorage.setItem("role", action.payload.data.user.role);
      } else {
        state.error = action.payload;
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
