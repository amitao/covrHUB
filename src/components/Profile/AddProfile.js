import React from 'react';
import { connect } from 'react-redux';

// material UI styling
import { withStyles, Grid, Paper, Button, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
// component imports
import ModalAvatar from '../Modal/ModalAvatar';
// styles 
import styles from '../Assets/styles/stylesTwo';
import './Profile.css';




class AddProfile extends React.Component {

  state = {
    fname: '',
    lname: '',
    address: '',
    email: ''
  }


  // route back to userPage
  handleClickBack = () => {
    console.log('back button has been clicked');
    this.props.history.push("/home");
  }

  // send to saga via dispatch
  handleClickSave = () => {
    console.log('save button has been clicked:', this.props.reduxState.user.id);

    this.props.dispatch({ type: 'ADD_DEMO', payload: this.state })
    this.setState({
      fname: '',
      lname: '',
      address: '',
      email: '',
      personID: this.props.reduxState.user.id
    })
  }

  handleClickNext = () => {
    this.props.history.push("/add_insurance");
  }

  handleChange = (propertyName) => (event) => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value
    })
  }


  render() {

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24} className={classes.grid}
          direction="row" justify="center">

          {/* Avatar column */}
          <Grid item sm={3}>
            <Paper className={classes.paper}>
              <h2 className="profile-h2">Profile</h2>
              <div className="avatar-block">
                {/* avatar image goes here */}
              </div>
              <div>
                <ModalAvatar />
              </div>
            </Paper>
          </Grid>

          {/* User Demographic Form */}
          <Grid item sm={8}>
            <Paper className={classes.paper}>

              <h2 className="profile-h2">User Profile</h2>

              <center><div className={classes.bgColor}></div></center>

              <form>
                <TextField
                  type="text"
                  className={classes.textField}
                  label="Fist Name"
                  onChange={this.handleChange('fname')}
                  value={this.state.fname}
                />

                <TextField
                  type="text"
                  className={classes.textField}
                  label="Last Name"
                  onChange={this.handleChange('lname')}
                  value={this.state.lname}
                />

                <TextField
                  type="text"
                  className={classes.textField}
                  label="Address"
                  fullWidth
                  margin="normal"
                  onChange={this.handleChange('address')}
                  value={this.state.address}
                />

                <TextField
                  type="text"
                  className={classes.textField}
                  label="Email"
                  onChange={this.handleChange('email')}
                  value={this.state.email}
                />

                {/* Buttons */}
                <div className="btn-box">
                    <Button
                      className={classes.nextBtn}
                      variant="outlined"
                      color="primary"
                      onClick={this.handleClickBack}
                    >Back</Button>

                    <Button
                      className={classes.nextBtn}
                      variant="outlined"
                      color="primary"
                      onClick={this.handleClickSave}
                    >Save</Button>

                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.nextBtn}
                      onClick={this.handleClickNext}
                    >Add Insurance</Button>
                    
                </div>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }

}

AddProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
}

export default connect(mapStateToProps)(withStyles(styles)(AddProfile));