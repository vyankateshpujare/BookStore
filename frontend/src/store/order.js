import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_BACKEND_SERVER_URL;

export const placeOrder = createAsyncThunk("placeOrder", async (payload) => {
  try {
    const { userid, orders } = payload;
    const tokenString = "Bearer " + localStorage.getItem("token");
    const response = await axios.post(
      `${apiUrl}/api/order/place-order/${userid}`,
      {
        orders: orders,
      },
      {
        headers: {
          authorization: tokenString,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("placeOrder =>", error);
  }
});

export const getOrderHistory = createAsyncThunk(
  "getOrderHistory",
  async (payload) => {
    try {
      const { userid } = payload;
      const tokenString = "Bearer " + localStorage.getItem("token");
      const response = await axios.get(
        `${apiUrl}/api/order/get-order-history/${userid}`,
        {
          headers: {
            authorization: tokenString,
          },
        }
      );
      return response;
    } catch (error) {
      console.log("getOrderHistory =>", error);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "getAllOrders",
  async (payload) => {
    try {
      const tokenString = "Bearer " + localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/api/order/get-all-orders`, {
        headers: {
          authorization: tokenString,
        },
      });
      console.log("getsdsdsdsd")
      return response;
    } catch (error) {
      console.log("getAllOrders =>", error);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "updateOrderStatus",
  async (payload,{dispatch}) => {
    try {
      const { orderid, userid, status } = payload;
      const tokenString = "Bearer " + localStorage.getItem("token");
      const response = await axios.put(
        `${apiUrl}/api/order/update-status/${orderid}`,
        { status },
        {
          headers: {
            id: userid,
            authorization: tokenString,
          },
        }
      );
      dispatch(getAllOrders())
      alert("Status updated successfully")
    } catch (error) {
      console.log("updateOrderStatus =>", error);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    isLoading: false,
    orderHistoryOfUser: null,
    orders: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderHistory.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getOrderHistory.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.status === 200) {
        state.orderHistoryOfUser = action.payload.data.data;
      }
    });

    builder.addCase(getAllOrders.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.status === 200) {
        state.orders = action.payload.data.data;
      }
    });

    // builder.addCase(updateOrderStatus.pending,(state,action)=>{
    //   state.isLoading=true
    // })
    // builder.addCase(updateOrderStatus.fulfilled,(state,action)=>{
    //   state.isLoading=false
    //   if (action.payload.status === 200) {
    //     console.log("data",action.payload.data)
    //     state.orders = [...state.orders,{...action.payload.data.data}];
    //     console.log("order",state.orders)

    //   }
    // })
  },
});

export default orderSlice.reducer;
