import axios from 'axios';
import { call, put as dispatch, takeLatest } from 'redux-saga/effects';


// action Benefit
function* fetchAll(action) {
  try {
    const response = yield axios.get(`/api/benefits/${action.payload}`);
    yield dispatch({type: 'SET_ALL_BENEFIT', payload: response.data});
  } catch (err) {
    console.log(`Error in fetching benefits ${err}`);
  };
}




function* postBenefit(action) {
  try{
    yield call(axios.post, `/api/benefits/add`, action.payload);
    yield dispatch({type: 'FETCH_BENEFIT'});
  } catch (err) {
    console.log(`Error in posting to benefit ${err}`);
  }
}

// GET request to render data in benefits
// ser_benefit?id=
function* fetchBenefit(action) {
  try {
    const response = yield axios.get(`/api/benefits/add/${action.payload}`);
    yield dispatch({type: 'SET_BENEFIT', payload: response.data});
  } catch (err) {
    console.log(`Error in fetching benefits ${err}`);
  };
}


// ////////////// GET PAID BENEFITS  ////////////////////////
function* fetchPaidBenefit (action) {
  try {
    const response = yield axios.get(`/api/benefits/paid/${action.payload}`);
    yield dispatch({type: 'SET_PAID_BENEFIT', payload: response.data});
  } catch (err) {
    console.log(`Error in fetching paid benefits ${err}`);
  }
}
// action Benefit
function* postPaidBenefit(action) {
  try{
    yield call(axios.post, `/api/benefits/paid`, action.payload);
    yield dispatch({type: 'FETCH_PAID_BENEFIT'});
  } catch (err) {
    console.log(`Error in posting to benefit ${err}`);
  }
}


function* benefitWatcherSaga() {
  yield takeLatest('FETCH_ALL_BENEFIT', fetchAll);
  yield takeLatest('ADD_BENEFIT', postBenefit );
  yield takeLatest('FETCH_BENEFIT', fetchBenefit);
  yield takeLatest('FETCH_PAID_BENEFIT', fetchPaidBenefit);
  yield takeLatest('ADD_PAID_BENEFIT', postPaidBenefit);
}

export default benefitWatcherSaga;