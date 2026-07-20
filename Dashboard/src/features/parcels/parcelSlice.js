import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { axiosInstance } from "@/services/axiosInstance";

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong";

const parcelSlice = createSlice({
  name: "parcels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const { clearTrack } = parcelSlice.actions;
export default parcelSlice.reducer;
