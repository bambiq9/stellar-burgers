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
    },
    clearConstructor: (sliceState) => {
      sliceState.constructorIngredients = { bun: null, ingredients: [] };
    }
  },
  selectors: {
    selectConstructorIngredients: (sliceState) =>
      sliceState.constructorIngredients
  }
});

export const { selectConstructorIngredients } = constructorSlice.selectors;

export const { addIngredient, removeIngredient, clearConstructor } =
  constructorSlice.actions;
export default constructorSlice;
