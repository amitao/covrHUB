import React from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid, Paper, MuiThemeProvider, createMuiTheme, TextField } from '@material-ui/core';
import styles from '../Assets/styles/stylesTwo';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
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

// const styleGrid = {
//   gridTemplateColumns: "auto auto auto",
//   margin: "0.5em",

// }



class EditBenefits extends React.Component {

  state = {
  
    benefitPaidId: this.props.item.id,
    dedInPaid: this.props.item.ded_in_paid,
    dedOutPaid: this.props.item.ded_out_paid,
    oopInPaid: this.props.item.oop_in_paid,
    oopOutPaid: this.props.item.oop_out_paid,
    date: moment(this.props.item.date).format('l'),
    policy_id: this.props.item.policy_id
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
    console.log('input sibmitted to UPDATE PAID BENEFIT table DB');

    event.preventDefault();
    this.props.dispatch({ type: 'UPDATE_PAID_BENEFIT', payload: this.state });
    this.setState({
      benefitPaidId: this.props.item.id,
      dedInPaid: '',
      dedOutPaid: '',
      oopInPaid: '',
      oopOutPaid: '',
      date: '',
      policy_id: this.props.item.policy_id
    })
    Swal.fire('Payment saved!');
  }



  render() {

    const { classes } = this.props;


    return (

      <div>

            <Grid container spacing={24} className={classes.grid} direction="row" justify="center">
              <Grid item sm={8}>
                <Paper className={classes.paper}>
                  <h2>Add Paid Benefits</h2>
                  <center><div className={classes.bgColor}></div></center>

                  <form>


                    <TextField
                      type="number"
                      className={classes.textField}
                      value={this.state.policy_id}
                    />

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
                      type="text"
                      className={classes.textField}
                      value={this.state.date}
                      onChange={this.handleChange('date')}
                    />
                    {/* Button */}
                    <MuiThemeProvider theme={theme}>
                      <Button
                        onClick={this.handleSubmit}
                        variant="contained"
                        color="primary">Save</Button>

                      <Button
                        onClick={this.handleClickDashboard}
                        className={classes.nextBtn}
                        variant="contained"
                        color="primary"
                      >Dashboard</Button>

                    </MuiThemeProvider>
                  </form> {/* End of Form */}
                </Paper>
              </Grid >
            </Grid >
            </div>
          
          )
        }
      }
      
      
      
EditBenefits.propTypes = {
  classes: PropTypes.object.isRequired,
  };
        
        
        
const mapStateToProps = (reduxState) => {
  return {
            reduxState
          }
          }
          
export default connect(mapStateToProps)(withStyles(styles)(EditBenefits));