import { makeStyles } from "@material-ui/core/styles";
const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "98vw",
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    width: "100%",
    left: 0,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      padding: 0,
      paddingTop: theme.spacing(2),
      width: "100%",
      margin: "0 auto",
    },
  },
  gameLayout: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      padding: 0,
      paddingLeft: 3,
      paddingTop: theme.spacing(1),
    },
  },
  map: {
    width: "77vw",
    height: "74vh",
    [theme.breakpoints.down("sm")]: {
      width: "95vw",
      height: "68vh",
    },
  },
}));
