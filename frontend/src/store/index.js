import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import bookReducer from "./book";
import userReducer from "./user";
import cartReducer from "./cart";
import orderReducer from "./order";

const store = configureStore({
  reducer: {
    auth: authReducer,
    book: bookReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
