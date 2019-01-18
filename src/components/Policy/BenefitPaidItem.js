import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import './Policy.css';
// import Chart from './Chart';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';



const styles = theme => ({
  root: {
    width: "70%"
  },
  heading: {
    // flexBasis: '50.33%',
    flexBasis: "10.33%",
    flexShrink: 0,
    paddingTop: "1em"
  },
  secondaryHeading: {
    // fontSize: theme.typography.pxToRem(15),
   color: theme.palette.text.secondary,
   paddingLeft: "1em",
  },
});

const style = {
  color: "#0ae3ad",
  fontSize: "1.5em",
}

class BenefitPaidItem extends React.Component {


  state ={
    expanded: null,
    chartValue:[
      {"id":"Total", 
       "label": "Total Deductible",
       "value": this.props.item.deductible_in
      },
      {"id": "Paid",
      "label": "Paid amount",
      "value": this.props.item.ded_in_paid
      }
    ],

  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render () {
    
    const { classes, item } = this.props;
    const { expanded } = this.state;

    let valueDedIn, valueDedOut, valueOopIn, valueOopOut;
    let dedPaidTotal, oopPaidTotal;

     if (item !== null) {
      valueDedIn = item.deductible_in - item.ded_in_paid;
      valueDedOut = item.deductible_out - item.ded_out_paid;
      valueOopIn = item.out_of_pocket_in - item.oop_in_paid;
      valueOopOut = item.out_of_pocket_out - item.oop_out_paid;
    } else {
      valueDedIn = 0;
      valueDedOut = 0 ;
      valueOopIn = 0;
      valueOopOut = 0;
    }

    if (item.oop_in_paid && item.oop_out_paid !== 0) {
      oopPaidTotal = item.oop_in_paid + item.oop_out_paid;
    } 

    // if (item.ded_in_paid && item.ded_out_paid !== null || item.ded_in_paid && item.ded_out_paid === 0) {
    //   dedPaidTotal = item.ded_in_paid + item.ded_out_paid;
    // } 
    dedPaidTotal = item.ded_in_paid + item.ded_out_paid;
    oopPaidTotal = item.oop_in_paid + item.oop_out_paid;

    return (

      <div>
        {/* <Chart chartValue={this.state.chartValue} /> */}
        <div className={classes.root}>
      <h3>Benefits Paid</h3>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.heading}><Icon><i className="fas fa-dollar-sign" style={style}></i></Icon></div>
            <div className={classes.secondaryHeading}>
              <h1>{dedPaidTotal}</h1> 
              <p>Total Deductible Paid</p>
             </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
              maximus est, id dignissim quam.

            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.heading}><Icon><i className="fas fa-dollar-sign" style={style}></i></Icon></div>
            <div className={classes.secondaryHeading}>
              <h1>{oopPaidTotal}</h1> 
              <p>Total OOP Paid</p>
             </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
              diam eros in elit. Pellentesque convallis laoreet laoreet.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
       
      </div>

        <table>
          <thead>
          <tr className="color-tr-header">
            <th></th>
            <th>{item.name}</th>
            <th></th>
            <th>Date Paid: {item.date ? moment(item.date).format('l') : 'NONE'}</th>
          </tr>  
          </thead>   
          <tbody>    
          <tr>
            <th className="col-color">Deductible:</th>
            <th>In-network</th>
            <th>Paid</th>
            <th>Remaining</th>
          </tr>
          <tr>
            <td className="col-color"></td>
            <td>${item.deductible_in ? item.deductible_in : 0}</td>
            <td>${item.ded_in_paid ? item.ded_in_paid : 0}</td>
            <td>${valueDedIn ? valueDedIn : item.deductible_in}</td>
          </tr>
          <tr>
            <th className="col-color"></th>
            <th>Out-network:</th>
            <th>Paid</th>
            <th>Remaining</th>
          </tr>
          <tr>
            <td className="col-color"></td>
            <td>${item.deductible_out ? item.deductible_out : 0}</td>
            <td>${item.ded_out_paid ? item.ded_out_paid : 0}</td>
            <td>${valueDedOut ? valueDedOut : item.deductible_out}</td>
          </tr>
          <tr>
            <th className="col-color">Out-of-pocket:</th>
            <th>In-network</th>
            <th>Paid</th>
            <th>Remaining</th>
          </tr>
          <tr>
            <td className="col-color"></td>
            <td>${item.out_of_pocket_in ? item.out_of_pocket_in : 0}</td>
            <td>${item.oop_in_paid ? item.oop_in_paid : 0}</td>
            <td>${valueOopIn ? valueOopIn : item.out_of_pocket_in}</td>
          </tr>
          <tr>
            <th className="col-color"></th>
            <th>Out-network</th>
            <th>Paid</th>
            <th>Remaining</th>
          </tr>
          <tr>
            <td className="col-color"></td>
            <td>${item.out_of_pocket_out ? item.out_of_pocket_out : 0}</td>
            <td>${item.oop_out_paid ? item.oop_out_paid : 0}</td>
            <td>${valueOopOut}</td>
          </tr>
          </tbody>
        </table>

      </div>

    )
  }

}




BenefitPaidItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
} 

export default connect(mapStateToProps)(withStyles(styles)(BenefitPaidItem));