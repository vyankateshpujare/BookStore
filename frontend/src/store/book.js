import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_BACKEND_SERVER_URL;

export const getAllBooks = createAsyncThunk("getAllBooks", async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/book`);
    return response;
  } catch (error) {
    console.log("getAllBooks =>", error);
  }
});

export const getRecentlyAddedBooks = createAsyncThunk(
  "getRecentBooks",
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/book/get-recent-books`);
      return response;
    } catch (error) {
      console.log("getRecentBooks =>", error);
    }
  }
);

export const getBookDetails = createAsyncThunk(
  "getBookDetails",
  async (payload) => {
    const { bookid } = payload;
    try {
      const response = await axios.get(`${apiUrl}/api/book/${bookid}`);
      return response;
    } catch (error) {
      console.log("getBookDetails =>", error);
    }
  }
);

export const addBook = createAsyncThunk("addBook", async (payload) => {
  try {
    const { userid, data } = payload;
    const tokenString = "Bearer " + localStorage.getItem("token");
    const response = await axios.post(
      `${apiUrl}/api/book/add-book`,
      { ...data },
      {
        headers: {
          id: userid,
          authorization: tokenString,
        },
      }
    );
    alert(response.data.message)
    return response
  } catch (error) {
    console.log("addBook =>", error);
  }
});

export const updateBook = createAsyncThunk("addBook", async (payload) => {
  try {
    const { userid,bookid, data } = payload;
    const tokenString = "Bearer " + localStorage.getItem("token");
    const response = await axios.put(
      `${apiUrl}/api/book/update-book/${bookid}`,
      { ...data },
      {
        headers: {
          id: userid,
          authorization: tokenString,
        },
      }
    );
    alert(response.data.message)
    return response
  } catch (error) {
    console.log("addBook =>", error);
  }
});

export const removeBook = createAsyncThunk("addBook", async (payload) => {
  try {
    const { userid ,bookid} = payload;
    const tokenString = "Bearer " + localStorage.getItem("token");
    const response = await axios.delete(
      `${apiUrl}/api/book/delete-book/${bookid}`,
      {
        headers: {
          id: userid,
          authorization: tokenString,
        },
      }
    );
    return response
  } catch (error) {
    console.log("addBook =>", error);
  }
});

export const getFavouritesBooks = createAsyncThunk(
  "getFavouritesBooks",
  async (payload) => {
    try {
      const { userid } = payload;
      const tokenString = "Bearer " + localStorage.getItem("token");
      const response = await axios.get(
        `${apiUrl}/api/favourite/get-favourite-books/${userid}`,
        {
          headers: {
            authorization: tokenString,
          },
        }
      );
      return response;
    } catch (error) {
      console.log("getFavouritesBooks =>", error);
    }
  }
);

export const addBookToFavourites = createAsyncThunk(
  "addBookToFavourites",
  async (payload) => {
    try {
      const { userid, bookid } = payload;
      const tokenString = "Bearer " + localStorage.getItem("token");
      const response = await axios.put(
        `${apiUrl}/api/favourite/add-book-to-favourite/${userid}/${bookid}`,
        {},
        {
          headers: {
            authorization: tokenString,
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.log("addBookToFavourites =>", error);
    }
  }
);

export const removeBookFromFavourites = createAsyncThunk(
  "removeBookFromFavourites",
  async (payload) => {
    try {
      const { userid, bookid } = payload;
      const tokenString = "Bearer " + localStorage.getItem("token");
      const response = await axios.put(
        `${apiUrl}/api/favourite/remove-book-from-favourite/${userid}/${bookid}`,
        {},
        {
          headers: {
            authorization: tokenString,
          },
        }
      );
      alert(response.data.message);
      return response;
    } catch (error) {
      console.log("removeBookFromFavourites =>", error);
    }
  }
);

export const addBookToCart = createAsyncThunk(
  "addBookToCart",
  async (payload) => {
    try {
      const { userid, bookid } = payload;
      const tokenString = "Bearer " + localStorage.getItem("token");
      const response = await axios.put(
        `${apiUrl}/api/cart/add-to-cart/${userid}/${bookid}`,
        {},
        {
          headers: {
            authorization: tokenString,
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.log("addBookToCart =>", error);
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: {
    isLoading: false,
    books: null,
    selectedBookData: null,
    favouriteBooks: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllBooks.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.status === 200) {
        state.books = action.payload.data.data;
      }
    });

    builder.addCase(getRecentlyAddedBooks.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getRecentlyAddedBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.status === 200) {
        state.books = action.payload.data.data;
      }
    });

    builder.addCase(getBookDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getBookDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.status === 200) {
        state.selectedBookData = action.payload.data.data;
      }
    });

    builder.addCase(getFavouritesBooks.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getFavouritesBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.status === 200) {
        state.favouriteBooks = action.payload.data.data;
      }
    });

    builder.addCase(removeBookFromFavourites.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeBookFromFavourites.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.status === 200) {
        state.favouriteBooks = state.favouriteBooks.filter(
          (book) => book._id !== action.payload.data.bookid
        );
      }
    });
  },
});

export default bookSlice.reducer;
