import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, TextField, Tooltip, IconButton } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import moment from 'moment';


const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 80,
    height: 500,
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

const styleGrid={
  gridTemplateColumns: "auto auto auto",
  margin: "0.5em",

}
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
    // isSelected: false,
    benefitId: this.props.item.benefitId,
    dedInPaid: this.props.item.ded_in_paid,
    dedOutPaid: this.props.item.ded_out_paid,
    oopInPaid: this.props.item.oop_in_paid,
    oopOutPaid: this.props.item.oop_out_paid,
    date: moment(this.props.item.date).format('l'),
    // personId: this.props.reduxState.user.id,
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
      // personId: this.props.reduxState.user.id,
      policy_id: this.props.item.policy_id
    })
  }

  render() {

    const { classes } = this.props;
    return (
      <>

        <Tooltip title="update">
          <IconButton>
            <i className="fas fa-edit"
              label="Edit"
              style={cursorStyle}
              onClick={this.handleOpen}></i>
          </IconButton>
        </Tooltip>

        <Modal open={this.state.open} >
          <div style={getModal()} className={classes.paper} >
       
          <center>
            <h2 className="user-profile-h2">Update Benefit Payment</h2>
            <form>
                {/* Drop selection gives user option to select which policy to enter in benefits */}

                <div className="policyItems2">
                Policy: {this.props.item.name}
                  {/* <FormControl >
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
                  </FormControl> */}
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