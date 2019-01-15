import axios from 'axios';
import { call, put as dispatch, takeLatest } from 'redux-saga/effects';


// Saga Fetches the data from the demographic table and render it to the DOM via FETCH aand SET

// GET demographic from specific user only 
function* fetchDemo(action) {
  try {
    const response = yield axios.get(`/api/demographic/${action.payload}`);
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
    yield dispatch({type: 'FETCH_DEMO'});

  } catch (err){
    console.log(`Error adding new demo in saga ${err}`);
  }
}

//UPDATE
function* updateDemo(action){
  try{
    console.log('payload in PUT saga:', action.payload.demoId);
    
    yield axios.put(`/api/demographic/${action.payload.demoId}`, action.payload);
    yield dispatch({ type: 'FETCH_DEMO'});

  } catch (err) {
    console.log(`Error in updating demo in saga ${err}`);
  }
}






//////////////// IMAGE /////////////////
function* fetchImage(action) {
  try {
    const response = yield axios.get(`/api/demographic/image/${action.payload}`);
    yield dispatch({type: 'SET_IMAGE', payload: response.data});
  } catch ( err) {
    console.log(`Error in fetching image ${err}`);
  };
}


function* postImage(action){
  try{
    console.log(`add new image ${action.payload}`);
    
    // post demographic via axios
    yield call(axios.post, '/api/demographic/image', action.payload);
    yield dispatch({type: 'FETCH_IMAGE'});

  } catch (err){
    console.log(`Error adding new image in saga ${err}`);
  }
}



// watcher function
function* demoWatcherSaga() {
  yield takeLatest('FETCH_DEMO', fetchDemo);
  yield takeLatest('ADD_DEMO', postDemo);
  yield takeLatest('FETCH_IMAGE', fetchImage);
  yield takeLatest('ADD_IMAGE', postImage);
  yield takeLatest('UPDATE_DEMO', updateDemo);
}

export default demoWatcherSaga;