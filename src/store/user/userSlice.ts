import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { getUserInfo } from '@/services/usersServices';

interface UserState {
  userId: string;
  email: string;
  username: string;
  plan: string;
  nextBillingDate: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userId: '',
  email: '',
  username: '',
  plan: '',
  nextBillingDate: '',
  isLoading: false,
  error: null,
};

export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserInfo();

      return response;
    } catch (error) {
      console.error('Error fetching user info:', error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      }

      return rejectWithValue("Couldn't fetch user info.");
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserState: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(fetchUserInfo.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userId = action.payload.user_id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.plan = action.payload.plan;
      state.nextBillingDate = action.payload.next_billing_date;
    });
    builder.addCase(fetchUserInfo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { resetUserState } = userSlice.actions;

export default userSlice.reducer;
