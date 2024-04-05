// Redux Toolkit allows us to write "mutating" logic in reducers.
import { createSlice } from "@reduxjs/toolkit";

const favouriteLocal = sessionStorage.getItem('favourites');
const orderLocal = sessionStorage.getItem('orders');

const initialState = {
  products: favouriteLocal ? JSON.parse(favouriteLocal) : [],
  favourite: [],
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
      sessionStorage.setItem('orders', JSON.stringify(state.order));
    },
    updateFromTheCart: (state, action) => {
      state.order = action.payload;
      sessionStorage.setItem('orders', JSON.stringify(state.order));
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setProduct,
  setFavourite,
  removeFavourite,
  addToCart,
  updateFromTheCart,
  setFavouriteFetch
} = productSlice.actions;

export default productSlice.reducer;
