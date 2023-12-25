import { configureStore } from "@reduxjs/toolkit";
import scheduleReducer from "../features/scheduleSlice";

export default configureStore({
  reducer: {
    schedule: scheduleReducer,
  },
});
