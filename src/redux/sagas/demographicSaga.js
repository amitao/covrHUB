import axios from 'axios';
import { call, put as dispatch, takeLatest } from 'redux-saga/effects';


// Saga Fetches the data from the demographic table and render it to the DOM via FETCH aand SET

// action function
// function* fetchDemo() {
//   try {
//     const setDemo = yield call(axios.get, `/api/demographic`);
//     yield dispatch({type: 'SET_DEMO', payload: setDemo.data});
//   } catch ( err) {
//     console.log(`Error in fetching demographic ${err}`);
//   };
// }

// GET demographic from specific user only 
function* fetchDemo(action) {
  try {
    const response = yield axios.get(`/api/demographic/userDemographic?id=${action.payload}`);
    yield dispatch({type: 'SET_DEMOGRAPHIC', payload: response.data});
  } catch ( err) {
    console.log(`Error in fetching demographic ${err}`);
  };
}


function* postDemo(action){
  try{
    console.log(`add new demographics ${action.payload}`);
    
    // post demographic via axios
    yield call(axios.post, '/api/demographic', action.payload);
    // dispatch to fetch demographics
    yield dispatch({type: 'FETCH_DEMO'});
    // dispatch to clear new demographic input
    // yield dispatch({type: 'CLEAR_DEMO'});
    
  } catch (err){
    console.log(`Error adding new demo in saga ${err}`);
  }
}


// watcher function
function* demoWatcherSaga() {
  yield takeLatest('FETCH_DEMO', fetchDemo);
  yield takeLatest('ADD_DEMO', postDemo);
}

export default demoWatcherSaga;