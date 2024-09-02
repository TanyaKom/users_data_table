import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export default store;
