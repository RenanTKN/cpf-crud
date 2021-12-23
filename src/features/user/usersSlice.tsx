import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user";

interface UsersSliceState {
  value: User[];
}

const initialState: UsersSliceState = {
  value: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

export default usersSlice.reducer;
