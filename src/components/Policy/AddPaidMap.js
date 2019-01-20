import React from 'react';
import { connect } from 'react-redux';
import AddPaidBenefits from './AddPaidBenefits';
import Button from '@material-ui/core/Button';


class AddPaidMap extends React.Component {


  componentDidMount() {
    this.props.dispatch({type: 'FETCH_POLICY', payload: this.props.user.id})
  }

  handleClickDashboard = () => {
    console.log('hello!, dashboard');
    this.props.history.push("/dashboard")
  }

  render () {
    return (
      <div>
        {this.props.policy.map( element => {
          return (
            <div key={element.id}>
            <AddPaidBenefits key={element.id} element={element} />
            
            <Button
            onClick={this.handleClickDashboard}
            // className={classes.nextBtn}
            variant="outlined"
            color="primary"
          >Dashboard</Button>
          </div>
          )
          
        })}
      </div>
    )
  }
}


// const mapStateToProps = (reduxState) => {
//   return {
//     reduxState
//   }
// }
const mapStateToProps =  state => ({
  user: state.user,
  policy: state.policy
})

export default connect(mapStateToProps)(AddPaidMap);