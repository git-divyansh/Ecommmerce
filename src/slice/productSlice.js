// Redux Toolkit allows us to write "mutating" logic in reducers.
import { createSlice } from "@reduxjs/toolkit";

const favouriteLocal = sessionStorage.getItem('favourites');
const orderLocal = localStorage.getItem('orders');

const initialState = {
  products: [],
  favourite: favouriteLocal ? JSON.parse(favouriteLocal) : [],
  order: orderLocal ? JSON.parse(orderLocal) : [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.products = action.payload;
    },
    setFavourite: (state, action) => {
      state.favourite.push(action.payload);
      sessionStorage.setItem('favourites', JSON.stringify(state.favourite));
    },
    setFavouriteFetch: (state, action) => {
      state.favourite = action.payload;
      sessionStorage.setItem('favourites', JSON.stringify(state.favourite));
    },
    removeFavourite: (state, action) => {
      state.favourite = state.favourite.filter(
        (item) => item !== action.payload
      );
      sessionStorage.setItem('favourites', JSON.stringify(state.favourite));
    },
    addToCart: (state, action) => {
      state.order.push(action.payload);
      localStorage.setItem('orders', JSON.stringify(state.favourite));
    },
    removeFromTheCart: (state, action) => {
      state.order = action.payload;
      localStorage.setItem('orders', JSON.stringify(state.favourite));
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setProduct,
  setFavourite,
  removeFavourite,
  addToCart,
  removeFromTheCart,
  setFavouriteFetch
} = productSlice.actions;

export default productSlice.reducer;
