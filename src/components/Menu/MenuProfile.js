import React from 'react';
import { connect } from 'react-redux';

// Material UI styling
import {withStyles} from '@material-ui/core';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import styles from '../Assets/styles/stylesTwo';

// links
import { withRouter } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';



class MenuProfile extends React.Component {

state = {
  open: false,
  image: ''
};

componentDidMount() {
  this.props.dispatch({ type: 'FETCH_IMAGE', payload: this.props.reduxState.imageAvatar.id})
}



handleMenu = () => {
  this.setState(state=>({open: !state.open}));
};

handleClose = event => {
  if (this.anchorEl.contains(event.target)){
    return;
  }
  this.setState({ open: false});
};


handleClick = () => {
  this.props.history.push("/view_profile");
}


 render () {

  const {classes}= this.props;
  const {open} = this.state;

  return (
    <>
    {this.props.reduxState.imageAvatar.map( item => {
      return (
        <IconButton
        key={item.id}
        buttonRef={node => {
          this.anchorEl = node;
        }}
         aria-owns={open ? 'menu-appbar': undefined}
         aria-haspopup="true"
         onClick={this.handleMenu}>
        <Avatar src={item.image_url} className={classes.avatar}/>
      </IconButton>

      )

    })}
    {/* <IconButton
      buttonRef={node => {
        this.anchorEl = node;
      }}
       aria-owns={open ? 'menu-appbar': undefined}
       aria-haspopup="true"
       onClick={this.handleMenu}>
   
      <Avatar src={this.props.imageFile.image_url} className={classes.avatar}/>
    </IconButton> */}

    <Popper
      anchorEl={this.anchorEl}
      transition
      disablePortal
      open={open}
    >
      {({ TransitionProps, placement}) =>(

      <Grow 
      {...TransitionProps}
      id="menu-appbar"
      style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }} >
      <Paper>
      <ClickAwayListener onClickAway={this.handleClose}>
        <MenuList>
          <MenuItem >
            <h3 onClick={this.handleClick}>Profile</h3>
          </MenuItem>
          {/* Logout button */}
          <MenuItem><LogOutButton/></MenuItem>

        </MenuList>
      </ClickAwayListener>
      </Paper>
      </Grow>
      )}
    </Popper>
    </>
  )
}
}

MenuProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};


// const mapStateToProps = state => ({
//   user: state.user,
//   imageFile: state.imageAvatar
// });

const mapStateToProps =  reduxState => {
  return {
    reduxState
  }
}
export default connect(mapStateToProps)(withStyles(styles)(withRouter(MenuProfile)));