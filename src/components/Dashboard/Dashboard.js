import React from 'react';
import { connect } from 'react-redux';

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
  },
  h3Style: {
    padding: ".5em 0",
    boxShadow: "-1px 2px 3px -3px rgba(115,120,165,1)",
    color: '#e1e3f7',
    backgroundColor: '#3f3fa5',
    borderRadius: "5px",
  }
}



// Dashboard will displays all user information and benefits

class Dashboard extends React.Component {

  // routes to components
  handleClick = () => {
    this.props.history.push("/view_profile");
  }


  render() {

    const { classes } = this.props;

    return (
        <div className={classes.root}>
          <Grid container spacing={24} className={classes.grid2}>
            <Grid item className={classes.itemGrid}>
              <Grid item className={classes.itemNestedFirst}>
                <center>
                  <img src="images/profile-icon.svg" alt="profile" className="profile-icon" />
                  <p onClick={this.handleClick} style={styleDash.style2}>Profile</p>
                </center>
              </Grid>

              <Grid item className={classes.itemNestedMiddle}>
                <center>
                  <img src="images/policy-icon.svg" alt="policy" className="policy-icon" />
                  <p style={styleDash.style2}> Add Policy</p>
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

            <Grid item md className={classes.paper}>
              <div>
                <h3 style={styleDash.h3Style}>Policy Holder</h3>
                <DisplayProfile />
              </div>
              
              <DisplayInsurance />
              {/* <DisplayBenefits /> */}
            </Grid>

            <Grid item md className={classes.paper}>
              <p>Grid Three</p>
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