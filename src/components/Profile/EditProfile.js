import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme, TextField, Grid } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
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


const circleItem = {
  borderRadius: "65px",
  margin: "2em",
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

class EditProfile extends React.Component {
  state = {
    open: false,
    demoId: this.props.demo.id,
    fname: this.props.demo.first_name,
    lname: this.props.demo.last_name,
    birthday: moment(this.props.demo.birthday).format('l'),
    address: this.props.demo.address,
    email: this.props.demo.email
  }


  // opens modal
  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  // exit out of the modal
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



  // click to save to DB
  handleClick = (event) => {
    event.preventDefault();
    console.log('save image button has been clicked');

    console.log(this.state)
    
    this.props.dispatch({ type: 'UPDATE_DEMO', payload: this.state });
    this.setState({
      demoId: this.props.demo.id,
      fname: '',
      lname: '',
      birthday: '',
      address: '',
      email: ''
    })
  }

  render() {

    const { classes } = this.props;

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Button
            className={classes.button}
            style={circleItem}
            variant="outlined"
            color="primary"
            onClick={this.handleOpen}
          >Edit Profile</Button>
        </MuiThemeProvider>

        <Modal open={this.state.open}>
          <div style={getModal()}className={classes.paper}>
            <div className={classes.root}>
              <Grid container spacing={24} className={classes.grid}
                direction="row" justify="center">

                {/* User Demographic Form */}
                <Grid item sm={10}> 

                  <h2 className="profile-h2">User Profile</h2>

                  <center><div className={classes.bgColor}></div></center>

                  <form >
                    <TextField
                      type="text"
                      className={classes.textField}
                      label="Fist Name"
                      onChange={this.handleChange('fname')}
                      value={this.state.fname}
                    />

                    <TextField
                      type="text"
                      className={classes.textField}
                      label="Last Name"
                      onChange={this.handleChange('lname')}
                      value={this.state.lname}
                    />

                    <TextField
                      type="text"
                      className={classes.textField}
                      onChange={this.handleChange('birthday')}
                      value={this.state.birthday}
                    />

                    <TextField
                      type="text"
                      className={classes.textField}
                      label="Address"
                      fullWidth
                      margin="normal"
                      onChange={this.handleChange('address')}
                      value={this.state.address}
                    />

                    <TextField
                      type="text"
                      className={classes.textField}
                      label="Email"
                      onChange={this.handleChange('email')}
                      value={this.state.email}
                    />

                  </form>

                </Grid>
              </Grid>
            </div>
            <center>
              <Button variant="contained" color="primary" className={classes.exit} onClick={this.handleClose}>Exit</Button>
              <Button variant="contained" color="primary" className={classes.save} onClick={this.handleClick}>Save</Button>
            </center>
          </div>


        </Modal>

      </div>
    );
  }
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
}



export default connect(mapStateToProps)(withStyles(styles)(EditProfile));