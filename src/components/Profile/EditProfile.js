import React from 'react';
import { connect } from 'reac-redux';

class EditProfile extends React.Component {
  render () {
    return (
      <div>
        edit profile
      </div>
    )
  }
}

export default connect()(EditProfile);