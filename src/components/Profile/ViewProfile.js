import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';

import styles from '../Assets/styles/stylesTwo';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import './Profile.css';
import Profile from './Profile';
import ProfileItem from './ProfileItem';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Swal from 'sweetalert2';
import Edit from '../Policy/Edit';
// import ImageView from '../Image/ImageView';

const style = {
  marginTop: "1em",
}




class ViewProfile extends React.Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_POLICY' });
  }


  handleDelete = (id) => {
    console.log(`Delete has been clicked = ${id}`);

    Swal.fire({
      title: 'Are you sure?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, please delete it!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.value) {
        this.props.dispatch({ type: 'DELETE_POLICY', payload: id });
        Swal.fire(
          'Delete successfully!',
          'Your policy has been deleted.'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Delete cancelled'
        )
      }
    })
  }


  render() {

    const { classes } = this.props;

 
    return (
      <div className={classes.root}>
        <Grid container spacing={24} className={classes.grid} justify="center" direction="row">
          <Paper className={classes.paperView}>
            <div className="view-box" >
              <div className="view-child-one">
                <img src="images/avatar1.svg" alt="me" className="ava" />
               {/* <ImageView /> */}
                <center style={style}>
                  {/* <Profile /> */}
                  <ProfileItem />
                </center>
              </div>

              <div className="view-child-two">
                <center><p className="insurance">Health Insurance Policy</p></center>
                {/* <center><div className="blank-div"></div></center> */}
                {this.props.policy.map(item => {
                  return (
                    <div key={item.id}>
                      <span className="item-span">{item.name}</span>
                      <span className="item-span">ID#:{item.member_number}</span>
                      <span className="item-span">GRP#:{item.group_number}</span>
                      <Tooltip title="Delete">
                        <IconButton aria-label="Delete" color="primary" onClick={() => this.handleDelete(item.id)}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </div>
                  )
                })}

              </div>

              <div className="view-child-three">
                {/* <Button
                  variant="outlined"
                  color="primary"
                  style={style.circleItem}
                  onClick={this.handleEdit}
                >
                  Edit Profile</Button> */}
                
                <Profile />
                <Edit />
                {/* <Button
                  variant="outlined"
                  color="primary"
                  style={style.circleItem}
                >
                  Edit Policy</Button> */}
              </div>
            </div>
          </Paper>
        </Grid>
      </div>
    )
  }
}


ViewProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
  user: state.user,
  policy: state.policy
});



export default connect(mapStateToProps)(withStyles(styles)(ViewProfile));