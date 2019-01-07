import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import styles from '../Assets/styles/stylesTwo';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import DisplayProfile from './DisplayProfile';




class ViewProfile extends React.Component {


  render () {

    const { classes }= this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24} className={classes.grid} justify="center" direction="row">
        <Paper className={classes.paper}>

         <Grid item xs={6}>
            <DisplayProfile />
          </Grid>

          <Grid item xs={6}>
            
            view user profile
            
          </Grid>

          <Grid item xs={6}>
            View user profile
          </Grid>

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