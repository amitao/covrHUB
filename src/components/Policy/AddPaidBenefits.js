import React from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid, Paper, MuiThemeProvider, createMuiTheme, TextField } from '@material-ui/core';
import styles from '../Assets/styles/stylesTwo';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import Input from '@material-ui/core/Input';
import Swal from 'sweetalert2';
import moment from 'moment';



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



class AddPaidBenefits extends React.Component {

  state = {
    isSelected: false,
    benefitId: this.props.element.benefitId,
    dedInPaid: this.props.element.ded_in_paid,
    dedOutPaid: this.props.element.ded_out_paid,
    oopInPaid: this.props.element.oop_in_paid,
    oopOutPaid: this.props.element.oop_out_paid,
    date: moment(this.props.element.date).format('l'),
    // personId: this.props.reduxState.user.id,
    policy_id: this.props.element.policy_id
  }


  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_SINGLE_POLICY' });
  }


  handleChange = (propertyName) => (event) => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value
    })
  }



  handleSubmit = event => {
    console.log('input sibmitted to PAID BENEFIT table DB');

    event.preventDefault();
    this.props.dispatch({ type: 'UPDATE_PAID_BENEFIT', payload: this.state });
    this.setState({
      benefitId: this.props.element.benefitId,
      dedInPaid: '',
      dedOutPaid: '',
      oopInPaid: '',
      oopOutPaid: '',
      date: '',
      // personId: this.props.reduxState.user.id,
      policy_id: this.props.element.policy_id
    })
    Swal.fire('Payment saved!');
  }



  render() {

    const { classes } = this.props;

    let list = this.props.reduxState.singlePolicy.map((item, i) => {
      return (
        <MenuItem key={i} value={item.id}>
          {item.employment}
          {item.member_number}
        </MenuItem>
      )
    })

    return (

      <div className={classes.root}>
        <Grid container spacing={24} className={classes.grid} direction="row" justify="center">
          <Grid item sm={6}>
            <Paper className={classes.paper}>
              <h2>Update Paid Benefits</h2>
             
              <center><div className={classes.bgColor}></div></center>
              <form className="policyParent">
                {/* Drop selection gives user option to select which policy to enter in benefits */}

                <div className="policyItems2">
                  <FormControl >
                    Select your policy:
                  <Select
                      value={this.state.policy_id}
                      displayEmpty
                      name="policy_id"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {list}
                    </Select>
                  </FormControl>
                  </div>
                  <div className="policyItems4">
                  <TextField
                    type="number"
                    className={classes.textField}
                    label="Deductible in-network"
                    value={this.state.dedInPaid}
                    onChange={this.handleChange('dedInPaid')}
                  />

                  <TextField
                    type="number"
                    className={classes.textField}
                    label="Deductible out-of-network"
                    value={this.state.dedOutPaid}
                    onChange={this.handleChange('dedOutPaid')}
                  />

                  <TextField
                    type="number"
                    className={classes.textField}
                    label="Out-of-pocket in-network"
                    value={this.state.oopInPaid}
                    onChange={this.handleChange('oopInPaid')}
                  />

                  <TextField
                    type="number"
                    className={classes.textField}
                    label="Out-of-pocket out-of-network"
                    value={this.state.oopOutPaid}
                    onChange={this.handleChange('oopOutPaid')}
                  />

                  <TextField
                    type="date"
                    // label="date"
                    className={classes.textField}
                    value={this.state.date}
                    onChange={this.handleChange('date')}
                  />

                </div>
                {/* Button */}
            
              <div className="parentElement">
                <MuiThemeProvider theme={theme}>
                  <Button
                    onClick={this.handleSubmit}
                    variant="contained"
                    className={classes.nextBtn}
                    color="primary">Save</Button>
                </MuiThemeProvider>
                </div>

              </form> {/* End of Form */}
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}


AddPaidBenefits.propTypes = {
  classes: PropTypes.object.isRequired,
};



const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
}

export default connect(mapStateToProps)(withStyles(styles)(AddPaidBenefits));