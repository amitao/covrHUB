import React from 'react';
import { connect } from 'react-redux';

class DisplayBenefits extends React.Component {


  // componentDidMount() {
  //   this.props.dispatch({type:'FETCH_BENEFIT'});
  // }


  render () {


    return (
      <div>
        display benefit
        {this.props.reduxState.benefit.map( item => {
          return (
            <p ket={item.id}>
            ${item.deductible_in}
            ${item.deductible_out}
            ${item.coinsurance_out}
            ${item.coinsurance_in}
            ${item.copay_in}
            ${item.copay_special}
            ${item.oop_in}
            ${item.oop_out}
        
            </p>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
}


export default connect(mapStateToProps)(DisplayBenefits);