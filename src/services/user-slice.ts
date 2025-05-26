import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData
} from '@api';
import { setCookie } from '../utils/cookie';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export const registerUser = createAsyncThunk(
  'registerUser',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const loginUser = createAsyncThunk(
  'loginUser',
  async (data: TLoginData) => await loginUserApi(data)
);

export const forgotPassword = createAsyncThunk(
  'forgotPassword',
  async (data: { email: string }) => await forgotPasswordApi(data)
);

export const resetPassword = createAsyncThunk(
  'resetPassword',
  async (data: { password: string; token: string }) =>
    await resetPasswordApi(data)
);

export const getUser = createAsyncThunk(
  'getUser',
  async () => await getUserApi()
);

interface UserState {
  data: TUser;
  loginUserError?: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  data: { name: '', email: '' },
  loginUserError: null,
  isLoading: false,
  isAuthenticated: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectUser: (state) => state.data,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {})
      .addCase(loginUser.rejected, (state, action) => {})
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isAuthenticated = true;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      })
      .addCase(registerUser.pending, (state) => {})
      .addCase(registerUser.rejected, (state) => {})
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isAuthenticated = true;
        state.isLoading = false;
      });
  }
});

export const { selectIsAuthenticated, selectUser, selectIsLoading } =
  userSlice.selectors;
export default userSlice;
