import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import styles from '../Assets/styles/stylesTwo';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import './Profile.css';
import Profile from './Profile';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Swal from 'sweetalert2';



const style = {
  circleItem: {
    borderRadius: "65px",
    margin: "2em",
  },
  spaceTop: {
    marginTop: "1em",
  },
}




class ViewProfile extends React.Component {

  // constructor (props, context) {
  //   super(props, context);
  //   this.state = {
  //       isEditing: false,
  //       profile: {
  //         name: this.props.reduxState.demographic.first_name,
  //         lastName: this.props.reduxState.demographic.last_name,
  //         email: this.props.reduxState.demographic.email,
  //         address: this.props.reduxState.demographic.address,
  //         personID: this.props.reduxState.user.id
  //       },
  //   };

  //   this.toggleEdit = this.toggleEdit.bind(this);
  // }

  // toggleEdit() {
  //   this.setState({isEditing: !this.state.isEditing})
  // }


  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_POLICY' });
    this.props.dispatch({ type: 'FETCH_IMAGE' });
  }

  handleEdit = () => {
    
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
    // const { image_url } = this.props.image;

    return (
      <div className={classes.root}>
        <Grid container spacing={24} className={classes.grid} justify="center" direction="row">
          <Paper className={classes.paperView}>
            <div className="view-box" >
              <div className="view-child-one">
                <img src="images/avatar1.svg" alt="me" className="ava" />
                {/* <img src={image_url} alt="me" className="ava" /> */}
                <center style={style.spaceTop}>
                  <Profile />
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
                      <span className="item-span">{item.cob_type}</span>
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
                <center><div className="blank-div"></div></center>
                <Button
                  variant="outlined"
                  color="primary"
                  style={style.circleItem}
                  onClick={this.handleEdit}
                >
                  Edit Profile</Button>
                <Button
                  variant="outlined"
                  color="primary"
                  style={style.circleItem}
                >
                  Edit Policy</Button>
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


// const mapStateToProps = (reduxState) => {
//   return {
//     reduxState
//   }
// }

const mapStateToProps = state => ({
  user: state.user,
  image: state.image,
  policy: state.policy
});



export default connect(mapStateToProps)(withStyles(styles)(ViewProfile));