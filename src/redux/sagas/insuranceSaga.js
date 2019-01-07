import axios from 'axios';
import { call, put as dispatch, takeLatest } from 'redux-saga/effects';

// action functions
// function* fetchInsurance() {
//   try {
//     const getInReponse = yield call(axios.get, '/api/insurance');
//     yield dispatch({type: 'SET_INSURANCE', payload: getInReponse.data});
//   } catch (err) {
//     console.log(`Error in fetching insurance ${err}`);
//   };
// }


// GET insurance from specific user via ID
function* fetchInsurance(action) {
  try {
    const response = yield axios.get(`/api/insurance/userInsurance?id=${action.payload}`);
    yield dispatch({type: 'SET_INSURANCE', payload: response.data});
  } catch (err) {
    console.log(`Error in fetching insurance ${err}`);
  };
}


function* postInsurance(action) {
  try{
    yield call(axios.post, '/api/insurance', action.payload);
    yield dispatch({type: 'FETCH_INSURANCE'});
  } catch (err) {
    console.log(`Error in post insurance info ${err}`);
  }
}


// watcher functions
function* insWatcherSaga() {
  yield takeLatest('FETCH_INSURANCE', fetchInsurance);
  yield takeLatest('ADD_INSURANCE', postInsurance);
 
}

export default insWatcherSaga;