import React from 'react';
import { connect } from 'react-redux';

// import PolicyItem from './PolicyItem';
const style = {
  h3Style: {
    marginTop: "1em",
    padding: ".5em 0",
    boxShadow: "-1px 2px 3px -3px rgba(115,120,165,1)",
    color:'#e1e3f7',
    backgroundColor: '#3f3fa5',
    borderRadius: "5px",
  },
  text: {
    textAlign: "left",
    paddingLeft: "2em",
  },
}


class Policy extends React.Component {

  componentDidMount() {
    this.props.dispatch({type: 'FETCH_POLICY'})
  }

  render() {
    return (
      <div>
        <h3 style={style.h3Style}>Policy Summary</h3>
        {this.props.policy.map( (item, i) => {
          return (
            <table key={i}>
              <thead>
              <tr>
                <th>{item.name}</th>
                <th>In-Network</th>
                <th>Out-Network</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td style={style.text}>Deductible:</td> 
                <td> ${item.deductible_in}</td>
                <td> ${item.deductible_out}</td>
              </tr>
              <tr>
                <td style={style.text}>Co-insurance:</td>
                <td>${item.coinsurance_in}</td>
                <td>${item.coinsurance_out}</td>
              </tr>
              <tr>
                <td style={style.text}>Co-pay:</td>
                <td>${item.copay_in}</td>
                <td>${item.copay_special}</td>
              </tr>
              <tr>
                <td style={style.text}>Out-of-pocket:</td>
                <td>${item.out_of_pocket_in}</td>
                <td>${item.out_of_pocket_out}</td>
              </tr>
              </tbody>
            </table>
          ) 
        })}
      </div>
    )
  }
}


const mapStateToProps = state => ({
  user: state.user,
  policy: state.policy,
})


export default connect(mapStateToProps)(Policy);