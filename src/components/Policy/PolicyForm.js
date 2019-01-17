import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Swal from 'sweetalert2';

// Material-UI

// Styles
import './Policy.css';
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


class PolicyForm extends React.Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_INSURANCE' })
  }

  state = {
    policyHolder: 'Self',
    employment: '',
    memberNumber: '',
    groupNumber: '',
    effectiveDate: '',
    termDate: '',
    cobType: '',
    dedIn: '',
    dedOut: '',
    coInsuranceIn: '',
    coInsuranceOut: '',
    copayIn: '',
    copaySpecial: '',
    oopIn: '',
    oopOut: '',
    person_id: this.props.user.id,
    insurance_id: '',
  }



  handleChange = (propertyName) => (event) => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value
    })
  }

  handleClickDashboard = () => {
    console.log('hello!, dashboard');
    this.props.history.push("/dashboard");
  }


  handleSubmit = event => {
    console.log('input sibmitted to policy table DB');
    event.preventDefault();
    this.props.dispatch({ type: 'ADD_POLICY', payload: this.state });
    this.setState({
      policyHolder: 'Self',
      employment: '',
      memberNumber: '',
      groupNumber: '',
      effectiveDate: '',
      termDate: '',
      cobType: '',
      dedIn: '',
      dedOut: '',
      coInsuranceIn: '',
      coInsuranceOut: '',
      copayIn: '',
      copaySpecial: '',
      oopIn: '',
      oopOut: '',
      person_id: this.props.user.id,
      insurance_id: ''
    })

    Swal.fire('Policy saved!');
  }

  render() {

    const { classes } = this.props;

    let list = this.props.insurance.map((ins, i) => <MenuItem key={i} value={ins.id}>{ins.name}</MenuItem>)

    return (
      <div className={classes.root}>
        <Grid container spacing={24} className={classes.grid} direction="row" justify="center">
          <Grid item sm={8}>
            <Paper className={classes.paper}>

              <form>
                <Grid item>
                  <h2>Policy</h2>
                  <center><div className={classes.bgColor}></div></center>

                  <FormControl >
                    Please select an insurance:
                  <Select
                      value={this.state.insurance_id}
                      onChange={this.handleChange('insurance_id')}
                      displayEmpty
                      // input={<Input name="insurance_id" id="insurance-label-placeholder" />}
                      name="insurance_id"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {list}
                    </Select>
                  </FormControl>

                  <TextField
                    type="text"
                    className={classes.textField}
                    label="Policy Holder"
                    value={this.state.policyHolder}
                    onChange={this.handleChange('policyHolder')}
                  // name="Employment"
                  />

                  <TextField
                    type="text"
                    className={classes.textField}
                    label="Employment"
                    value={this.state.employment}
                    onChange={this.handleChange('employment')}
                  // name="Employment"
                  />

                  <TextField
                    type="text"
                    // name="Member Number"
                    className={classes.textField}
                    label="Member ID#"
                    value={this.state.memberNumber}
                    onChange={this.handleChange('memberNumber')}
                  />

                  <TextField
                    type="text"
                    // name="Group Number"
                    label="Group Number"
                    className={classes.textField}
                    value={this.state.groupNumber}
                    onChange={this.handleChange('groupNumber')}
                  />

                  <TextField
                    type="text"
                    // name="coordination of benefits"
                    label="Coordination of Benefits"
                    className={classes.textField}
                    value={this.state.cobType}
                    onChange={this.handleChange('cobType')}
                  />

                  <TextField
                    margin="normal"
                    type="date"
                    // name="Effective date"
                    label="Effective date"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={this.state.effectiveDate}
                    onChange={this.handleChange('effectiveDate')}
                  />

                  <TextField
                    margin="normal"
                    type="date"
                    // name="Term date"
                    label="Term date"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={this.state.termDate}
                    onChange={this.handleChange('termDate')}
                  />
                </Grid>

                <Grid item>
                  <h2>Benefits</h2>
                  <center><div className={classes.bgColor}></div></center>

                  <TextField
                    type="number"
                    label="Co-Pay In-network"
                    className={classes.textField}
                    value={this.state.copayIn}
                    onChange={this.handleChange('copayIn')}
                  />

                  <TextField
                    type="number"
                    // name="Deductible In-network"
                    label="Deductible In-network"
                    className={classes.textField}
                    value={this.state.dedIn}
                    onChange={this.handleChange('dedIn')}
                  />

                  <TextField
                    type="number"
                    // name="Deductible Out-network"
                    label="Deductible Out-network"
                    className={classes.textField}
                    value={this.state.dedOut}
                    onChange={this.handleChange('dedOut')}
                  />


                  <TextField
                    type="number"
                    label="Co-Pay Special"
                    className={classes.textField}
                    value={this.state.copaySpecial}
                    onChange={this.handleChange('copaySpecial')}
                  />

                  <TextField
                    type="number"
                    label="Co-insurance In-network"
                    className={classes.textField}
                    value={this.state.coInsuranceIn}
                    onChange={this.handleChange('coInsuranceIn')}
                  />

                  <TextField
                    type="number"
                    label="Co-insurance Out-network"
                    className={classes.textField}
                    value={this.state.coInsuranceOut}
                    onChange={this.handleChange('coInsuranceOut')}
                  />

                  <TextField
                    type="number"
                    label="Out of pocket In-network"
                    className={classes.textField}
                    value={this.state.oopIn}
                    onChange={this.handleChange('oopIn')}
                  />

                  <TextField
                    type="number"
                    label="Out-of-pocket Out-of-network"
                    className={classes.textField}
                    value={this.state.oopOut}
                    onChange={this.handleChange('oopOut')}
                  />
                </Grid>
              </form>

              <MuiThemeProvider theme={theme}>
                <Button
                  onClick={this.handleSubmit}
                  className={classes.nextBtn}
                  variant="contained"
                  color="primary">
                  Save
              </Button>

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

PolicyForm.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
  user: state.user,
  insurance: state.insurance,
  policy: state.insurance
});


export default connect(mapStateToProps)(withStyles(styles)(PolicyForm));