import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "../features/user/usersSlice";
import editUserReducer from "../features/user/editUserSlice";
import removeUserReducer from "../features/user/removeUserSlice";
import toastReducer from "../features/toast/toastSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    editUser: editUserReducer,
    removeUser: removeUserReducer,
    toast: toastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
