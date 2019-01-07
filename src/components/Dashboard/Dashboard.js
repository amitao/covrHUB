import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Components
import DisplayProfile from '../Profile/DisplayProfile';
import DisplayInsurance from '../Insurance/DisplayInsurance';
// import DisplayBenefits from '../Benefits/DisplayBenefits';


// Material-UI
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

// Other Styles
import styles from '../Assets/styles/stylesTwo';
import './Dashboard.css';


const style1 = {
  border: "none",
  outline: "0",
  textDecoration: "none",
  fontSize: "1.5em",
  color: "#e1e3f7",
  letterSpacing: "3px",
}
const style = {
  border: "none",
  outline: "0",
  textDecoration: "none",
  fontSize: "1.5em",
  color: "#ffffff",
  letterSpacing: "3px",
}


// Dashboard will displays all user information and benefits

class Dashboard extends React.Component {

  render() {

    const { classes } = this.props;

    return (
      <div>
        <div className={classes.root}>

          <Grid container spacing={24} className={classes.grid2}>

            <Grid item className={classes.itemGrid}>
              <Grid item className={classes.itemNestedFirst}>
                <center>
                  <img src="images/profile-icon.svg" alt="profile" className="profile-icon" />
                  <Link to="/view_profile" style={style}><p>Profile</p></Link>
                </center>
              </Grid>

              <Grid item className={classes.itemNestedMiddle}>
                <center>
                  <img src="images/policy-icon.svg" alt="policy" className="policy-icon" />
                  <p style={style}> Add Policy</p>
                </center>
              </Grid>

              <Grid className={classes.itemNestedLast}>
                <center>
                  <img src="images/graph-icon.svg" alt="graph" className="graph-icon" />
                  <p style={style1}> Money Spend</p>
                </center>
              </Grid>
            </Grid>
            {/* end of itemGrid div */}

            <Grid item md className={classes.paper}>
              <DisplayProfile />
              <DisplayInsurance />
              {/* <DisplayBenefits /> */}
            </Grid>

            <Grid item md className={classes.paper}>
              <p>Grid Three</p>
            </Grid>

          </Grid>
        </div>
      </div>
    )
  }
}


Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};


// this allows us to use <App /> in index.js   
export default connect()(withStyles(styles)(Dashboard));