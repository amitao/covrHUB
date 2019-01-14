import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import './Policy.css';




class BenefitPaid extends React.Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_POLICY'});
  }

  state ={
    ded_in: '',
    ded_out: '',
    oop_in: '',
    oop_out: '',
  }

  render() {

    return (
      <div>
        
        {this.props.reduxState.policy.map( (benefit, i) => {
          return (
            <div key={i}>
              <p>Policy: {benefit.name}</p>
              <p>Member ID#:{benefit.member_number}</p>
              <p>Total: ${benefit.deductible_in}, Amount paid: ${benefit.ded_in_paid}, 
              Remaining: </p>
              ${benefit.ded_out_paid}
              ${benefit.oop_in_paid}
              ${benefit.oop_out_paid}
              Last paid date:{(moment(benefit.date).format('l'))}
            </div>
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

export default connect(mapStateToProps)(BenefitPaid);