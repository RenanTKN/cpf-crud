import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RegisterUser } from "../../types/user";

interface editUserSliceState {
  value: RegisterUser;
}

const initialState: editUserSliceState = {
  value: { cpf: "", nome: "", telefone: "", dataNascimento: "" },
};

export const editUserSlice = createSlice({
  name: "removeUser",
  initialState,
  reducers: {
    setEditUser: (state, action: PayloadAction<RegisterUser>) => {
      state.value = action.payload;
    },
  },
});

export const { setEditUser } = editUserSlice.actions;

export default editUserSlice.reducer;
