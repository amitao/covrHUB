import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, TextField, Tooltip, IconButton, InputAdornment } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import moment from 'moment';


const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 60,
    height: 440,
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

class UpdatePaidBenefits extends React.Component {

  state = {
    open: false,
    benefitId: this.props.item.benefitId,
    dedInPaid: 0,
    dedOutPaid: 0,
    oopInPaid: 0,
    oopOutPaid: 0,
    date: moment(this.props.item.date).format('l'),
    policy_id: this.props.item.policy_id
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


  handleSubmit = event => {
    console.log('input sibmitted to PAID BENEFIT table DB');

    event.preventDefault();
    this.props.dispatch({ type: 'UPDATE_PAID_BENEFIT', payload: this.state });
    this.setState({
      benefitId: this.props.item.benefitId,
      dedInPaid: '',
      dedOutPaid: '',
      oopInPaid: '',
      oopOutPaid: '',
      date: '',
      policy_id: this.props.item.policy_id
    })
  }

  render() {

    const { classes } = this.props;

    return (
      <>

        <Tooltip title="Update">
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
              <h2 className="update-h2">Update Benefit Payment</h2>
              {/* <div>
              Policy: {this.props.item.name}
            </div> */}

              <form className="updateElement">
                <div className="payment-box1">
                  <p className="p-title">Policy: {this.props.item.name}</p>
                  <TextField
                    type="number"
                    className={classes.textField}
                    label="Deductible in-network"
                    value={this.state.dedInPaid}
                    onChange={this.handleChange('dedInPaid')}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />

                  <TextField
                    type="number"
                    className={classes.textField}
                    label="Out-of-pocket in-network"
                    value={this.state.oopInPaid}
                    onChange={this.handleChange('oopInPaid')}
                    margin="normal"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </div>
                <div className="payment-box2">
                  <TextField
                    type="date"
                    label="Date"
                    margin="normal"
                    className={classes.textField}
                    value={this.state.date}
                    onChange={this.handleChange('date')}
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    type="number"
                    margin="normal"
                    className={classes.textField}
                    label="Deductible out-of-network"
                    value={this.state.dedOutPaid}
                    onChange={this.handleChange('dedOutPaid')}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                  <TextField
                    type="number"
                    margin="normal"
                    className={classes.textField}
                    label="Out-of-pocket out-of-network"
                    value={this.state.oopOutPaid}
                    onChange={this.handleChange('oopOutPaid')}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </div>

              </form> {/* End of Form */}

              <Button variant="contained" color="primary" className={classes.exit} onClick={this.handleClose}>Exit</Button>
              <Button variant="contained" color="primary" className={classes.save} onClick={this.handleSubmit}>Save</Button>
            </center>

          </div>


        </Modal>
      </>

    )
  }
}

UpdatePaidBenefits.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
}


export default connect(mapStateToProps)(withStyles(styles)(UpdatePaidBenefits));