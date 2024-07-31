import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_BACKEND_SERVER_URL;

export const getCurrentUser = createAsyncThunk("getCurrentUser", async () => {
  try {
    const loggedInUserId = localStorage.getItem("id");
    const tokenString = "Bearer " + localStorage.getItem("token");
    const response = await axios.get(`${apiUrl}/api/user/${loggedInUserId}`, {
      headers: {
        authorization: tokenString,
      },
    });
    return response;
  } catch (error) {
    console.log("getCurrentUser", error);
  }
});

export const updateUserAddress = createAsyncThunk(
  "updateUserAddress",
  async (payload) => {
    try {
      const { userid, address } = payload;
      const tokenString = "Bearer " + localStorage.getItem("token");
      const response = await axios.put(
        `${apiUrl}/api/user/update-address/${userid}`,
        { address },
        {
          headers: {
            authorization: tokenString,
          },
        }
      );
    } catch (error) {
      console.log("updateUserAddress", error);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    users: [],
    currentUser: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.status === 200) {
        state.currentUser = action.payload.data;
      }
    });
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
