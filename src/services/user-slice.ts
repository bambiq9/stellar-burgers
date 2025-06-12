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
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { addToken, removeToken } from '../utils/token';

export const registerUser = createAsyncThunk(
  'registerUser',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const loginUser = createAsyncThunk(
  'loginUser',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    addToken(response);
    return response;
  }
);

export const logoutUser = createAsyncThunk('logoutUser', async () => {
  const response = await logoutApi();
  removeToken();
  return response;
});

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
  error: string | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  data: { name: '', email: '' },
  orders: [],
  error: undefined,
  isLoading: false,
  isAuthenticated: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectUser: (state) => state.data,
    selectUserName: (state) => state.data.name,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectIsLoading: (state) => state.isLoading,
    selectOrders: (state) => state.orders,
    selectError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.user;
      })
      .addCase(getUser.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.data = { name: '', email: '' };
        state.isLoading = false;
      })
      .addCase(getOrders.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.user;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      });
  }
});

export const {
  selectIsAuthenticated,
  selectUser,
  selectUserName,
  selectIsLoading,
  selectOrders,
  selectError
} = userSlice.selectors;
export default userSlice;
