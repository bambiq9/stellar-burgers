import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface IngredientsState {
  ingredients: TIngredient[];
  currentIngredient: TIngredient | null;
  isLoading: boolean;
}

const initialState: IngredientsState = {
  ingredients: [],
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
      const ingredient = sliceState.ingredients.find(
        (ingredient) => ingredient._id === action.payload
      );
      if (ingredient) sliceState.currentIngredient = ingredient;
    }
  },
  selectors: {
    selectIngredient: (sliceState) => sliceState.currentIngredient,
    selectIngredients: (sliceState) => sliceState.ingredients,
    selectBuns: (sliceState) =>
      sliceState.ingredients.filter((ingredient) => ingredient.type === 'bun'),
    selectSauces: (sliceState) =>
      sliceState.ingredients.filter(
        (ingredient) => ingredient.type === 'sauce'
      ),
    selectMains: (sliceState) =>
      sliceState.ingredients.filter((ingredient) => ingredient.type === 'main'),
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
      .addCase(getIngredients.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        ingredients: action.payload
      }));
  }
});

export const {
  selectIngredient,
  selectIngredients,
  selectIsLoading,
  selectBuns,
  selectMains,
  selectSauces
} = ingredientsSlice.selectors;

export const { setIngredient } = ingredientsSlice.actions;
export default ingredientsSlice;
