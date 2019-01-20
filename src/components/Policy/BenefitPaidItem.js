import React from 'react';
import { connect } from 'react-redux';
import './Policy.css';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Button from '@material-ui/core/Button';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import moment from 'moment';
import UpdatePaidBenefits from './UpdatePaidBenefits';


const styles = theme => ({
  root: {
    width: "100%",
  },
  heading: {
    // flexBasis: '50.33%',
    flexBasis: "20.33%",
    flexShrink: 0,
    paddingTop: "1em"
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    width: "50%",
    textAlign: "center",
  },
  flexParent: {
    display: "flex",
    flexFlow: "column",
    width: "300px",
  },

  parentP: {
    display: "flex",
    flexDirection: "column",
  },
  pSpacing: {
    paddingBottom: "0.3em",
  },
  blankDiv: {
    width: "100%",
    height: "1px",
    backgroundColor: "#3f3fa5",
  },
});

const style = {
  color: "#0ae3ad",
  fontSize: "1em",
}

class BenefitPaidItem extends React.Component {


  state ={

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
    expanded: null
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

 
  handleClickAddBenefit = () => {
    this.props.history.push("/add_paid_benefit");
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {

    const { classes, item } = this.props;
    const { expanded } = this.state;

    // old value of deductible and coinsurance paid
    let valueDedIn, valueDedOut, valueOopIn, valueOopOut, date;

  
      // total of oop and deduct in-network/oon paid
    let dedPaidTotal, oopPaidTotal;

    if (item.ded_in_paid && item.ded_out_paid && 
      item.oop_in_paid && item.oop_out_paid && item.date !== null) {
      valueDedIn = item.deductible_in - item.ded_in_paid;
      valueDedOut = item.deductible_out - item.ded_out_paid;
      valueOopIn = item.out_of_pocket_in - item.oop_in_paid;
      valueOopOut = item.out_of_pocket_out - item.oop_out_paid;
      date = moment(item.date).format('l');
    } else {
      valueDedIn = 0;
      valueDedOut = 0;
      valueOopIn = 0;
      valueOopOut = 0;
      date = 'None';
    }

    dedPaidTotal = item.ded_in_paid + item.ded_out_paid;
    oopPaidTotal = item.oop_in_paid + item.oop_out_paid;



    return (
      <div className={classes.root}>

      <div>
        <div>
        <h4>Coverage: {item.cob_type}
        {item.ded_in_paid && item.ded_out_paid && 
        item.oop_in_paid && item.oop_out_paid !== null ? <UpdatePaidBenefits handleOpen={this.handleOpen} handleClose={this.handleClose} item={item}/> : <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickAddBenefit} >Add payment</Button>
        }</h4>
        </div>
        <p>Last payment date: {date}</p>

      </div>
  
        <div className={classes.flexParent}>
          <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')} className={classes.itemFlex}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <div className={classes.heading}><Icon><i className="fas fa-dollar-sign" style={style}></i></Icon></div>
              <div className={classes.secondaryHeading}>
                <h2>{dedPaidTotal}</h2>
                <p>Total Deductible Paid</p>
                
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className={classes.parentP}>
                <p className={classes.pSpacing}>In-network: ${item.deductible_in ? item.deductible_in : 0} </p>
                <p className={classes.pSpacing}>Paid amount: ${item.ded_in_paid ? item.ded_in_paid : 0}</p>
                <p className={classes.pSpacing}>Remaining: ${valueDedIn ? valueDedIn : item.deductible_in}</p>
                <div className={classes.blankDiv}></div>
                <p className={classes.pSpacing}>Out-of-network: ${item.deductible_out ? item.deductible_out : 0} </p>
                <p className={classes.pSpacing}>Paid amount: ${item.ded_out_paid ? item.ded_out_paid : 0} </p>
                <p className={classes.pSpacing}>Remaining: ${valueDedOut ? valueDedOut : item.deductible_out}</p>
            
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')} className={classes.itemFlex}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <div className={classes.heading}><Icon><i className="fas fa-dollar-sign" style={style}></i></Icon></div>
              <div className={classes.secondaryHeading}>
                <h2>{oopPaidTotal}</h2>
                <p>Total Out-Of-Pocket Paid</p>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className={classes.parentP}>
                <p>In-network: ${item.out_of_pocket_in ? item.out_of_pocket_in : 0} | Paid: ${item.oop_in_paid ? item.oop_in_paid : 0} | Left: ${valueOopIn ? valueOopIn : item.out_of_pocket_in}</p>
                <p>OON: ${item.out_of_pocket_out ? item.out_of_pocket_out : 0} | Paid: ${item.oop_out_paid ? item.oop_out_paid : 0} | Left: ${valueOopOut ? valueOopOut : item.out_of_pocket_out}</p>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
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