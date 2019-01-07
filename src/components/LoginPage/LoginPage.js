import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material-UI Styles
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

// Regular style file
import styles from '../Assets/styles/styles';



class LoginPage extends Component {

  state = {
    username: '',
    password: '',
  };

// dispatch login information
  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }


  render() {

    const { classes } = this.props;

    return (
      <div>
        <Grid container justify="center" className={classes.grid}>
          <Grid item xs={12} sm={12} md={4}>

            {this.props.errors.loginMessage && (
              <h2
                className="alert"
                role="alert"
              >
                {this.props.errors.loginMessage}
              </h2>
            )}

            {/* Form header "Login" */}
            <Card className={classes.cardHeader}>
              <div>
                <h1>Login</h1>
              </div>
            </Card>
            

            {/* beginning of form */}
            <Card className={classes.cardSize}>
              <CardContent>
                <form onSubmit={this.login} className={classes.form}>
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
                    <input
                      className={classes.buttonStyle}
                      type="submit"
                      name="submit"
                      value="Log In"
                    />
                  </div>
                </form>

                {/* end of form */}

                <Button
                  variant="outlined"
                  color="primary"
                  type="button"
                  className={classes.buttonStyle}
                  onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}
                >
                  Register
              </Button>
              </CardContent>
            </Card>
            {/* end of cardSize */}
          </Grid>
        </Grid>

      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(withStyles(styles)(LoginPage));