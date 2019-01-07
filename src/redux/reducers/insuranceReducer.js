const insurance = (state=[], action) => {
  switch (action.type){
    case 'SET_INSURANCE':
      return action.payload;
    default:
      return state;
  }
};


export default insurance;