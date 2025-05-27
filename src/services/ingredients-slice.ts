import { getIngredientsApi } from '@api';
import {
  combineSlices,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from './store';

interface IngredientsState {
  // ingredients: {
  //   buns: TIngredient[];
  //   mains: TIngredient[];
  //   sauces: TIngredient[];
  // };
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
      // Object.values(sliceState.ingredients).forEach((ingredients) => {
      //   const ingredient = ingredients.find(
      //     (ingredient) => ingredient._id === action.payload
      //   );
      //   if (ingredient) sliceState.currentIngredient = ingredient;
      // });
      const ingredient = sliceState.ingredients.find((ingredient) => {
        console.log('test');
        return ingredient._id === action.payload;
      });
      if (ingredient) sliceState.currentIngredient = ingredient;
      console.log(sliceState.currentIngredient);
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
