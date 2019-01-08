import React from 'react';
import { connect } from 'react-redux';

// material UI styling
import { withStyles, Grid, Paper, Button, TextField, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
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


class AddInsurance extends React.Component {

  state = {
    name: '',
    address: '',
    effective: '',
    term: '',
    memberId: '',
    group: ''
  }

  // back button to add_profile for user
  handleClickBack = () => {
    console.log('back button has been clicked');
    this.props.history.push("/add_profile");
  }

  // send data to saga via dispatch
  handleClickSave = () => {
    console.log("save was clicked");
    this.props.dispatch({ type: 'ADD_INSURANCE', payload: this.state })
    this.setState({
      name: '',
      address: '',
      effective: '',
      term: '',
      memberId: '',
      group: ''
    })
  }

  handleClickNext = () => {
    this.props.history.push("/add_benefits");
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
        <Grid container spacing={24} className={classes.grid} direction="row" justify="center">
          <Grid item sm={8}>
            <Paper className={classes.paper}>
              <h2>Health Insurance</h2>

              <center><div className={classes.bgColor}></div></center>

               {/* FORM Begins */}
              <form>
                <TextField
                  type="text"
                  className={classes.textField}
                  label="Insurance Name"
                  onChange={this.handleChange('name')}
                  value={this.state.name}
                />

                <TextField
                  type="text"
                  className={classes.textField}
                  label="Member ID#"
                  onChange={this.handleChange('memberId')}
                  value={this.state.memberId}
                />

                <TextField
                  type="text"
                  className={classes.textField}
                  label="Group#"
                  onChange={this.handleChange('group')}
                  value={this.state.group}
                />

                <TextField
                  type="text"
                  className={classes.textField}
                  label="Address"
                  onChange={this.handleChange('address')}
                  value={this.state.address}
                />

                <TextField
                  margin="normal"
                  type="date"
                  className={classes.textField}
                  label="Effective Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange('effective')}
                  value={this.state.effective}
                />

                <TextField
                  margin="normal"
                  type="date"
                  className={classes.textField}
                  label="Termed Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange('term')}
                  value={this.state.term}
                />
              </form>
              {/* End of FORM */}

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
                  onClick={this.handleClickNext}
                  className={classes.nextBtn}
                  variant="contained"
                  color="primary"
                >NEXT</Button>
              </MuiThemeProvider>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}


AddInsurance.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default connect()(withStyles(styles)(AddInsurance));