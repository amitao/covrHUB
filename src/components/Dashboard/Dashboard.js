import React from 'react';
import { connect } from 'react-redux';


// Components
import Profile from '../Profile/Profile';
import ProfileItem from '../Profile/ProfileItem';
import Policy from '../Policy/Policy';
// Material-UI
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';


// Other Styles
import styles from '../Assets/styles/stylesTwo';
import './Dashboard.css';
import BenefitPaid from '../Policy/BenefitPaid';
import InsuranceView from '../Policy/InsuranceView';




const styleDash = {
  style1: {
    border: "none",
    outline: "0",
    textDecoration: "none",
    fontSize: "1.5em",
    color: "#e1e3f7",
    letterSpacing: "3px",
  },
  style2: {
    fontSize: "1.5em",
    color: "#ffffff",
    letterSpacing: "3px",
    cursor: "pointer",
  },
  style3: {
    fontSize: "1em",
    color: "blue",
    letterSpacing: "3px",
    cursor: "pointer",
  },
  h3Style: {
    padding: ".5em 0",
    boxShadow: "-1px 2px 3px -3px rgba(115,120,165,1)",
    color: '#e1e3f7',
    backgroundColor: '#3f3fa5',
    borderRadius: "5px",
  },
  paper: {
    padding: "1em",
    backgroundColor: "#ffffff",
  },
}



// Dashboard will displays all user information and benefits

class Dashboard extends React.Component {

  // routes to components
  handleClickProfile = () => {
    this.props.history.push("/view_profile");
  }

  handleClickAddPolicy = () => {
    this.props.history.push("/add_policy");
  }

  handleClickAddBenefit = () => {
    this.props.history.push("/add_paid_benefit");
  }

  render() {

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container className={classes.grid2}>
          <Grid item className={classes.itemGrid}>
            <Grid item className={classes.itemNestedFirst}>
              <center>
                <img src="images/profile-icon.svg" alt="profile" className="profile-icon" />
                <p onClick={this.handleClickProfile} style={styleDash.style2}>Profile</p>
              </center>
            </Grid>

            <Grid item className={classes.itemNestedMiddle}>
              <center>
                <img src="images/policy-icon.svg" alt="policy" className="policy-icon" />
                <p onClick={this.handleClickAddPolicy} style={styleDash.style2}> Add Policy</p>
              </center>
            </Grid>

            <Grid className={classes.itemNestedLast}>
              <center>
                <img src="images/graph-icon.svg" alt="graph" className="graph-icon" />
                <p style={styleDash.style1}> Money Spend</p>
              </center>
            </Grid>
          </Grid>
          {/* end of itemGrid div */}

          <Grid item md className={classes.paper} style={styleDash.paper}>
            <h3 style={styleDash.h3Style}>Policy Holder</h3>
            {/* <Profile /> */}
            <ProfileItem />
            <InsuranceView />
            <Policy />
          </Grid>

          <Grid item md className={classes.paper} style={styleDash.paper}>
            <div className="box-benefit">
              <h3 style={styleDash.h3Style}>Deductible</h3>
              {/* chart */}
            </div>
            <p onClick={this.handleClickAddBenefit} style={styleDash.style3}>Add Paid Benefits</p>
            <BenefitPaid />
          </Grid>

        </Grid>
      </div>
    )
  }
}


Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};


// this allows us to use <App /> in index.js   
export default connect()(withStyles(styles)(Dashboard));