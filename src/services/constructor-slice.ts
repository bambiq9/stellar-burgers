import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

interface ConstructorState {
  constructorIngredients: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
}

const initialState: ConstructorState = {
  constructorIngredients: {
    bun: null,
    ingredients: []
  }
};

export const placeOrder = createAsyncThunk('getFeed', async (data: string[]) =>
  orderBurgerApi(data)
);

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (
      sliceState,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ingredient = action.payload;

      if (ingredient.type === 'bun')
        sliceState.constructorIngredients.bun = ingredient;
      else sliceState.constructorIngredients.ingredients.push(action.payload);
    },
    removeIngredient: (
      sliceState,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const { id } = action.payload;

      sliceState.constructorIngredients.ingredients =
        sliceState.constructorIngredients.ingredients.filter(
          (ingredient) => ingredient.id !== id
        );
    }
  },
  selectors: {
    selectConstructorIngredients: (sliceState) =>
      sliceState.constructorIngredients
  },
  extraReducers: (builder) => {
    builder.addCase(placeOrder.pending, (state) => {});
    builder.addCase(placeOrder.rejected, (state) => {});
    builder.addCase(placeOrder.fulfilled, (state) => {});
  }
});

export const { selectConstructorIngredients } = constructorSlice.selectors;

export const { addIngredient, removeIngredient } = constructorSlice.actions;
export default constructorSlice;
