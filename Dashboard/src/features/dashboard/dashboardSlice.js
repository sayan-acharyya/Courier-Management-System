import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { axiosInstance } from "@/services/axiosInstance";

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong"


export const fetchDashboardStatesThunk = createAsyncThunk("dashboard/fetchStates", async (_, thunkAPI) => {
  try {
    const { data } = await axiosInstance.get("/dashboard/stats");
    return data;
  } catch (error) {
    const message = getErrorMessage(error);
    toast.error(message);
    return thunkAPI.rejectWithValue(message)
  }
});

const initialState = {
  stats: null,
  loading: false,
  error: null
}

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDashboardStatesThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(fetchDashboardStatesThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.stats = action.payload;
    })
    builder.addCase(fetchDashboardStatesThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to load dashboard states";
    })
  },
});

export default dashboardSlice.reducer;
