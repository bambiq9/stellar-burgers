import { combineSlices, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients-slice';
import constructorReducer from './constructor-slice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import userSlice from './user-slice';
import feedSlice from './feed-slice';
import orderSlice from './order-slice';

const rootReducer = combineSlices(
  ingredientsReducer,
  constructorReducer,
  userSlice,
  feedSlice,
  orderSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
