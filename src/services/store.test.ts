import store, { rootReducer } from './store';

describe('Testing rootReducer', () => {
  test('Calling rootReducer with undefined state and unknown action should return current state', () => {
    const initialState = store.getState();
    expect(rootReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });
});
