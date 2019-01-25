import demographic from './demographicReducer';

describe('Testing demographicReducer', () => {
  test('should have its correct initial state', () => {
    let action = [];
    let returnedState = demographic(undefined, action);
    expect(returnedState).toEqual(action.payload)
  })
})