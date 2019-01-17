import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import moment from 'moment'; 
import Icon from '@material-ui/core/Icon';


const styling = {
  padding: "1em",
  marginBottom: "1em",
}

const h3Style = {
  marginTop: "1em",
  padding: ".5em 0",
  boxShadow: "-1px 2px 3px -3px rgba(115,120,165,1)",
  color: '#e1e3f7',
  backgroundColor: '#3f3fa5',
  borderRadius: "5px",
}

const divStyle = {
  height: "25px",
  width: "auto",
  backgroundColor: "#cafaef",
  paddingTop: "0.5em",
  margin: "0.5em 0",
}

const nameStyle = {
  textTransform: "uppercase",
  color: "#243372",
  letterSpacing: "2px",
  margin: "0.5em 0",
  textAlign: "left"
}

const spacing = {
  margin: '0.5em 0',
}

class InsuranceView extends React.Component {


  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_POLICY' });
  }

  render() {

    return (
      <div>
        <h3 style={h3Style}>Health Insurance</h3>

          {this.props.policy.map( (item, i) => {
            return (
              <Paper key={i} style={styling}>

                <div style={nameStyle}>
                <Icon><i class="fas fa-briefcase-medical" ></i></Icon> {item.name}<span className="item-span-3">{item.cob_type}</span></div>

                <div style={divStyle}>
                  <span className="item-span-2">ID#: {item.member_number}</span>
                  GRP#: {item.group_number}
                </div>

                <div style={spacing}>
                  <span className="item-span-2">Effective: {moment(item.effective_date).format('l')}</span>
                  Term: {moment(item.term_date).format('l')}
                </div>

                <div style={spacing}>
                  Address: {item.claims_address}
                </div>
                <div style={spacing}>
                  Subcriber: {item.policy_holder}
                  Phone: {item.member_service_phone}
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
})


export default connect(mapStateToProps)(InsuranceView);