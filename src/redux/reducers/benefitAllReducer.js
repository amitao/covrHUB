const allBenefit = (state=[], action) => {
  switch (action.type){
    case 'SET_ALL_BENEFIT':
      return action.payload;
    default:
      return state;
  }
}

export default allBenefit;
