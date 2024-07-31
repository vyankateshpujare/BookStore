import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_BACKEND_SERVER_URL;

export const getCartData = createAsyncThunk("getCartData", async (payload) => {
  try {
    const { userid } = payload;
    const tokenString = "Bearer " + localStorage.getItem("token");
    const response = await axios.get(
      `${apiUrl}/api/cart/get-user-cart/${userid}`,
      {
        headers: {
          authorization: tokenString,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("getCartData =>", error);
  }
});

export const removeBookFromCart = createAsyncThunk(
  "removeBookFromCart",
  async (payload) => {
    try {
      const { userid, bookid } = payload;
      const tokenString = "Bearer " + localStorage.getItem("token");
      const response = await axios.put(
        `${apiUrl}/api/cart/remove-from-cart/${userid}/${bookid}`,
        {},
        {
          headers: {
            authorization: tokenString,
          },
        }
      );
      return response;
    } catch (error) {
      console.log("removeBookFromCart =>", error);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    isLoading: false,
    cartData: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getCartData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCartData.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.status === 200) {
        state.cartData = action.payload.data.data;
      }
    });

    builder.addCase(removeBookFromCart.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeBookFromCart.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.status === 200) {
        state.cartData = state.cartData.filter(
          (cart) => cart._id !== action.payload.data.bookid
        );
      }
    });
  },
});

export default cartSlice.reducer;
