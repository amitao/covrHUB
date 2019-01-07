

// Login/Register Button style
const styles = theme => ({
  grid: {
    paddingTop: "4em",
  },
  buttonStyle: {
  minHeight: "auto",
  minwidth: "auto",
  backgroundColor: "#7060ed",
  color: '#ffffff',
  boxShadow:
    "0 2px 2px 0 rgba(153, 153, 153, 0.14), 0 3px 1px -2px rgba(153, 153, 153, 0.2), 0 1px 5px 0 rgba(153, 153, 153, 0.12)",
  border: "none",
  borderRadius: "3px",
  position: "relative",
  padding: "12px 30px",
  margin: theme.spacing.unit,
  fontSize: "12px",
  fontWeight: "400",
  textTransform: "uppercase",
  letterSpacing: "0",
  cursor: "pointer",
    "&:hover,&:focus": {
      color: "#FFFFFF",
      backgroundColor: "#4c4c64",
      boxShadow:
        "0 14px 26px -12px rgba(153, 153, 153, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(153, 153, 153, 0.2)"
    }
  },

  content: {
    padding: "14px 13px",
  },
  cardSize: {
    width: 350,
    height: 400,
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
    color: "#ffffff",
    boxShadow: "-1px 3px 10px 0px rgba(156,158,179,0.58)",
  },
  form: {
    paddingTop: "5em",
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
