
const benefit = (state=[], action) => {
  switch (action.type){
    case 'SET_PAID_BENEFIT':
      return action.payload;
    default:
      return state;
  }
};


export default benefit;