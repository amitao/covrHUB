import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';


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

const spanStyle = {
  paddingRight: "1em",
}

const nameStyle = {
  textTransform: "uppercase",
  letterSpacing: "2px",
  margin: "0.5em 0",
  textAlign: "left",
}

const spacing = {
  margin: '0.5em 0',
}



class DisplayInsurance extends React.Component {


  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_INSURANCE', payload: this.props.reduxState.user.id });
  }

  // handleDelete= (id) => {
  //   this.props.dispatch({type: 'DELETE_INS', payload: id})
  // }

  render() {

    return (
      <div>
        <h3 style={h3Style}>Health Insurance</h3>

          {this.props.reduxState.insurance.map(insurance => {
            return (
              <Paper key={insurance.id} style={styling}>

                <div style={nameStyle}>{insurance.name}</div>

                <div style={divStyle}>
                  <span style={spanStyle}>ID#: {insurance.member_number}</span>
                  GRP#: {insurance.group_number}
                </div>

                <div style={spacing}>
                  <span>Effective: {moment(insurance.effective_date).format('l')}</span>
                  Term: {moment(insurance.term_date).format('l')}
                </div>

                <div style={spacing}>
                  Address: {insurance.address}
                </div>
                {/* <button onClick={()=> this.handleDelete(insurance.id)}>delete</button> */}
                </Paper>
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


export default connect(mapStateToProps)(DisplayInsurance);