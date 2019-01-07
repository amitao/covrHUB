import React from 'react';
import { connect } from 'react-redux';
import { withStyles, Button, MuiThemeProvider, createMuiTheme, Grid, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from '../Assets/styles/stylesTwo';


const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#e1e3f7",
      main: "#7060ed",
      dark: "#7378a5",
      contrastText: "#fff",
    }
  },
  typography: {
    useNextVariants: true,
  },
});

const btnStyles = {
  margin: "1em",
}



class UserPage extends React.Component {

  handleClickAddProfile = () => {
    console.log('view profile has been clicked');
    this.props.history.push("/add_profile");
  }

  handleClickDashboard = () => {
    this.props.history.push("/dashboard");
  }


  render() {

    const { classes } = this.props;

    return (
      <div className={classes.root}>

        <Grid container spacing={24} className={classes.grid} direction="row" justify="center">
          <Grid item sm={5}>
            <center>
              <Paper className={classes.paper}>
            <h1>
              Welcome, {this.props.user.username}!
            </h1>

            <p>Your ID is: {this.props.user.id}</p>

            {/* LINK BUTTONS */}
            <div>
              <MuiThemeProvider theme={theme}>
                <Button
                  style={btnStyles}
                  variant="outlined"
                  color="primary"
                  onClick={this.handleClickAddProfile}>
                  Add Profile
                </Button>
                <Button
                  variant="contained"
                  onClick={this.handleClickDashboard}
                  color="primary" >
                  Dashboard
                </Button>
              </MuiThemeProvider>
            </div>
            </Paper>
            </center>
          </Grid>
        </Grid>
      </div>
    )
  }
}


UserPage.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
  user: state.user,
});


// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(withStyles(styles)(UserPage));