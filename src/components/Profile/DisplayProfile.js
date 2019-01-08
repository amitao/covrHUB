import React from 'react';
import { connect } from 'react-redux';

import './Profile.css';




class DisplayProfile extends React.Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_DEMO', payload: this.props.reduxState.user.id })
  }

  render() {
    return (
      <>
          {this.props.reduxState.demographic.map((item) => {
            return (
              <div key={item.id} className="box">
                <div className="child-one">
                  <p><strong>Name</strong>: {item.first_name}</p>
                  <p><strong>Email</strong>: {item.email}</p>
                </div>
                <div className="child-two">
                  <p><strong>Last</strong>: {item.last_name}</p>
                  <p><strong>Address</strong>: {item.address}</p>
                </div>
              </div>
            )
          })}
      </>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
}

export default connect(mapStateToProps)(DisplayProfile);