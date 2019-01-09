const benefitPaid = (state=[], action) => {
  switch (action.type){
    case 'SET_PAID_BENFIT':
      return action.payload;
    default:
      return state;
  }
}

export default benefitPaid;
