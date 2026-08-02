import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { axiosInstance } from "@/services/axiosInstance";

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong";

export const loginThunk = createAsyncThunk("auth/login", async (payload, thunkAPI) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", payload);
    localStorage.setItem("token", data.token);
    toast.success("Logged In Successfully");
    return data;
  } catch (error) {
    const message = getErrorMessage(error);
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const addUserThunk = createAsyncThunk("auth/addUser", async (payload, thunkAPI) => {
  try {
    const { data } = await axiosInstance.post("/auth/add-user", payload);
    toast.success("User created successfully");
    return data;
  } catch (error) {
    const message = getErrorMessage(error);
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.user = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login Cases
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload?.token || null;
        state.user = action.payload?.user || null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login Failed";
      })
      // Add User Cases
      .addCase(addUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUserThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add user";
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;