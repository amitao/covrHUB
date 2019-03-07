import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material UI imports
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

// regular style file
import styles from '../Assets/styles/styles';

const regStyles = {
  btn: {
    width: "285px",
    borderRadius: "50px",
    marginTop: "1em",
  },
  iconColor: {
    color: "#7060ed"
  },
  space: {
    marginTop: "2em",
  },
  cardColor: {
    backgroundColor: "#cafaef",
  },
  signUp: {
    cursor: "pointer",
    color: "purple",
    paddingLeft: "1em",
  },
  logoImage: {
    width: "100px",
  }
}




class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };



  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
      this.props.history.push('/home')
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }


  render() {

    const { classes } = this.props;

    return (
      <Grid container justify="center" className={classes.grid}>
        <Grid item xs={12} sm={12} md={4}>

          {/* Alert message */}
          {this.props.errors.registrationMessage && (
            <h2
              className="alert"
              role="alert"
            >
              {this.props.errors.registrationMessage}
            </h2>
          )}

          {/* Form header "Register" */}
          <Card className={classes.cardHeader}>
            <div>
              <h1>Sign Up</h1>
            </div>
          </Card>

          {/* Form registration starts */}
          <Card className={classes.cardSize}>
            <CardContent>
              <form onSubmit={this.registerUser} className={classes.form}>
                <div>
                  <TextField
                    placeholder="Username"
                    type="text"
                    className={classes.textField}
                    label="Username"
                    value={this.state.username}
                    onChange={this.handleInputChangeFor('username')}
                  />
                </div>
                <div>
                  <TextField
                    placeholder="Password"
                    type="password"
                    className={classes.textField}
                    label="Password"
                    value={this.state.password}
                    onChange={this.handleInputChangeFor('password')}
                  />
                </div>

                <center style={regStyles.space}>
                  <Button
                    onClick={this.registerUser}
                    className={classes.button}
                    variant="outlined"
                    color="primary"
                    type="submit"
                    name="submit"
                    value="Register"
                    style={regStyles.btn}
                  > Register </Button>
                </center>
              </form>
              {/* end of form */}

              {/* <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
              >
                Login
          </Button> */}
              <center style={regStyles.space}>
                <p>Already have an account?
                  <span
                    style={regStyles.signUp}
                    onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
                  >Login</span></p>
              </center>

            </CardContent>
          </Card>
          {/* end of cardSize */}
        </Grid>
      </Grid>
    );
  }
}


RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
};
// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(RegisterPage));