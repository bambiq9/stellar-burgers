import feedSlice, { getFeed, getFeedOrder } from './feed-slice';

const actionTypes = [getFeed, getFeedOrder];

const mockFeed = {
  orders: [
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
    }
  ],
  total: 2,
  totalToday: 1
};

const mockFeedOrder = {
  success: true,
  orders: [
    {
      _id: '684b0922c2f30c001cb2c086',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093c'
      ],
      owner: '6843411cc2f30c001cb2a7c5',
      status: 'done',
      name: 'Краторный био-марсианский бургер',
      createdAt: '2025-06-12T17:06:42.144Z',
      updatedAt: '2025-06-12T17:06:43.439Z',
      number: 81150,
      __v: 0
    }
  ]
};

let initialState: ReturnType<typeof feedSlice.getInitialState>;

beforeEach(() => {
  initialState = feedSlice.getInitialState();
});

describe('Testing feed slice', () => {
  test('All pending should set isLoading to true and clear error', () => {
    actionTypes.forEach((type) => {
      const action = {
        type: type.pending.type
      };

      const updatedState = feedSlice.reducer(initialState, action);

      expect(updatedState.isLoading).toBe(true);
      expect(updatedState.error).toBe(undefined);
    });
  });

  test('All rejected should set isLoading to false and set error message', () => {
    actionTypes.forEach((type) => {
      const errorMessage = 'action failed';

      const action = {
        type: type.rejected.type,
        error: {
          message: errorMessage
        }
      };

      const updatedState = feedSlice.reducer(initialState, action);

      expect(updatedState.isLoading).toBe(false);
      expect(updatedState.error).toBe(errorMessage);
    });
  });

  test('getFeed fulfilled should set feed orders, total orders count and total orders count today', () => {
    const action = {
      type: getFeed.fulfilled.type,
      payload: mockFeed
    };

    const updatedState = feedSlice.reducer(initialState, action);

    expect(updatedState.orders).toEqual(mockFeed.orders);
    expect(updatedState.total).toBe(mockFeed.total);
    expect(updatedState.totalToday).toBe(mockFeed.totalToday);
    expect(updatedState.isLoading).toBe(false);
    expect(updatedState.error).toBe(undefined);
  });

  test('getFeedOrder fulfilled should set the currently open order', () => {
    const action = {
      type: getFeedOrder.fulfilled.type,
      payload: mockFeedOrder
    };

    const updatedState = feedSlice.reducer(initialState, action);

    expect(updatedState.currentOrder).toEqual(mockFeedOrder.orders[0]);
    expect(updatedState.isLoading).toBe(false);
    expect(updatedState.error).toBe(undefined);
  });
});
