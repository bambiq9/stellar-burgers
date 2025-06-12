import { TOrder, TUser } from '@utils-types';
import userSlice from './user-slice';
import {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUser,
  updateUser,
  getOrders
} from './user-slice';

const actionTypes = [
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUser,
  updateUser,
  getOrders
];

const mockUser: TUser = {
  email: 'mock@email.test',
  name: 'john'
};

const mockOrders: TOrder[] = [
  {
    _id: '6836008dc2f30c001cb27ac7',
    ingredients: [
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa093f',
      '643d69a5c3f7b9001cfa093f',
      '643d69a5c3f7b9001cfa0941'
    ],
    status: 'done',
    name: 'Бессмертный био-марсианский метеоритный бургер',
    createdAt: '2025-05-27T18:12:29.561Z',
    updatedAt: '2025-05-27T18:12:30.345Z',
    number: 79115
  },
  {
    _id: '683600f0c2f30c001cb27ac9',
    ingredients: ['643d69a5c3f7b9001cfa0940'],
    status: 'done',
    name: 'Метеоритный бургер',
    createdAt: '2025-05-27T18:14:08.040Z',
    updatedAt: '2025-05-27T18:14:08.743Z',
    number: 79116
  },
  {
    _id: '6836132dc2f30c001cb27b3b',
    ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa0941'],
    status: 'done',
    name: 'Био-марсианский люминесцентный бургер',
    createdAt: '2025-05-27T19:31:57.897Z',
    updatedAt: '2025-05-27T19:31:58.737Z',
    number: 79142
  }
];

let initialState: ReturnType<typeof userSlice.getInitialState>;

beforeEach(() => {
  initialState = userSlice.getInitialState();
});

describe('Testing user slice', () => {
  test('all pending actions should set isLoading to true and error to undefined', () => {
    actionTypes.forEach((type) => {
      const action = {
        type: type.pending.type
      };

      const updatedState = userSlice.reducer(initialState, action);

      expect(updatedState.isLoading).toBe(true);
      expect(updatedState.error).toBe(undefined);
    });
  });

  test('all rejected actions should set isLoading to false and set error message', () => {
    actionTypes.forEach((type) => {
      const errorMessage = 'action failed';

      const action = {
        type: type.rejected.type,
        error: {
          message: errorMessage
        }
      };

      const updatedState = userSlice.reducer(initialState, action);
      expect(updatedState.isLoading).toBe(false);
      expect(updatedState.error).toBe(errorMessage);
    });
  });

  test('loginUser.fulfilled should update store with user data and set isAuthenticated to true', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: {
        user: mockUser
      }
    };

    const updatedState = userSlice.reducer(initialState, action);
    expect(updatedState.isAuthenticated).toBe(true);
    expect(updatedState.data).toEqual(mockUser);
    expect(updatedState.isLoading).toBe(false);
    expect(updatedState.error).toBe(undefined);
  });

  test('registerUser.fulfilled should set isLoading to false', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: {
        user: mockUser
      }
    };

    const updatedState = userSlice.reducer(initialState, action);
    expect(updatedState.isAuthenticated).toBe(false);
    expect(updatedState.isLoading).toBe(false);
    expect(updatedState.error).toBe(undefined);
  });

  test('getUser.fulfilled should set user data and authenticate user', () => {
    const action = {
      type: getUser.fulfilled.type,
      payload: {
        user: mockUser
      }
    };

    const updatedState = userSlice.reducer(initialState, action);
    expect(updatedState.isAuthenticated).toBe(true);
    expect(updatedState.data).toEqual(mockUser);
    expect(updatedState.isLoading).toBe(false);
    expect(updatedState.error).toBe(undefined);
  });

  test('logoutUser.fulfilled should clear user data and deauthenticate user', () => {
    const action = {
      type: logoutUser.fulfilled.type
    };

    const updatedState = userSlice.reducer(initialState, action);
    expect(updatedState.isAuthenticated).toBe(false);
    expect(updatedState.data).toEqual({ name: '', email: '' });
    expect(updatedState.isLoading).toBe(false);
    expect(updatedState.error).toBe(undefined);
  });

  test('getOrders.fulfilled should set user orders', () => {
    const action = {
      type: getOrders.fulfilled.type,
      payload: mockOrders
    };

    const updatedState = userSlice.reducer(initialState, action);
    expect(updatedState.orders).toEqual(mockOrders);
    expect(updatedState.isLoading).toBe(false);
    expect(updatedState.error).toBe(undefined);
  });

  test('updateUser.fulfilled should update user data', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: {
        user: mockUser
      }
    };

    const updatedState = userSlice.reducer(initialState, action);
    expect(updatedState.data).toEqual(mockUser);
    expect(updatedState.isLoading).toBe(false);
    expect(updatedState.error).toBe(undefined);
  });
});
