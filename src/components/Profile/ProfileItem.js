import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Icon from '@material-ui/core/Icon';


const style = {
  color: "#89a3e5"
}

class ProfileItem extends React.Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_DEMO', payload: this.props.reduxState.demographic.id })
  }


  render() {
    return (
      <>
        {this.props.reduxState.demographic.map(demo => {
          return (
            <div key={demo.id}>
              <p className="text-styles">
                <span className="item-span">{demo.first_name}</span>
                {demo.last_name}
              </p>
              <div className="blank-div"></div>
              <p>
                <Icon><i className="far fa-envelope" style={style}></i></Icon>
                <span className="p-three">{demo.email}</span>
                <span className="p-two"><Icon><i className="fas fa-birthday-cake" style={style}></i></Icon><span className="p-three">{moment(demo.birthday).format('l')}</span></span></p>
              <div className="blank-div"></div>
              <p>
                <Icon><i className="far fa-address-book" style={style}></i></Icon>
                <span className="p-three">{demo.address}</span>
              </p>
            </div>
          )
        })}
{/* 
        <p className="text-styles"><span className="item-span">{this.props.demographic.first_name}</span>{this.props.demographic.last_name}</p>
        <div className="blank-div"></div>
        <p className="p-one"><span className="p-three">{this.props.demographic.email}</span><span className="p-two">{moment(this.props.demographic.birthday).format('l')}</span></p>
        <div className="blank-div"></div>
        <p className="p-one">
          {this.props.demographic.address}
          {moment(demographic.birthday).format('l')}
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