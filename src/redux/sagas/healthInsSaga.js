import axios from 'axios';
import { call, put as dispatch, takeLatest } from 'redux-saga/effects';

function* fetchAll() {
  try {
    const response = yield axios.get(`/api/healthInsurance/${action.payload}`);
    yield dispatch({type: 'SET_HEALTH', payload: response.data});
  } catch (err) {
    console.log(`Error in fetching benefits ${err}`);
  };
}


function* healthWatcherSaga() {
  yield takeLatest('FETCH_INS', fetchAll);
}

export default healthWatcherSaga;