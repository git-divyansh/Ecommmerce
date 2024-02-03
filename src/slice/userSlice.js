// Redux Toolkit allows us to write "mutating" logic in reducers.
import { createSlice } from "@reduxjs/toolkit";

const userid = sessionStorage.getItem('userid')

const initialState = {
  isuser: userid ? true : null,
  id: userid ? JSON.parse(userid) : null,
  username: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload;
      state.isuser = true;
      sessionStorage.setItem('userid', JSON.stringify(action.payload));
    },
    removeUser: (state, action) => {
      state.username = null;
      state.isuser = null;
      sessionStorage.removeItem('userid');
      sessionStorage.removeItem('favourites');
      sessionStorage.removeItem('orders');
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
