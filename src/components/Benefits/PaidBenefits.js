import React from 'react';
import { connect } from 'react-redux';
import styles from '../Assets/styles/stylesTwo';

// Material-UI
import { withStyles, Grid, Paper, Button, MuiThemeProvider, createMuiTheme, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';


// Styles
import './Benefits.css';


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



class PaidBenefits extends React.Component {

  state = {
    dedInPaid: '',
    dedOutPaid: '',
    oopInPaid:'',
    oopOutPaid: '',
    date: '',
    personID: ''
  }


  // send data to saga via dispatch
  handleClickSave = () => {
    console.log('save to add benefits to DB');
    this.props.dispatch({type: 'ADD_PAID_BENEFIT', payload: this.state})
    this.setState({
      dedInPaid: '',
      dedOutPaid: '',
      oopInPaid:'',
      oopOutPaid: '',
      date: '',
      personID: this.props.reduxState.user.id
    })
  }

  handleClickDashboard = () => {
    console.log('hello!, dashboard');
    this.props.history.push("/dashboard");
  }

  handleChange = (propertyName) => (event) => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value
    })
  }

  render () {

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24} className={classes.grid} direction="row" justify="center">
          <Grid item sm={8}>
            <Paper className={classes.paper}>
              <h2>Add Paid Benefits</h2>
              <center><div className={classes.bgColor}></div></center>
            <form>
            <TextField 
              type="number"
              className={classes.textField}
              label="Deductible in-network"
              onChange={this.handleChange('dedInPaid')}
              value={this.state.dedInPaid}
            />
             <TextField 
              type="number"
              className={classes.textField}
              label="Deductible out-of-network"
              onChange={this.handleChange('dedOutPaid')}
              value={this.state.dedOutPaid}
            />
            <TextField 
              type="number"
              className={classes.textField}
              label="Out-of-pocket in-network"
              onChange={this.handleChange('oopInPaid')}
              value={this.state.oopInPaid}
            />
            <TextField 
              type="number"
              className={classes.textField}
              label="Out-of-pocket out-of-network"
              onChange={this.handleChange('oopOutPaid')}
              value={this.state.oopOutPaid}
            />
            <TextField 
              type="date"
              className={classes.textField}
              onChange={this.handleChange('date')}
              value={this.state.datet}
            />
            </form>

              {/* BUTTONS */}
              <MuiThemeProvider theme={theme}>
              <Button 
                onClick={this.handleClickSave}
                className={classes.nextBtn}
                variant="contained"
                color="primary"
                >Save</Button>

                <Button 
                onClick={this.handleClickDashboard}
                className={classes.nextBtn}
                variant="contained"
                color="primary"
                >Dashboard</Button>
              </MuiThemeProvider>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}


PaidBenefits.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
}


export default connect(mapStateToProps)(withStyles(styles)(PaidBenefits));