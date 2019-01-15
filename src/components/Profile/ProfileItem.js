import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class ProfileItem extends React.Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_DEMO', payload: this.props.reduxState.user.id})
  }


  render() {

    return (
      <div>
        {this.props.reduxState.demographic.map( demo => {
          return ( 
            <div key={demo.id}>
              {demo.first_name}
              {demo.last_name}
              {demo.address}
              {demo.email}
            </div>
          )
        })}

        {/* <p className="text-styles"><span className="item-span">{this.props.demo.first_name}</span>{this.props.demo.last_name}</p>
        <div className="blank-div"></div>
        <p className="p-one"><span className="p-three">{this.props.demo.email}</span><span className="p-two">{moment(this.props.demo.birthday).format('l')}</span></p>
        <div className="blank-div"></div>
        <p className="p-one">
          {this.props.demo.address}
        </p> */}

      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
}

export default connect(mapStateToProps)(ProfileItem);