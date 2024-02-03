import { configureStore } from '@reduxjs/toolkit'
import productSlice from "./slice/productSlice";
import userSlice from './slice/userSlice';

export const store = configureStore({
  reducer: {
    products : productSlice,
    user : userSlice,
  },
})