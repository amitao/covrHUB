import axios from 'axios';
import { call, put as dispatch, takeLatest } from 'redux-saga/effects';


// action Benefit
function* postBenefit(action) {
  try{
    yield call(axios.post, `/api/insurance/benefits`, action.payload);
    yield dispatch({type: 'FETCH_BENEFIT'});
  } catch (err) {
    console.log(`Error in posting to benefit ${err}`);
  }
}

// GET request to render data in benefits
function* fetchBenefit(action) {
  try {
    const response = yield axios.get(`/api/insurance/benefits/user_benefit?id=${action.payload}`);
    yield dispatch({type: 'SET_BENEFIT', payload: response.data});
  } catch (err) {
    console.log(`Error in fetching benefits ${err}`);
  };
}


// GET PAID BENEFITS
function* fetchPaidBenefit () {
  try {
    const response = yield axios.get(`/api/insurance/benefits/paid`);
    yield dispatch({type: 'SET_PAID_BENEFIT', payload: response.data});
  } catch (err) {
    console.log(`Error in fetching paid benefits ${err}`);
  }
}
// action Benefit
function* postPaidBenefit(action) {
  try{
    yield call(axios.post, `/api/insurance/benefits/paid`, action.payload);
    yield dispatch({type: 'FETCH_PAID_BENEFIT'});
  } catch (err) {
    console.log(`Error in posting to benefit ${err}`);
  }
}



function* benefitWatcherSaga() {
  yield takeLatest('ADD_BENEFIT', postBenefit );
  yield takeLatest('FETCH_BENEFIT', fetchBenefit);
  yield takeLatest('FETCH_PAID_BENEFIT', fetchPaidBenefit);
  yield takeLatest('ADD_PAID_BENEFIT', postPaidBenefit);
}

export default benefitWatcherSaga;