import { TOrder } from '@utils-types';
import orderSlice from './order-slice';
import { placeOrder } from './order-slice';

const mockOrder = [
  {
    _id: '643d69a5c3f7b9001cfa0940',
    name: 'Говяжий метеорит (отбивная)',
    type: 'main',
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: 'https://code.s3.yandex.net/react/code/meat-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa093f',
    name: 'Мясо бессмертных моллюсков Protostomia',
    type: 'main',
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa0948',
    name: 'Кристаллы марсианских альфа-сахаридов',
    type: 'main',
    proteins: 234,
    fat: 432,
    carbohydrates: 111,
    calories: 189,
    price: 762,
    image: 'https://code.s3.yandex.net/react/code/core.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    __v: 0
  }
];

let initialState: ReturnType<typeof orderSlice.getInitialState>;

beforeEach(() => {
  initialState = orderSlice.getInitialState();
});

describe('Testing order slice', () => {
  test('placeOrder pending should clear error and set isLoading to true', () => {
    const action = {
      type: placeOrder.pending.type
    };

    const updatedState = orderSlice.reducer(initialState, action);

    expect(updatedState.isLoading).toBe(true);
    expect(updatedState.error).toBe(undefined);
  });

  test('placeOrder rejected should set error to error message', () => {
    const errorMessage = 'action failed';

    const action = {
      type: placeOrder.rejected.type,
      error: {
        message: errorMessage
      }
    };

    const updatedState = orderSlice.reducer(initialState, action);

    expect(updatedState.isLoading).toBe(false);
    expect(updatedState.error).toBe(errorMessage);
  });

  test('placeOrder fulfilled should set currentOrder', () => {
    const action = {
      type: placeOrder.fulfilled.type,
      payload: {
        order: mockOrder
      }
    };

    const updatedState = orderSlice.reducer(initialState, action);

    expect(updatedState.currentOrder).toEqual(mockOrder);
    expect(updatedState.isLoading).toBe(false);
    expect(updatedState.error).toBe(undefined);
  });
});
