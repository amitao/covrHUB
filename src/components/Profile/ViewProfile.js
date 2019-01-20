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
import EditPolicy from '../Policy/EditPolicy';
import ImageView from '../Image/ImageView';
import UpdateImage from '../Image/UpdateImage';

const style = {
  marTop: {
    marginTop: "1em",
  },
  styleColor: {
    color: "#fc83a1"
  }
}


class ViewProfile extends React.Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_POLICY', payload: this.props.policy.id})
  }

  handleDelete = (id) => {
    console.log(`Delete has been clicked = ${id}`);

    Swal.fire({
      title: 'Are you sure?',
      text: ' Benefits and payments made will be deleted as well. Continue?',
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




  render() {

    const { classes } = this.props;


    return (
      <div className={classes.root}>
        <Grid container spacing={24} className={classes.grid} justify="center" direction="row">
          <Paper className={classes.paperView}>
            <div className="view-box" >
              <div className="view-child-one">

                <ImageView />
                <center style={style}>

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
                      <span><strong>ID#: </strong>{item.member_number}</span>
                      <Tooltip title="Delete">
                        <IconButton aria-label="Delete" color="primary" onClick={() => this.handleDelete(item.id)}>
                          <Delete 
                           style={style.styleColor}/>
                        </IconButton>
                      </Tooltip>
                      <EditPolicy handleOpen={this.handleOpen} handleClose={this.handleClose} item={item}/>
                    </div>
                  )
                })}
              </div>

              <div className="view-child-three">
                <div className="flex-demo">
                <Profile /> <UpdateImage />
                </div>
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