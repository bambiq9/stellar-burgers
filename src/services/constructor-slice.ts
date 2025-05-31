import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

interface ConstructorState {
  constructorIngredients: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
}

type TReorderPayload = {
  ingredient: TConstructorIngredient;
  direction: string;
};

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
    reorderIngredient: (sliceState, action: PayloadAction<TReorderPayload>) => {
      const ingredients: TConstructorIngredient[] =
        sliceState.constructorIngredients.ingredients;
      const ingredient: TConstructorIngredient = action.payload.ingredient;
      const index = ingredients.findIndex((item) => ingredient.id === item.id);

      if (index === -1) return;

      ingredients.splice(index, 1);
      const direction = action.payload.direction;
      if (direction === 'up') ingredients.splice(index - 1, 0, ingredient);
      if (direction === 'down') ingredients.splice(index + 1, 0, ingredient);
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

export const {
  addIngredient,
  removeIngredient,
  clearConstructor,
  reorderIngredient
} = constructorSlice.actions;
export default constructorSlice;
