import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';


const h3Style ={
  padding: ".5em 0",
  boxShadow: "-1px 2px 3px -3px rgba(115,120,165,1)",
  color:'#e1e3f7',
  backgroundColor: '#3f3fa5',
  borderRadius: "5px",
}

const styling = {
  padding: "1em",
}


class DisplayProfile extends React.Component {


  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_DEMO', payload: this.props.reduxState.user.id })
  }

  render() {
    return (
      <div>
          <h3 style={h3Style}>Policy Holder</h3>
          <Paper style={styling}>
          {this.props.reduxState.demographic.map((item) => {
            return (
              <div key={item.id}>
                Name: {item.first_name}
                Last: {item.last_name}
                Email: {item.email}
                Address: {item.address}
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

export default connect(mapStateToProps)(DisplayProfile);