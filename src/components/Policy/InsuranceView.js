import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import Icon from '@material-ui/core/Icon';


const styling = {
  display: "flex",
  flexDirection: "column",
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
                </Icon> {item.name}<span className="cob">{item.cob_type}</span>
              </div>
            
              <div className="insurance-box1">
                <strong>ID#:</strong> {item.member_number}
                <span className="id-grp"><strong>GROUP#:</strong> {item.group_number}</span>
              </div>

              <div className="employment">
                <span className="name-color">Place of employment:</span> {item.employment}
              </div>

              <div className="effective">
              <span className="name-color">Effective:</span> <span>{moment(item.effective_date).format('l')}</span>
                <span className="termed">Term: </span>{moment(item.term_date).format('l')}
              </div>

              <div className="sub">
              <span className="name-color">Subscriber:</span> {item.policy_holder}
              <span className="termed">Phone:</span> {item.member_service_phone}
              </div>

              <div className="address">
                <span className="name-color">Address:</span> {item.claims_address}
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