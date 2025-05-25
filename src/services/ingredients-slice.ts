import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface IngredientsState {
  ingredients: {
    buns: TIngredient[];
    mains: TIngredient[];
    sauces: TIngredient[];
  };
  currentIngredient: TIngredient | null;
  isLoading: boolean;
}

const initialState: IngredientsState = {
  ingredients: {
    buns: [],
    mains: [],
    sauces: []
  },
  currentIngredient: null,
  isLoading: false
};

export const getIngredients = createAsyncThunk('getIngredients', async () =>
  getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredient: (sliceState, action: PayloadAction<string>) => {
      Object.values(sliceState.ingredients).forEach((ingredients) => {
        const ingredient = ingredients.find(
          (ingredient) => ingredient._id === action.payload
        );
        if (ingredient) sliceState.currentIngredient = ingredient;
      });
    }
  },
  selectors: {
    selectIngredient: (sliceState) => sliceState.currentIngredient,
    selectIngredients: (sliceState) => sliceState.ingredients,
    selectIsLoading: (sliceState) => sliceState.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        const buns: TIngredient[] = [];
        const mains: TIngredient[] = [];
        const sauces: TIngredient[] = [];
        action.payload.forEach((ingredient) => {
          if (ingredient.type === 'bun') buns.push(ingredient);
          if (ingredient.type === 'main') mains.push(ingredient);
          if (ingredient.type === 'sauce') sauces.push(ingredient);
        });

        return {
          ...state,
          isLoading: false,
          ingredients: { buns, mains, sauces }
        };
      });
  }
});

export const { selectIngredient, selectIngredients, selectIsLoading } =
  ingredientsSlice.selectors;

export const { setIngredient } = ingredientsSlice.actions;
export default ingredientsSlice;
