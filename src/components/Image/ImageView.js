import React from 'react';
import { connect } from 'react-redux';

const style={
  width: "150px",
  height: "170px",
  borderRadius: "50%",
  border: "1px solid #c0c4ea",
  backgroundColor: "#ffffff",
  boxShadow: "-1px 2px 3px -2px #324a96",
  padding: "1em 1em 0 1em",
}

class ImageView extends React.Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_IMAGE', payload: this.props.user.id})
  }

  render() {
    return (
      <>
        {this.props.avatar.map(item => {
          return (
            <div key={item.id}>
            <img src={item.image_url} alt="me" style={style}/>
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