import React from 'react';
import { connect } from 'react-redux';


class InsuranceForm extends React.Component {

    state = {
      insurance: ''
    };
 
    componentDidMount() {
      this.props.dispatch({type: 'FETCH_INS'});
    }

    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    };

    handleClick = event =>{
      let insId = this.state.insurance;
      let policyId = this.props.policyId;

      this.props.dispatch({type: 'ADD_INS'})
    }

  render () {
    return (
      <div>

      </div>
    )
  }

}

const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
};


export default connect(mapStateToProps)(InsuranceForm);