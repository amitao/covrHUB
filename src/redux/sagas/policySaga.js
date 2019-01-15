import axios from 'axios';
import { put as dispatch, takeLatest, call } from 'redux-saga/effects';

// PUT updating insurance to link to policy
// function* addInsurance(action) {
//   try {
//     console.log(`in Saga to update insurance, payload is: ${action.payload}`);
    
//     yield axios.put(`/api/policy/${action.payload.policyId}`, action.payload);
//     yield dispatch({type: 'FETCH_POLICY'});
//   } catch (error) {
//       console.log('Error with fetching insurance:', error);
//   }
// }


// GET REQUEST - data of joined table "policy", "insurance", and "benefitpaid"
function* fetchPolicy(action) {
  try {
    const response = yield axios.get(`/api/policy/${action.payload}`);
    yield dispatch({type: 'SET_POLICY', payload: response.data});
  } catch (error) {
      console.log('Error with fetching 3 tables', error);
  }
}
 // POST REQUEST
function* postPolicy(action) {
  yield call(axios.post, '/api/policy', action.payload)
  yield dispatch({type: 'FETCH_POLICY'})
}

//////////////////////////////////////////////////////////////////

 // POST paid benefits REQUEST
function* postPaidBenefit(action) {
  yield call(axios.post, '/api/policy/benefitPaid', action.payload)
  yield dispatch({type: 'FETCH_POLICY'})
}
//GET SINGLE POLICY
function* fetchSinglePolicy(action) {
  try{
    const response = yield axios.get(`/api/single/${action.payload}`);
    yield dispatch({type: 'SET_SINGLE_POLICY', payload: response.data});
  }
  catch (error) {
    console.log(`Error with fetching single policy ${error}, ${action.payload}`);
  }
}

///////////////////////////////////////////////////////////
function* deletePolicy(action) {
  try {
    console.log(`in Saga to delete policy, payload is: ${action.payload}`);
    yield call(axios.delete, `api/policy/${action.payload}`);
    yield dispatch({type: 'FETCH_POLICY'});
  } catch (err) {
    console.log(`Error in Saga delete`);
  }
}

function* updatePolicy(action){
  try{
    console.log('payload in PUT policy saga:', action.payload.policyId);
    
    yield axios.put(`/api/policy/${action.payload.policyId}`, action.payload);
    yield dispatch({ type: 'FETCH_POLICY'});

  } catch (err) {
    console.log(`Error in updating policy in saga ${err}`);
  }
}

function* policyWatcherSaga() {
  yield takeLatest('FETCH_POLICY', fetchPolicy);
  yield takeLatest('ADD_POLICY', postPolicy);
  yield takeLatest('ADD_PAID_BENEFIT', postPaidBenefit);
  yield takeLatest('FETCH_SINGLE_POLICY', fetchSinglePolicy);
  yield takeLatest('DELETE_POLICY', deletePolicy);
  yield takeLatest('UPDATE_POLICY', updatePolicy);
}


export default policyWatcherSaga;
