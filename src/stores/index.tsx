import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slices/user";
import  roleSlice  from "./slices/role";

export const store = configureStore({
  reducer: {
    user: userSlice,
    role: roleSlice
  }
});




declare global {
  type RootState = ReturnType<typeof store.getState>;
  type AppDispatch = typeof store.dispatch;
}