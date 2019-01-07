import React from 'react';
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




class MenuProfile extends React.Component {

state = {
  open: false,
};

handleMenu = event => {
  this.setState(state=>({open: !state.open}));
};

handleClose = event => {
  if (this.anchorEl.contains(event.target)){
    return;
  }
  this.setState({ open: false});
};


 render () {

  const {classes}= this.props;
  const {open} = this.state;

  return (
    <div>
    <IconButton
      buttonRef={node => {
        this.anchorEl = node;
      }}
       aria-owns={open ? 'menu-appbar': undefined}
       aria-haspopup="true"
       onClick={this.handleMenu}>
      <Avatar src="images/avatar1.svg" className={classes.avatar}/>
    </IconButton>

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
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
        </MenuList>
      </ClickAwayListener>
      </Paper>
      </Grow>
      )}
    </Popper>
    </div>
  )
}
}

MenuProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(MenuProfile);