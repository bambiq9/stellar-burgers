import { TConstructorIngredient } from '@utils-types';
import constructorSlice, {
  addIngredient,
  removeIngredient,
  reorderIngredient
} from './constructor-slice';
import { configureStore } from '@reduxjs/toolkit';

const mockIngredients: TConstructorIngredient[] = [
  {
    id: '001',
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
    id: '002',
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

const mockIngredient: TConstructorIngredient = {
  id: '003',
  _id: '643d69a5c3f7b9001cfa0942test',
  name: 'Соус Test',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
};

const createMockStore = () =>
  configureStore({
    reducer: {
      burgerConstructor: constructorSlice.reducer
    },
    preloadedState: {
      burgerConstructor: {
        constructorIngredients: { bun: null, ingredients: mockIngredients }
      }
    }
  });

describe('Testing burger constructor slice', () => {
  test('Add ingredient action', () => {
    const mockStore = createMockStore();

    mockStore.dispatch(addIngredient(mockIngredient));

    expect(
      mockStore.getState().burgerConstructor.constructorIngredients.ingredients
    ).toContain(mockIngredient);
  });

  test('Remove ingredient action', () => {
    const mockStore = createMockStore();

    mockStore.dispatch(addIngredient(mockIngredient));
    expect(
      mockStore.getState().burgerConstructor.constructorIngredients.ingredients
    ).toContain(mockIngredient);

    mockStore.dispatch(removeIngredient(mockIngredient));

    expect(
      mockStore.getState().burgerConstructor.constructorIngredients.ingredients
    ).not.toContain(mockIngredient);
  });

  test('Remove ingredient from the empty store', () => {
    // Should contain empty ingredients array
    const initialState = constructorSlice.getInitialState();

    const action = {
      type: removeIngredient.type,
      payload: mockIngredient
    };

    const updatedState = constructorSlice.reducer(initialState, action);

    expect(updatedState).toEqual(initialState);
  });

  test('Sort ingredients action', () => {
    const mockStore = createMockStore();

    mockStore.dispatch(addIngredient(mockIngredient));

    mockStore.dispatch(
      reorderIngredient({ ingredient: mockIngredient, direction: 'up' })
    );
    const ingredients =
      mockStore.getState().burgerConstructor.constructorIngredients.ingredients;
    const ingredientIndex = ingredients.findIndex(
      (ingredient) => ingredient.id === mockIngredient.id
    );

    expect(ingredientIndex).toBe(ingredients.length - 2);
  });

  test('Sorting the first ingredient up', () => {
    const mockStore = createMockStore();

    const ingredients =
      mockStore.getState().burgerConstructor.constructorIngredients.ingredients;
    const firstIngredient = ingredients[0];

    mockStore.dispatch(
      reorderIngredient({ ingredient: firstIngredient, direction: 'up' })
    );

    const updatedState =
      mockStore.getState().burgerConstructor.constructorIngredients.ingredients;

    expect(updatedState).toEqual(ingredients);
  });

  test('Sorting the last ingredient down', () => {
    const mockStore = createMockStore();

    const ingredients =
      mockStore.getState().burgerConstructor.constructorIngredients.ingredients;

    const lastIngredient = ingredients[ingredients.length - 1];

    mockStore.dispatch(
      reorderIngredient({ ingredient: lastIngredient, direction: 'down' })
    );

    const updatedState =
      mockStore.getState().burgerConstructor.constructorIngredients.ingredients;

    expect(updatedState).toEqual(ingredients);
  });

  test('Sorting ingredient out of an array', () => {
    const mockStore = createMockStore();

    const initialState =
      mockStore.getState().burgerConstructor.constructorIngredients.ingredients;

    mockStore.dispatch(
      reorderIngredient({ ingredient: mockIngredient, direction: 'up' })
    );

    const updatedState =
      mockStore.getState().burgerConstructor.constructorIngredients.ingredients;

    expect(updatedState).toEqual(initialState);
  });
});
