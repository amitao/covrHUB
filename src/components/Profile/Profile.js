import React from 'react';
import { connect } from 'react-redux';

import './Profile.css';
import ProfileItem from './ProfileItem';




class Profile extends React.Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_DEMO', payload: this.props.reduxState.user.id})
  }

  render() {
    return (
      <>
          {this.props.reduxState.demographic.map((demo) => {
            return (
              <ProfileItem key={demo.id} demo={demo} />
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

export default connect(mapStateToProps)(Profile);