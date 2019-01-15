import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class ProfileItem extends React.Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_DEMO', payload: this.props.reduxState.user.id })
  }


  render() {
    return (
      <>
        {this.props.reduxState.demographic.map(demo => {
          return (
            <div key={demo.id}>
              <p className="text-styles"><span className="item-span">{demo.first_name}</span>{demo.last_name}</p>
              <div className="blank-div"></div>
              <p className="p-one"><span className="p-three">{demo.email}</span><span className="p-two">{moment(demo.birthday).format('l')}</span></p>
              <div className="blank-div"></div>
              <p className="p-one">
                {demo.address}
              </p>
            </div>
          )
        })}

        {/* <p className="text-styles"><span className="item-span">{this.props.demo.first_name}</span>{this.props.demo.last_name}</p>
        <div className="blank-div"></div>
        <p className="p-one"><span className="p-three">{this.props.demo.email}</span><span className="p-two">{moment(this.props.demo.birthday).format('l')}</span></p>
        <div className="blank-div"></div>
        <p className="p-one">
          {this.props.demo.address}
          {moment(demo.birthday).format('l')}
        </p> */}

      </>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
}

export default connect(mapStateToProps)(ProfileItem);