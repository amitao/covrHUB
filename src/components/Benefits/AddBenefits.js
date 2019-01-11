import React from 'react';
import { connect } from 'react-redux';

// Material-UI
import { withStyles, Grid, Paper, Button, MuiThemeProvider, createMuiTheme, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';


// Styles
import './Benefits.css';
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


class AddBenefits extends React.Component {

  state = {
    dedIn: '',
    dedOut: '',
    coinsuranceIn: '',
    coinsuranceOut: '',
    copayPCP: '',
    copaySpecial: '',
    oopIn: '',
    oopOut: '',
    insuranceID: '',
    personID: ''
  }

  // back button to add_insurance for user
  handleClickBack = () => {
    console.log('back button has been clicked');
    this.props.history.push("/add_insurance");
  }

  // send data to saga via dispatch
  handleClickSave = () => {
    console.log('save to DB');
    this.props.dispatch({type: 'ADD_BENEFIT', payload: this.state})
    this.setState({
      dedIn: '',
      dedOut: '',
      coinsuranceIn: '',
      coinsuranceOut: '',
      copayPCP: '',
      copaySpecial: '',
      oopIn: '',
      oopOut: '',
      insuranceID: this.props.reduxState.insurance.id,
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

    let list;
    if (this.props.reduxState.insurance === '') {
        list = '';
    } else if( this.props.reduxState.insurance){

      list = this.props.reduxState.insurance.map( insurance => {
        return (
          <div key={insurance.id} value={insurance.id}>
            {insurance.name}
          </div>
        )
      })
    }

    return (
      <div className={classes.root}>
        <Grid container spacing={24} className={classes.grid} direction="row" justify="center">
          <Grid item sm={8}>
            <Paper className={classes.paper}>
              <h2>Benefits</h2>
              <center><div className={classes.bgColor}></div></center>
            <form>
              {list}
            <TextField 
              type="number"
              className={classes.textField}
              label="Deductible in-network"
              onChange={this.handleChange('dedIn')}
              value={this.state.dedIn}
            />
             <TextField 
              type="number"
              className={classes.textField}
              label="Deductible out-of-network"
              onChange={this.handleChange('dedOut')}
              value={this.state.dedOut}
            />
             <TextField 
              type="number"
              className={classes.textField}
              label="Co-pay PCP"
              onChange={this.handleChange('copayPCP')}
              value={this.state.copayPCP}
            />
             <TextField 
              type="number"
              className={classes.textField}
              label="Co-pay Special"
              onChange={this.handleChange('copaySpecial')}
              value={this.state.copaySpecial}
            />
             <TextField 
              type="number"
              className={classes.textField}
              label="Co-insurnace in-network"
              onChange={this.handleChange('coinsuranceIn')}
              value={this.state.coinsuranceIn}
            />
             <TextField 
              type="number"
              className={classes.textField}
              label="Co-insurance out-of-network"
              onChange={this.handleChange('coinsuranceOut')}
              value={this.state.coinsuranceOut}
            />
            <TextField 
              type="number"
              className={classes.textField}
              label="Out-of-pocket in-network"
              onChange={this.handleChange('oopIn')}
              value={this.state.oopIn}
            />
            <TextField 
              type="number"
              className={classes.textField}
              label="Out-of-pocket out-of-network"
              onChange={this.handleChange('oopOut')}
              value={this.state.oopOut}
            />
           
            </form>

              {/* BUTTONS */}
              <MuiThemeProvider theme={theme}>
              <Button 
                onClick={this.handleClickBack}
                className={classes.nextBtn}
                variant="outlined"
                color="primary"
                >Back</Button>
 
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


AddBenefits.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
}


export default connect(mapStateToProps)(withStyles(styles)(AddBenefits));