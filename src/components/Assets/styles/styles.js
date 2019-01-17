

// Login/Register Button style
const styles = theme => ({
  grid: {
    paddingTop: "4em",
  },
  button: {
    margin: "1em",
  },
  content: {
    padding: "14px 13px",
  },
  cardSize: {
    width: 350,
    height: 500,
    borderRadius: "10px",
    padding: "0 1em",
  },
  // Login Header box
  cardHeader: {
    width: "320px",
    position: "absolute",
    textAlign: "center",
    marginLeft: "30px",
    marginRight: "20px",
    marginTop: "-40px",
    padding: "20px 0",
    marginBottom: "15px",
    backgroundColor: "#e1e3f7",
    // backgroundColor:  
    // "linear-gradient(to bottom right, #c0c4ea, #b0f7e6)",
    color: "#7378a5",
    boxShadow: "-1px 3px 10px 0px rgba(156,158,179,0.58)",
  },
  form: {
    paddingTop: "7em",
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
    marginTop: "2em",
  },

});


export default styles;
