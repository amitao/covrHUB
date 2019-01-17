import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import './ModalAvatar.css';

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 70,
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
  box: {
    display: "flex",
    flexFlow: "row wrap",
  },
  boxOne: {
    flex: 1,
  },
  boxTwo: {
    flex: 2,
  },
  boxThree: {
    flex: 3,
  },
});

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


const getModal = () => {
  const top = 10;
  const left = 20;

  return {
    top: `${top}%`,
    left: `${left}%`,
    margin: 'auto'
  };
}

class ModalAvatar extends React.Component {
  state = {
    open: false,
    imageUrl: '',
    person_id: this.props.user.id
  }

  // opens modal
  handleOpen = () => {
    this.setState({
      ...this.state,
      open: true
    });
  };

  // exit out of the modal
  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  // click to save to DB
  handleClick = (event) => {
    event.preventDefault();

    console.log('save image button has been clicked');
    this.props.dispatch({ type: 'UPDATE_IMAGE', payload: this.state });
    this.setState({
      imageUrl: '',
      person_id: this.props.user.id
    })
  }

  render() {

    const { classes } = this.props;

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            onClick={this.handleOpen}
          >Add Avatar</Button>
        </MuiThemeProvider>

        <Modal open={this.state.open}>
          <div style={getModal()} className={classes.paper}>
            <center>
              <h2 className="avatar-h2">Please select an avatar</h2>

              <FormGroup className={classes.box}>
                <div className={classes.boxOne}>
                  <img src="images/avatar3.svg" className="avatar three" alt="cute" />
                  <FormControlLabel
                    label="avatar3"
                    value={this.state.imageUrl}
                    onChange={this.handleChange}
                    name="imageUrl"
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        value="images/avatar3.svg"
                      />
                    } />
                </div>
                
                <div className={classes.boxTwo}>
                <img src="images/avatar1.svg" className="avatar one" alt="avatar1" />
                <FormControlLabel
                  label="avatar1"
                  value={this.state.imageUrl}
                  onChange={this.handleChange}
                  name="imageUrl"
                  control={
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                      value="images/avatar1.svg"
                    />
                  } />
                </div>

                  <div className={classes.boxThree}>
                  <img src="images/avatar2.svg" className="avatar two" alt="avatar2" />
                <FormControlLabel
                  label="avatar2"
                  value={this.state.imageUrl}
                  onChange={this.handleChange}
                  name="imageUrl"
                  control={
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                      value="images/avatar2.svg"
                    />
                  } />
                  </div>

              </FormGroup>
            </center>
            <div>
              <center>
                <Button variant="contained" color="primary" className={classes.exit} onClick={this.handleClose}>Exit</Button>
                <Button variant="contained" color="primary" className={classes.save} onClick={this.handleClick}>Save</Button>
              </center>
            </div>
          </div>

        </Modal>
      </div>
    );
  }
}

ModalAvatar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(ModalAvatar));