import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api';

// Async actions to call backend APIs
export const createUser = createAsyncThunk('user/createUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/create', userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || "Failed to create user.");
  }
});

export const addPoints = createAsyncThunk('user/addPoints', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/add-points', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || "Failed to add points.");
  }
});

export const redeemPoints = createAsyncThunk('user/redeemPoints', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/redeem-points', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || "Failed to redeem points.");
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create User
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
        state.error = null; // Clear error on success
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.status = 'failed';
      })

      // Add Points
      .addCase(addPoints.fulfilled, (state, action) => {
        if (state.user && state.user.email === action.meta.arg.email) {
          state.user.points = action.payload.points;
        }
        state.status = 'succeeded';
        state.error = null; // Clear error on success
      })
      .addCase(addPoints.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.status = 'failed';
      })

      // Redeem Points
      .addCase(redeemPoints.fulfilled, (state, action) => {
        if (state.user && state.user.email === action.meta.arg.email) {
          state.user.points = action.payload.points;
        }
        state.status = 'succeeded';
        state.error = null; // Clear error on success
      })
      .addCase(redeemPoints.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.status = 'failed';
      });
  },
});

export default userSlice.reducer;
