import React from 'react';


class ProfileItem extends React.Component {

  render() {
    return (
      <div>
        <p className="text-styles"><span className="item-span">{this.props.demo.first_name}</span>{this.props.demo.last_name}</p>
        <div className="blank-div"></div>
        <p className="p-one"><span className="p-three">{this.props.demo.email}</span><span className="p-two">{this.props.demo.address}</span></p>
        <div className="blank-div"></div>
      </div>
    )
  }
}


export default ProfileItem;