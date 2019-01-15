import React from 'react';
import { connect } from 'react-redux';
import EditPolicy from './EditPolicy';

class Edit extends React.Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_POLICY', payload: this.props.reduxState.policy.id})
  }

  render () {
    return (
      
      <div>
        {this.props.reduxState.policy.map( item => {
          return (
            <EditPolicy key={item.id} value={item.id} item={item} />
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


export default connect(mapStateToProps)(Edit);