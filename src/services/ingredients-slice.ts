import { getIngredientsApi } from '@api';
import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface IngredientsState {
  ingredients: TIngredient[];
  currentIngredient: TIngredient | null;
  isLoading: boolean;
  error: string | undefined;
}

const initialState: IngredientsState = {
  ingredients: [],
  currentIngredient: null,
  isLoading: false,
  error: undefined
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
        state.error = undefined;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredients.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        ingredients: action.payload
      }));
  }
});

export const { selectIngredient, selectIngredients, selectIsLoading } =
  ingredientsSlice.selectors;

export const { setIngredient } = ingredientsSlice.actions;
export default ingredientsSlice;

export const selectBuns = createSelector([selectIngredients], (state) =>
  state.filter((ingredient) => ingredient.type === 'bun')
);

export const selectMains = createSelector([selectIngredients], (state) =>
  state.filter((ingredient) => ingredient.type === 'main')
);

export const selectSauces = createSelector([selectIngredients], (state) =>
  state.filter((ingredient) => ingredient.type === 'sauce')
);
