import { configureStore } from "@reduxjs/toolkit";
import parcelReducer from "@/features/parcels/parcelSlice.js";

export const store = configureStore({
  reducer: {
    parcels: parcelReducer,
  },
});
