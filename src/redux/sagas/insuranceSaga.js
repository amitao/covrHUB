import axios from 'axios';
import { call, put as dispatch, takeLatest } from 'redux-saga/effects';

// action function
// GET insurance from specific user via ID

function* fetchInsurance(action) {
  try {
    const response = yield axios.get(`/api/insurance/${action.payload}`);
    yield dispatch({type: 'SET_INSURANCE', payload: response.data});
  } catch (err) {
    console.log(`Error in fetching insurance ${err}`);
  };
}


// action Insurance
function* postInsurance(action) {
  try{
    yield call(axios.post, '/api/insurance', action.payload);
    yield dispatch({type: 'FETCH_INSURANCE'});
  } catch (err) {
    console.log(`Error in post insurance info ${err}`);
  }
}

function* deleteInsurance(action) {
  try {
    yield call(axios.delete, `api/insurance/${action.payload}`);
    yield dispatch({type: 'FETCH_INSURANCE'});
  } catch (err) {
    console.log(`error in delete`);
  }
}

// watcher functions
function* insWatcherSaga() {
  yield takeLatest('FETCH_INSURANCE', fetchInsurance);
  yield takeLatest('ADD_INSURANCE', postInsurance);
  yield takeLatest('DELETE_INS', deleteInsurance);
}

export default insWatcherSaga;