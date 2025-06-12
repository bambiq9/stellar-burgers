import ingredientsSlice, { getIngredients } from './ingredients-slice';
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa0943test',
    name: 'Соус фирменный Space Sauce',
    type: 'sauce',
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa093ftest',
    name: 'Мясо бессмертных моллюсков Protostomia',
    type: 'main',
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
  }
];

describe('Testing ingredients slice', () => {
  test('getIngredient action fullfilled', () => {
    const initialState = ingredientsSlice.getInitialState();

    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };

    const updatedState = ingredientsSlice.reducer(initialState, action);

    expect(updatedState.ingredients).toEqual(mockIngredients);
    expect(updatedState.isLoading).toBe(false);
  });

  test('getIngredient action pending', async () => {
    const initialState = ingredientsSlice.getInitialState();

    const action = {
      type: getIngredients.pending.type
    };

    const updatedState = ingredientsSlice.reducer(initialState, action);
    expect(updatedState.isLoading).toBe(true);
  });

  test('getIngredient action rejected', async () => {
    const initialState = ingredientsSlice.getInitialState();
    const errorMessage = 'action failed';

    const action = {
      type: getIngredients.rejected.type,
      error: {
        message: errorMessage
      }
    };

    const updatedState = ingredientsSlice.reducer(initialState, action);
    expect(updatedState.isLoading).toBe(false);
    expect(updatedState.error).toBe(errorMessage);
  });
});
