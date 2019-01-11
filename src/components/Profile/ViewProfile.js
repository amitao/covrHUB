import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import styles from '../Assets/styles/stylesTwo';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import DisplayProfile from './DisplayProfile';
import Radio from '@material-ui/core/Radio';
import './Profile.css';


class ViewProfile extends React.Component {

  // constructor (props, context) {
  //   super(props, context);
  //   this.state = {
  //       isEditing: false,
  //       profile: {
  //         name: this.props.reduxState.demographic.first_name,
  //         lastName: this.props.reduxState.demographic.last_name,
  //         email: this.props.reduxState.demographic.email,
  //         address: this.props.reduxState.demographic.address,
  //         personID: this.props.reduxState.user.id
  //       },
  //   };

  //   this.toggleEdit = this.toggleEdit.bind(this);
  // }

  // toggleEdit() {
  //   this.setState({isEditing: !this.state.isEditing})
  // }

  render () {

    // if (this.state.isEditing) {
    //   return(
    //     <DisplayProfile profile={this.state.profile} />
    //   )
    // }

    const { classes }= this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24} className={classes.grid} justify="center" direction="row">
        <Paper className={classes.paperView}>
         <div className="view-box">
          <div className="view-child-one">
            <img src="images/avatar1.svg" alt="me" className="ava" />
            <Button
              variant="contained"
              color="primary">Edit Profile</Button>
          </div>
         
          <div className="view-child-two">
            <h2>Profile</h2>
              <DisplayProfile />
          </div>
          
          <div className="view-child-three">
    
            <h2>Insurance</h2>
            {this.props.reduxState.insurance.map( item => {
              return (
                <div key={item.id}>
                  Name: {item.name}
                </div>
              )
            })}

            <Button
              variant="contained"
              color="primary">
              Delete</Button>
          
          </div>
            
          </div>
          </Paper>
        </Grid>
      </div>
    )
  }
}


ViewProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
}

export default connect(mapStateToProps)(withStyles(styles)(ViewProfile));