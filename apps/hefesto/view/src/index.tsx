import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux";
import { CssBaseline } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core";
import { theme, styledTheme } from "./theme";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <StyledThemeProvider theme={styledTheme}>
          <App />
        </StyledThemeProvider>
      </MuiThemeProvider>
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);
