import React from 'react';
import { connect } from 'react-redux';


// Components
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
import Button from '@material-ui/core/Button';
import moment from 'moment';
import BenefitProps from '../Policy/BenefitsProps';


const btn = {

  width: "150px",
  borderRadius: "50px",
  marginTop: "1em",
}


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

  handleClickUpdateBenefits = () => {
    this.props.history.push("/update_paid_benefit");
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_DEMO', payload: this.props.reduxState.demographic.id })
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
           
            {this.props.reduxState.demographic.map(demo => {
              return (
                <div key={demo.id}>
                <h3>{demo.first_name} {demo.last_name}</h3>
                <p>Birthday: {moment(demo.birthday).format('l')}</p>
                <p>{demo.address}</p>
                <p>{demo.email}</p>
                </div>
              )
            })}
            
            <InsuranceView />
            <Policy />
          </Grid>

          <Grid item md className={classes.paper} style={styleDash.paper}>
            <div className="box-benefit">
              <h3 style={styleDash.h3Style}>Benefit Amount</h3>
              {/* <Button
                variant="outlined"
                color="primary"
                style={btn}
                onClick={this.handleClickUpdateBenefits} >Update payment</Button> */}
                {/* <BenefitProps /> */}
              <Button
                variant="outlined"
                color="primary"
                style={btn}
                onClick={this.handleClickAddBenefit} >Add payment</Button>
             
              <BenefitPaid />
            </div>

          </Grid>
        </Grid>
      </div>
    )
  }
}


Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = (reduxState) => {
  return {
    reduxState
}
}

// this allows us to use <App /> in index.js   
export default connect(mapStateToProps)(withStyles(styles)(Dashboard));