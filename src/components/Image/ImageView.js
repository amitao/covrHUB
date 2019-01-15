import React from 'react';
import { connect } from 'react-redux';

class ImageView extends React.Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_IMAGE'})
  }

  render() {
    return (
      <>
        {this.props.avatar.map(item => {
          return (
            <div key={item.id}>
            <img src={item.image_url}/>
            </div>
          )
        })}
        
      </>
    )
  }
}


const mapStateToProps = state => ({
  avatar: state.imageAvatar,
  user: state.user
})


export default connect(mapStateToProps)(ImageView);