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
    height: 360,
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
  const top = 10;
  const left = 20;

  return {
    top: `${top}%`,
    left: `${left}%`,
    margin: 'auto'
  };
}

class EditPolicy extends React.Component {

  state = {
    open: false,
    policyId: this.props.item.id,
    memberNumber: this.props.item.member_number,
    groupNumber: this.props.item.group_number,
    effectiveDate: moment(this.props.item.effective_date).format('l'),
    termDate: moment(this.props.item.term_date).format('l'),
    cobType: this.props.item.cob_type,
    dedIn: this.props.item.deductible_in,
    dedOut: this.props.item.deductible_out,
    coInsuranceIn: this.props.item.coinsurance_in,
    coInsuranceOut: this.props.item.coinsurance_out,
    copayIn: this.props.item.copay_in,
    copaySpecial: this.props.item.copay_special,
    oopIn: this.props.item.out_of_pocket_in,
    oopOut: this.props.item.out_of_pocket_out
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


  handleClick = (event) => {
    event.preventDefault();

    console.log(this.state)

    this.props.dispatch({ type: 'UPDATE_POLICY', payload: this.state });
    this.setState({
      policyId: this.props.item.id,
      memberNumber: '',
      groupNumber: '',
      cobType: '',
      effectiveDate: '',
      termDate: '',
      dedIn: '',
      dedOut: '',
      copayIn: '',
      copaySpecial: '',
      coInsuranceIn: '',
      coInsuranceOut: '',
      oopIn: '',
      oopOut: ''
    })
  }


  render() {

    const { classes } = this.props;
    return (
      <>

        <Tooltip title="Edit">
          <IconButton>
            <i className="fas fa-edit"
              label="Edit"
              style={cursorStyle}
              onClick={this.handleOpen}></i>
          </IconButton>
        </Tooltip>

        <Modal open={this.state.open} >
          <div style={getModal()} className={classes.paper}>
            <h2 className="profile-h2">Edit Policy</h2>

            <center><div className={classes.bgColor}></div></center>

            <form >
              <TextField
                label="Health Insurance"
                placeholder={this.props.item.name}
              />
              <TextField

                placeholder={this.props.item.employment}
              />
              <TextField

                placeholder={this.props.item.policy_holder}
              />

              <TextField
                type="text"
                className={classes.textField}
                label="memberNumber"
                onChange={this.handleChange('memberNumber')}
                value={this.state.memberNumber}
              />

              <TextField
                type="text"
                className={classes.textField}
                label="groupNumber"
                onChange={this.handleChange('groupNumber')}
                value={this.state.groupNumber}
              />

              <TextField
                type="text"
                className={classes.textField}
                label="COB type"
                onChange={this.handleChange('cobType')}
                value={this.state.cobType}
              />


              <TextField
                type="text"
                className={classes.textField}
                onChange={this.handleChange('effectiveDate')}
                value={this.state.effectiveDate}
              />

              <TextField
                type="text"
                className={classes.textField}
                onChange={this.handleChange('termDate')}
                value={this.state.termDate}
              />

              <TextField
                type="text"
                className={classes.textField}
                label="DedIn"
                onChange={this.handleChange('dedIn')}
                value={this.state.dedIn}
              />
              <TextField
                type="text"
                className={classes.textField}
                label="DedOut"
                onChange={this.handleChange('dedOut')}
                value={this.state.dedOut}
              />
              <TextField
                type="number"
                label="Co-Pay In-network"
                className={classes.textField}
                value={this.state.copayIn}
                onChange={this.handleChange('copayIn')}
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
            </form>

            <center>
              <Button variant="contained" color="primary" className={classes.exit} onClick={this.handleClose}>Exit</Button>
              <Button variant="contained" color="primary" className={classes.save} onClick={this.handleClick}>Save</Button>
            </center>
          </div>


        </Modal>
      </>

    )
  }
}

EditPolicy.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
}


export default connect(mapStateToProps)(withStyles(styles)(EditPolicy));