import React from 'react';
import { connect } from 'react-redux';

// material UI styling
import { withStyles, Grid, Paper, Button, TextField, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import PropTypes from 'prop-types';
// component imports
import ModalAvatar from '../Modal/ModalAvatar';
// styles 
import styles from '../Assets/styles/stylesTwo';
import './Profile.css';
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


class AddProfile extends React.Component {

  state = {
    fname: '',
    lname: '',
    birthday: '',
    address: '',
    email: '',
    personID: ''
  }

  componentDidMount() {
    this.props.dispatch({type: 'FETCH_IMAGE'})
  }
  // route back to userPage
  handleClickBack = () => {
    console.log('back button has been clicked');
    this.props.history.push("/home");
  }


  // send to saga via dispatch
  handleClickSave = () => {
    this.props.dispatch({ type: 'ADD_DEMO', payload: this.state })
    this.setState({
      fname: '',
      lname: '',
      birthday: '',
      address: '',
      email: '',
      personID: this.props.user.id
    })

    Swal.fire('Profile saved!');
  }

  handleClickNext = () => {
    this.props.history.push("/add_policy");
  }

  handleChange = (propertyName) => (event) => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value
    })
  }


  render() {

    // let displayImage = this.props.imageAvatar.map( myImage => {
    //   return (
    //     <img src={myImage.image_url} alt="picture of me" key={myImage.id} className="form-image" />
    //   )
    // })

    const { classes } = this.props;
 
    return (
      <div className={classes.root}>
        <Grid container spacing={24} className={classes.grid}
          direction="row" justify="center">

          {/* Avatar column */}
          <Grid item sm={3}>
            <Paper className={classes.paper}>
              <h2 className="profile-h2">Profile</h2>
              <center>
                {this.props.image.map( myImage => {
                  return (
                    <img src={myImage.image_url} alt="picture of me" key={myImage.id} className="form-image" />
                  )
                })}
        
              </center>
              <div>
                <ModalAvatar />
              </div>
            </Paper>
          </Grid>

          {/* User Demographic Form */}
          <Grid item sm={8}>
            <Paper className={classes.paper}>

              <h2 className="profile-h2">User Profile</h2>

              <center><div className={classes.bgColor}></div></center>

              <form>
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
                  type="date"
                  label="Birthday"
                  InputLabelProps={{
                    shrink: true,
                  }}
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

                {/* Buttons */}

                <div className="btn-box">
                  <MuiThemeProvider theme={theme}>
                    <Button
                      className={classes.nextBtn}
                      variant="outlined"
                      color="primary"
                      onClick={this.handleClickBack}
                    >Back</Button>

                    <Button
                      className={classes.nextBtn}
                      variant="outlined"
                      color="primary"
                      onClick={this.handleClickSave}
                    >Save</Button>

                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.nextBtn}
                      onClick={this.handleClickNext}
                    >Add Policy</Button>
                  </MuiThemeProvider>
                </div>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

AddProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
  user: state.user,
  image: state.imageAvatar
});


export default connect(mapStateToProps)(withStyles(styles)(AddProfile));