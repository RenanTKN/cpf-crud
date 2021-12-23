import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Toast } from "../../types/toast";

interface toastSliceState {
  value: Toast;
}

const initialState: toastSliceState = {
  value: { open: false, severity: "success", message: "" },
};

export const toastSlice = createSlice({
  name: "removeUser",
  initialState,
  reducers: {
    setToast: (state, action: PayloadAction<Toast>) => {
      state.value = action.payload;
    },
  },
});

export const { setToast } = toastSlice.actions;

export default toastSlice.reducer;
