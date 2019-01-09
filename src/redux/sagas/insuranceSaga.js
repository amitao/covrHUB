import axios from 'axios';
import { call, put as dispatch, takeLatest } from 'redux-saga/effects';

// action function
// GET insurance from specific user via ID
function* fetchInsurance(action) {
  try {
    const response = yield axios.get(`/api/insurance/user_insurance?id=${action.payload}`);
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

// action Benefit
function* postBenefit(action) {
  try{
    yield call(axios.post, `/api/insurance/benefits`, action.payload);
    yield dispatch({type: 'FETCH_BENEFIT'});
  } catch (err) {
    console.log(`Error in posting to benefit ${err}`);
  }
}


function* fetchBenefit(action) {
  try {
    const response = yield axios.get(`/api/insurance/benefits/user_benefit?id=${action.payload}`);
    yield dispatch({type: 'SET_BENEFIT', payload: response.data});
  } catch (err) {
    console.log(`Error in fetching benefits ${err}`);
  };
}


// watcher functions
function* insWatcherSaga() {
  yield takeLatest('FETCH_INSURANCE', fetchInsurance);
  yield takeLatest('ADD_INSURANCE', postInsurance);
  yield takeLatest('ADD_BENEFIT', postBenefit );
  yield takeLatest('FETCH_BENEFIT', fetchBenefit);
}

export default insWatcherSaga;