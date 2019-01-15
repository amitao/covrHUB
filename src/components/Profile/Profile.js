import React from 'react';
import { connect } from 'react-redux';

import './Profile.css';
// import ProfileItem from './ProfileItem';
import EditProfile from './EditProfile';



class Profile extends React.Component {
  state = {
    policyValues: ''
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_DEMO', payload: this.props.reduxState.user.id})
  }
  
  render() {
    return (
      <div>
          {this.props.reduxState.demographic.map((demo) => {
            return (
            
              <EditProfile key={demo.id} demo={demo}/>
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

export default connect(mapStateToProps)(Profile);