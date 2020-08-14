import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#318531",
    },
    secondary: {
      main: "#ecff7f",
    },
  },
});

ReactDOM.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
