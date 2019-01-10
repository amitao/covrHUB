import React from 'react';
import { connect } from 'react-redux';
import './Benefits.css';


const style = {
  h3Style: {
    marginTop: "1em",
    padding: ".5em 0",
    boxShadow: "-1px 2px 3px -3px rgba(115,120,165,1)",
    color:'#e1e3f7',
    backgroundColor: '#3f3fa5',
    borderRadius: "5px",
  },
  text: {
    textAlign: "left",
    paddingLeft: "2em",
  },
}



class DisplayPaidBenefits extends React.Component {


  componentDidMount() {
    this.props.dispatch({type:'FETCH_PAID_BENEFIT'});
  }


  render () {

    return (
      <div>
      <h3 style={style.h3Style}>Benefit Details</h3>
        {this.props.reduxState.benefitPaid.map( item => {
          return (
            <div key={item.id}>
            {item.ded_in_paid}
            {item.ded_out_paid}
            {item.oop_in_paid}
            {item.oop_out_paid}
            {item.date}
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
}


export default connect(mapStateToProps)(DisplayPaidBenefits);