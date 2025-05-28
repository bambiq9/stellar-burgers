import { orderBurgerApi } from '@api';
import { OrdersList } from '@components';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface OrderState {
  currentOrder: TOrder | null;
  isLoading: boolean;
}

const initialState: OrderState = {
  currentOrder: null,
  isLoading: false
};

export const placeOrder = createAsyncThunk(
  'placeOrder',
  async (data: string[]) => orderBurgerApi(data)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.currentOrder = null;
    }
  },
  selectors: {
    selectOrder: (state) => state.currentOrder,
    selectIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder;
    builder.addCase(placeOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(placeOrder.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentOrder = action.payload.order;
    });
  }
});

export const { selectIsLoading, selectOrder } = orderSlice.selectors;

export const { clearOrder } = orderSlice.actions;

export default orderSlice;
