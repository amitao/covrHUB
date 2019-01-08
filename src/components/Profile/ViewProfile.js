import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import styles from '../Assets/styles/stylesTwo';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import DisplayProfile from './DisplayProfile';
import './Profile.css';



class ViewProfile extends React.Component {


  render () {
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
            user profile
            <DisplayProfile />
          </div>
          
          <div className="view-child-three">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
            culpa qui officia deserunt mollit anim id est laborum.
            </p>
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


export default connect()(withStyles(styles)(ViewProfile));