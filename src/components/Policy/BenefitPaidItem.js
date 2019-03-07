import React from 'react';
import { connect } from 'react-redux';
import './Policy.css';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';


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
    width: "400px",
  },
  parentP: {
    display: "flex",
    flexDirection: "row",
    border: "1px solid #e1e3f7",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    padding: "1em 0",
  },
  pSpacing: {
    paddingBottom: "0.3em",
  },
  pSpacingTop: {
    padding: "0.3em 0",
  },
  pSpacingColor: {
    paddingBottom: "0.3em",
    color: "#10d1a1",
  },
  blankDiv: {
    // border: "2px solid blue",
    width: "80px",
    height: "auto"
  },
  itemDetailOne: {
    alignSelf: "flex-start",
    textAlign: "left"
  },
  itemDetailTwo: {
    alignSelf: "flex-end",
  },
  blankDiv2: {
    width: "100%",
    height: "1px",
    backgroundColor: "#c0c4ea",
    margin: "1em 0",
  },
});

const style = {
  dollar: {
    color: "#0ae3ad",
    fontSize: "1em",
  },
  bspacing: {
    paddingBottom: "2em",
  },
}

class BenefitPaidItem extends React.Component {


  state = {

    chartValue: [
      {
        "id": "Total",
        "label": "Total Deductible",
        "value": this.props.item.deductible_in
      },
      {
        "id": "Paid",
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

    if (item.oop_out_paid !== null) {
      valueOopOut = item.out_of_pocket_out - item.oop_out_paid;
    } else {
      valueOopOut = 0;
    }

    if(item.ded_in_paid !== null){
      valueDedIn = item.deductible_in - item.ded_in_paid;
    } else {
      valueDedIn = 0;
    }

    if(item.ded_out_paid !== null){
      valueDedOut = item.deductible_out - item.ded_out_paid;
    } else {
      valueDedOut = 0;
    }

    if(item.oop_in_paid !== null){
      valueOopIn = item.out_of_pocket_in - item.oop_in_paid;
    } else {
      valueOopIn = 0;
    }
     if(item.date !== null) {
      date = moment(item.date).format('l');
     } else {
      date = 'None';
     }

    dedPaidTotal = item.ded_in_paid + item.ded_out_paid;
    oopPaidTotal = item.oop_in_paid + item.oop_out_paid;

     

    return (
      <div className={classes.root} style={style.bspacing}>
        <div>
          <h4>Coverage: {item.cob_type}
            {/* {displayForm} */}
            <UpdatePaidBenefits handleOpen={this.handleOpen} handleClose={this.handleClose} item={item} />
          </h4>
        </div>
        <p>Last payment date: {date}</p>

      <div className={classes.flexParent}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.heading}><Icon><i className="fas fa-dollar-sign" style={style.dollar}></i></Icon></div>
            <div className={classes.secondaryHeading}>
              <h2>{dedPaidTotal}</h2>
              <p>Total Deductible Paid</p>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className={classes.parentP}>
              <div className={classes.itemDetailOne}>
                <p className={classes.pSpacingTop}>In-network:</p>
                <p className={classes.pSpacing}>Paid:</p>
                <p className={classes.pSpacing}>Remaining:</p>
                <div className={classes.blankDiv2}></div>
                <p className={classes.pSpacing}>Out-of-network:</p>
                <p className={classes.pSpacing}>Paid:</p>
                <p className={classes.pSpacing}>Remaining:</p>
              </div>
              <div className={classes.blankDiv}></div>
              <div className={classes.itemDetailTwo}>
                <p className={classes.pSpacingTop}>${item.deductible_in ? item.deductible_in : 0}</p>
                <p className={classes.pSpacingColor}>${item.ded_in_paid ? item.ded_in_paid : 0}</p>
                <p className={classes.pSpacing}>${valueDedIn ? valueDedIn : item.deductible_in}</p>
                <div className={classes.blankDiv2}></div>
                <p className={classes.pSpacing}>${item.deductible_out ? item.deductible_out : 0}</p>
                <p className={classes.pSpacingColor}>${item.ded_out_paid ? item.ded_out_paid : 0}</p>
                <p className={classes.pSpacing}> ${valueDedOut ? valueDedOut : item.deductible_out}</p>
              </div>
            </div>

          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')} className={classes.itemFlex}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.heading}><Icon><i className="fas fa-dollar-sign" style={style.dollar}></i></Icon></div>
            <div className={classes.secondaryHeading}>
              <h2>{oopPaidTotal}</h2>
              <p>Total Out-Of-Pocket Paid</p>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className={classes.parentP}>
              <div className={classes.itemDetailOne}>
                <p className={classes.pSpacingTop}>In-network:</p>
                <p className={classes.pSpacing}>Paid:</p>
                <p className={classes.pSpacing}>Remaining:</p>
                <div className={classes.blankDiv2}></div>
                <p className={classes.pSpacing}>Out-of-network:</p>
                <p className={classes.pSpacing}>Paid:</p>
                <p className={classes.pSpacing}>Remaining:</p>
              </div>

              <div className={classes.blankDiv}></div>

              <div className={classes.itemDetailTwo}>
                <p className={classes.pSpacingTop}>${item.out_of_pocket_in ? item.out_of_pocket_in : 0}</p>
                <p className={classes.pSpacingColor}>${item.oop_in_paid ? item.oop_in_paid : 0}</p>
                <p className={classes.pSpacing}>${valueOopIn ? valueOopIn : item.out_of_pocket_in}</p>
                <div className={classes.blankDiv2}></div>
                <p className={classes.pSpacing}>${item.out_of_pocket_out ? item.out_of_pocket_out : 0}</p>
                <p className={classes.pSpacingColor}>${item.oop_out_paid ? item.oop_out_paid : 0}</p>
                <p className={classes.pSpacing}> ${valueOopOut ? valueOopOut : item.out_of_pocket_out}</p>
              </div>
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