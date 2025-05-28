import {
  forgotPasswordApi,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from '../utils/cookie';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';

export const registerUser = createAsyncThunk(
  'registerUser',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const loginUser = createAsyncThunk(
  'loginUser',
  async (data: TLoginData) => await loginUserApi(data)
);

export const logoutUser = createAsyncThunk(
  'logoutUser',
  async () => await logoutApi()
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

export const updateUser = createAsyncThunk(
  'updateUser',
  async (data: Partial<TRegisterData>) => await updateUserApi(data)
);

export const getOrders = createAsyncThunk(
  'getOrders',
  async () => await getOrdersApi()
);

interface UserState {
  data: TUser;
  orders: TOrder[];
  loginUserError?: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  data: { name: '', email: '' },
  orders: [],
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
    selectIsLoading: (state) => state.isLoading,
    selectOrders: (state) => state.orders
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
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.data = { name: '', email: '' };
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.user;
      });
  }
});

export const {
  selectIsAuthenticated,
  selectUser,
  selectIsLoading,
  selectOrders
} = userSlice.selectors;
export default userSlice;
