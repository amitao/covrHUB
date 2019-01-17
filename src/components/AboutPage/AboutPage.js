import React from 'react';


//  class AboutPage extends React.Component {

  // import InlineEdit from 'react-edit-inline2';
   
  class AboutPage extends React.Component {
   
  //     constructor(props){
  //       super(props);
  //       this.dataChanged = this.dataChanged.bind(this);
  //       this.state = {
  //         message: 'ReactInline demo'
  //       }
  //     }
   
  //     dataChanged(data) {
  //         // data = { description: "New validated text comes here" }
  //         // Update your model from here
  //         console.log(data)
  //         this.setState({...data})
  //     }
   
  //     customValidateText(text) {
  //       return (text.length > 0 && text.length < 64);
  //     }
   
  //     render() {
  //         return (
          
  //         <div>
  //             <h2>{this.state.message}</h2>
  //             <span>Edit me: </span>


  //             <InlineEdit
  //               validate={this.customValidateText}
  //               activeClassName="editing"
  //               text={this.state.message}
  //               paramName="message"
  //               change={this.dataChanged}
  //               style={{
  //                 minWidth: 150,
  //                 display: 'inline-block',
  //                 margin: 0,
  //                 padding: 0,
  //                 fontSize: 15,
  //                 outline: 0,
  //                 border: 0
  //               }}
  //             />
  //         </div>
          
  //         )
  //     }
  // }


  // constructor(props) {
  //   super(props);
  //   this.state = { text: '', inputText: '', mode: 'view' };

  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleSave = this.handleSave.bind(this);
  //   this.handleEdit = this.handleEdit.bind(this);
  // }

  // handleChange(e) {
  //   this.setState({ inputText: e.target.value });
  // }

  // handleSave() {
  //   this.setState({ text: this.state.inputText, mode: 'view' });
  // }

  // handleEdit() {
  //   this.setState({ mode: 'edit' });
  // }

  // renderInputField() {
  //   let input;

  //   if (this.state.mode !== 'view') {
  //     input =
  //       <p>
  //         <input
  //           onChange={this.handleChange}
  //           value={this.state.inputText} />
  //       </p>;
  //   }

  //   return input;
  // }

  // renderButton() {
  //   let button;

  //   if (this.state.mode === 'view') {
  //     button =
  //       <button onClick={this.handleEdit}>
  //         Edit
  //         </button>;
  //   } else {
  //     button =
  //       <button onClick={this.handleSave}>
  //         Save
  //         </button>;
  //   }

  //   return button;
  // }

//   render() {
//     return (
//       <div>
//         <p>Text: {this.state.text}</p>


//       </div>
//     );
//   }
// }
}


// const mapStateToProps = state => ({
//   user: state.user,
// });


export default AboutPage;
