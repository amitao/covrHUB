import axios from 'axios';
import { put as dispatch, takeLatest } from 'redux-saga/effects';

// action function
// GET insurance from specific user via ID
function* fetchInsurance() {
  try {
    const response = yield axios.get(`/api/insurance/`);
    yield dispatch({type: 'SET_INSURANCE', payload: response.data});
  } catch (error) {
      console.log('Error with fetching insurance:', error);
  }
}


// watcher functions
function* insWatcherSaga() {
  yield takeLatest('FETCH_INSURANCE', fetchInsurance);
}

export default insWatcherSaga;