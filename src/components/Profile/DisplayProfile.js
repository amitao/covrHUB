import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';



const styling = {
  padding: "1em",
}


class DisplayProfile extends React.Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_DEMO', payload: this.props.reduxState.user.id })
  }

  render() {
    return (
      <>
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
      </>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
}

export default connect(mapStateToProps)(DisplayProfile);