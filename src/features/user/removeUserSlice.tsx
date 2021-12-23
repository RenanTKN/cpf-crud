import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface removeUserSliceState {
  value: string;
}

const initialState: removeUserSliceState = {
  value: "",
};

export const removeUserSlice = createSlice({
  name: "removeUser",
  initialState,
  reducers: {
    setRemoveUser: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setRemoveUser } = removeUserSlice.actions;

export default removeUserSlice.reducer;
