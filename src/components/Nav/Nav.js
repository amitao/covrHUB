import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Components import
// import LogOutButton from '../LogOutButton/LogOutButton';

// Material UI imports
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';

// regular styling imports
import './Nav.css';
import stylesTwo from '../Assets/styles/stylesTwo';
import MenuItem from '../Menu/MenuProfile';


const shadow = {
  boxShadow: "-1px 2px 3px -2px rgba(115,120,165,1)",
  padding: "1em",
  position: "fixed",
  top: "0",
}

const navRight = {
  margin: "0",
  top: "2em",
  right: "1.5em",
  bottom: "0",
  left: "auto",
  position: "fixed",
}

// let homeImg = <img src="images/home-icon.svg" className="home-img" alt="Home" />;

class Nav extends React.Component {


  render () {

    const {classes} = this.props;

    return (
      <div className={classes.root}> 
      <AppBar position="static" color="inherit" style={shadow}>
        <Toolbar>

        <Link to="/home">
          <img src="images/logo-cvr.svg" className="logo" alt="logo"/>
          
        </Link>
  
        {/* Nav Link to "HOME", "ABOUT" "LOGIN" */}
        <div style={navRight}> 
          <Link className="nav-link" to="/home">
          {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
          {/* {props.user.id ? 'Home' : 'Login / Register'} */}
            {this.props.user.id ? 'Home' : 'Login / Register'}
          </Link>
  
        {/* Always show this link since the about page is not protected */}
          <Link className="nav-link" to="/about">
            About
          {/* <img src="images/about-icon.svg" alt="About" className="about-img" />  */}
          </Link>
          
          
          {/* Show the link to the info page and the logout button if the user is logged in */}
          {this.props.user.id && (
            <>
            {/* <IconButton>
             <Avatar src="images/avatar1.svg" className={classes.avatar} />
            </IconButton> */}
              <MenuItem />
              {/* <LogOutButton/> */}
            </>
          )}
        </div>
       </Toolbar>
      </AppBar>
    </div> 
    )
  }
}


Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(stylesTwo)(Nav));