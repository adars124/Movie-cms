import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer, { addUser, clearUser } from "./user.slice";

const rootReducer = combineReducers({
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
})

export default store;

export type RootState = ReturnType<typeof rootReducer>;

export { addUser, clearUser };
