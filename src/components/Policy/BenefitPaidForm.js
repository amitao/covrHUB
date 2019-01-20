import React from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid, Paper, MuiThemeProvider, createMuiTheme, TextField,  Tooltip, IconButton } from '@material-ui/core';
// import styles from '../Assets/styles/stylesTwo';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Swal from 'sweetalert2';


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

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 80,
    height: 350,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 4,
    borderRadius: "5px",
  },
  exit: {
    marginRight: "1em",
    marginTop: "1em",
  },
  save: {
    marginTop: "1em",
  },
  button: {
    margin: "1.4em 0",
    // margin: theme.spacing.unit
  },
});

const cursorStyle = {
  cursor: "pointer",
  color: "#89a3e5",
}

const getModal = () => {
  const top = 5;
  const left = 20;

  return {
    top: `${top}%`,
    left: `${left}%`,
    margin: 'auto'
  };
}





class BenefitPaidForm extends React.Component {

  state = {
    open:false,
    dedInPaid: '',
    dedOutPaid: '',
    oopInPaid: '',
    oopOutPaid: '',
    date: '',
    person_id: this.props.reduxState.user.id,
    policy_id:''
  }


  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_SINGLE_POLICY' });
  }

   // opens modal
   handleOpen = () => {
    this.setState({
      open: true
    });
  };

  // // exit out of the modal
  handleClose = () => {
    this.setState({
      open: false
    });
  };

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
    console.log('input sibmitted to PAID BENEFIT table DB');

    event.preventDefault();
    this.props.dispatch({ type: 'ADD_PAID_BENEFIT', payload: this.state });
    this.setState({
      dedInPaid: '',
      dedOutPaid: '',
      oopInPaid: '',
      oopOutPaid: '',
      date: '',
      person_id: this.props.reduxState.user.id,
      policy_id: ''
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
<>
      <Tooltip title="Add">
      <IconButton>
        <i className="fas fa-plus-circle"
          label="Add"
          style={cursorStyle}
          onClick={this.handleOpen}></i>
      </IconButton>
    </Tooltip>
      <Modal open={this.state.open} >
      <div style={getModal()} className={classes.paper} >

        <center>
              <h2>Paid Benefits Form</h2>
             
              <form className="policyParent">
         
              <div className="policyItems2">
                  <FormControl >
                    Select your policy:
                  <Select
                      value={this.state.policy_id}
                      onChange={this.handleChange('policy_id')}
                      displayEmpty
                      input={<Input name="policy_id" id="policy-label-placeholder" />}
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

<Button variant="contained" color="primary" className={classes.exit} onClick={this.handleClose}>Exit</Button>
                  </MuiThemeProvider>
                </div>

              </form> {/* End of Form */}
              </center>
              </div>
      </Modal>
      </>
    )
  }
}



BenefitPaidForm.propTypes = {
  classes: PropTypes.object.isRequired,
};



const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
}

export default connect(mapStateToProps)(withStyles(styles)(BenefitPaidForm));