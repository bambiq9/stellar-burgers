import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';

interface FeedState {
  orders: TOrder[];
  currentOrder: TOrder;
  total: number;
  totalToday: number;
  isLoading: boolean;
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
  isLoading: false
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
      })
      .addCase(getFeed.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      })
      .addCase(getFeedOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeedOrder.rejected, (state) => {
        state.isLoading = false;
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
