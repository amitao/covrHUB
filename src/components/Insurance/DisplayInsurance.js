import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';

const styling = {
  padding:"1em",
}

const h3Style = {
  marginTop: "1em",
  padding: ".5em 0",
  boxShadow: "-1px 2px 3px -3px rgba(115,120,165,1)",
  color:'#e1e3f7',
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
    this.props.dispatch({type:'FETCH_INSURANCE', payload: this.props.reduxState.user.id});
  }

  render () {

    return (
      <div>
        <h3 style={h3Style}>Health Insurance</h3>
        <Paper style={styling}>
     
        {this.props.reduxState.insurance.map( item => {
          return (
            <div key={item.id}>

            <div style={nameStyle}>{item.name}</div>

            <div style={divStyle}>
              <span style={spanStyle}>ID#: {item.member_number}</span>
              GRP#: {item.group_number}
            </div>

            <div style={spacing}>
              <span>Effective: {item.effective_date}</span>
              Term: {item.term_date}
            </div>

            <div style={spacing}>
              Address: {item.address}
            </div>
            </div>
          )
        })}
       
        </Paper>
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