import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { axiosInstance } from "@/services/axiosInstance";

const initialState = {
  parcels: [],
  parcel: null,
  loading: false,
  error: null,
};

const parcelSlice = createSlice({
  name: "parcels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // add your async thunk reducers here
  },
});

export default parcelSlice.reducer;