import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';

interface FeedState {
  orders: TOrder[];
  currentOrder: TOrder;
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | undefined;
}

const initialState: FeedState = {
  orders: [],
  currentOrder: {
    createdAt: '',
    ingredients: [],
    _id: '',
    status: '',
    name: '',
    updatedAt: 'string',
    number: 0
  },
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: undefined
};

export const getFeed = createAsyncThunk('getFeed', async () => getFeedsApi());

export const getFeedOrder = createAsyncThunk(
  'getFeedOrder',
  async (orderNumber: number) => getOrderByNumberApi(orderNumber)
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (state) => state.orders,
    selectCurrentOrder: (state) => state.currentOrder,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday,
    selectIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      })
      .addCase(getFeedOrder.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getFeedOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getFeedOrder.fulfilled, (state, action) => {
        state.currentOrder = action.payload.orders[0];
        state.isLoading = false;
      });
  }
});

export const {
  selectOrders,
  selectCurrentOrder,
  selectTotal,
  selectTotalToday,
  selectIsLoading
} = feedSlice.selectors;

export default feedSlice;
