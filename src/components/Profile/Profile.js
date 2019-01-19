import React from 'react';
import { connect } from 'react-redux';

import './Profile.css';
import EditProfile from './EditProfile';



class Profile extends React.Component {


  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_DEMO', payload: this.props.reduxState.demographic.id})
  }
  
  render() {
    return (
      <div>
          {this.props.reduxState.demographic.map((demo) => {
            return (
              <EditProfile key={demo.id} values={demo.id}demo={demo}/>
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