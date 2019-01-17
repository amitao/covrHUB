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
                <div>
                  <Button
                    className={classes.button}
                    variant="outlined"
                    color="primary"
                    type="submit"
                    name="submit"
                    value="Register"
                  > Register </Button>
                </div>
              </form>
              {/* end of form */}

              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
              >
                Login
          </Button>

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