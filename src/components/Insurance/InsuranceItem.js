import React from 'react';
import { connect } from 'react-redux';
import AddInsurance from './AddInsurance';

class InsuranceItem extends React.Component {

  handleClick = event => {
    this.props.dispatch({ type: 'REMOVE_FAVORITE', payload: this.props.healthInsurance.id });
  }

  render () {
    return (
      <div>
        {this.props.healthInsurance.name}
          <AddInsurance insId={this.props.healthInsurance.id} />
          <Button size="small" color="secondary" onClick={this.handleClick}>Delete</Button>
      </div>
    )
  }

}


export default InsuranceItem;