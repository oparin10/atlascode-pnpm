import { createMuiTheme, Theme } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

export const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0e4466",
      contrastText: "#fff",
    },
    secondary: {
      main: "#17396B",
    },
  },

  typography: {
    body2: {
      fontFamily: "Iceland",
    },

    fontFamily: "Iceland",
  },

  overrides: {
    MuiScopedCssBaseline: {
      root: {
        fontFamily: "Iceland",
      },
    },

    MuiLinearProgress: {
      colorPrimary: {
        backgroundColor: "#fff",
      },
      barColorPrimary: {
        backgroundColor: "#F15D3C",
      },
    },
  },
});

export const styledTheme = {
  palette: {
    primary: {
      main: "#0e4466",
      contrastText: "#fff",
    },
    secondary: {
      main: "#17396B",
    },
  },

  typography: {
    fontFamily: "Iceland",
  },
};
