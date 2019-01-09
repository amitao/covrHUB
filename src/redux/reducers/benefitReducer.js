const benefit = (state=[], action) => {
  switch (action.type){
    case 'SET_BENEFIT':
      return action.payload;
    // case 'SET_PAID_BENFIT':
    //   return action.payload;
    default:
      return state;
  }
};



export default benefit;