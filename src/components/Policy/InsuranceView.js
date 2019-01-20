import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import Icon from '@material-ui/core/Icon';


const styling = {
  display: "flex",
  flexFlow: "row wrap",
  padding: "1em",
  marginBottom: "1em",
  // border: "2px solid red",
}

const h3Style = {
  marginTop: "1em",
  padding: ".5em 0",
  boxShadow: "-1px 2px 3px -3px rgba(115,120,165,1)",
  color: '#e1e3f7',
  backgroundColor: '#3f3fa5',
  borderRadius: "5px",
}

const divStyleTwo = {
  height: "25px",
  width: "100%",
  backgroundColor: "#cafaef",
  paddingTop: "0.5em",
  margin: "0.5em 0",
}

const nameStyleOne = {
  textTransform: "uppercase",
  color: "#243372",
  letterSpacing: "2px",
  margin: "0.5em 0",
  textAlign: "left",
}

const divStyleThree = {
  width: "100%",
}

const divStyleFour = {
  width: "100%",
  paddingTop: "0.5em"
}

const divStyleFive = {
  width: "100%",
  paddingTop: "0.5em"
}

const spacing = {
 paddingLeft: "2em",
  
}

const spacing2 = {
  paddingLeft: "2em",
 }

 const spacing3 = {
  paddingLeft: "0.5em",
 }

 const spacing4 = {
   float: "left"
 }

class InsuranceView extends React.Component {


  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_POLICY', payload: this.props.user.id });
  }

  render() {

    return (
      <div>
        <h3 style={h3Style}>Health Insurance</h3>

        {this.props.policy.map((item, i) => {
          return (
            <Paper key={i} style={styling}>

              <div style={nameStyleOne}>
                <Icon>
                  <i className="fas fa-briefcase-medical" ></i>
                </Icon> {item.name}
                <span style={spacing}>{item.cob_type}</span>
              </div>
            

              <div style={divStyleTwo}>
                <strong>ID#:</strong> {item.member_number}
                <span style={spacing2}><strong>GROUP#:</strong> {item.group_number}</span>
              </div>

              <div>
                Place of employment: {item.employment}
              </div>

              <div style={divStyleThree}>
              <span style={spacing4}>Effective: {moment(item.effective_date).format('l')}</span>
                <span style={spacing2}>Term: {moment(item.term_date).format('l')}</span>
              </div>

              <div style={divStyleFour}>
                <span style={spacing4}>Address: {item.claims_address}</span>
              </div>

              <div style={divStyleFive}>
              <span style={spacing4}>Subscriber: {item.policy_holder}</span>
                <span style={spacing3}>Phone: {item.member_service_phone}</span>
              </div>

            </Paper>
          )
        })}

      </div>
    )
  }
}

const mapStateToProps = state => ({
  policy: state.policy,
  user: state.user
})


export default connect(mapStateToProps)(InsuranceView);