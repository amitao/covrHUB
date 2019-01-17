import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import './Policy.css';
// import Chart from './Chart';

   

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

  }


  render () {
    
    const { item } = this.props;
    let valueDedIn, valueDedOut, valueOopIn, valueOopOut;

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

   

    return (
      <div>
        {/* <Chart chartValue={this.state.chartValue} /> */}

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


const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
} 

export default connect(mapStateToProps)(BenefitPaidItem);