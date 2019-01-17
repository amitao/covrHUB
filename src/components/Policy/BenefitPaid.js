import React from 'react';
import { connect } from 'react-redux';
import BenefitPaidItem from './BenefitPaidItem';



class BenefitPaid extends React.Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_POLICY', payload: this.props.reduxState.policy.id });
  }


  render() {

    return (
      <div>
        {this.props.reduxState.policy.map(item => {
          return (
            <BenefitPaidItem
              key={item.id}
              item={item}
            />
          )
        }
        )}

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