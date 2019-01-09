
const stylesTwo = theme => ({
  root: {
    flexGrow: 1,
  }, 
  paper: {
    padding: theme.spacing.unit,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  paperView: {
    width: 650,
    padding: theme.spacing.unit,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  grid: {
    height: 500,
    marginTop: "1em",
  },
  grid2: {
    height: "auto",
  },
  itemGrid: {
    width: "250px",
  },
  itemNestedFirst: {
    backgroundColor: "#ada6ed",
    height: "200px",
    paddingTop: "2em",
  },
  itemNestedMiddle: {
    backgroundColor: "#7060ed",
    height: "200px",
    padding: "1em 0",
  },
  itemNestedLast: {
    height: "200px",
    backgroundColor: "#5140ed",
    paddingTop: "1em",
  },
  buttons: {
    // marginTop: "1em",
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
    marginTop: "2em",
  },
  textFieldAdd: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: "2em",
  },
  nextBtn: {
    margin: "2em 1em",
  },
  input: {
    margin: theme.spacing.unit,
  },
  bgColor: {
    backgroundColor: "#cafaef",
    width: 620,
    height: 20,
    borderRadius: "50px",
  },
  span: {
    textAlign: "left",
  },
  avatar: {
    // margin: 5,
    width: 50,
    height: 50,
  }
})

export default stylesTwo;