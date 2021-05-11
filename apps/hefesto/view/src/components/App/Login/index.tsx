import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect, RouteComponentProps } from "@reach/router";
import { RootState } from "../../../redux";
import { connect, ConnectedProps } from "react-redux";
import { basePath, dashboardPath } from "../../../config/routes.config";
import { collections } from "../../../config/collections.config";
import { loginUser } from "../../../redux/authentication/actions";
import { InputAdornment, SvgIcon, Tooltip } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {" © "}
      <Link color="inherit" href="https://atlascode.dev">
        AtlasCode Dev - Desenvolvimento de web {"&"} estratégia
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export interface LoginProps extends LoginReduxProps, RouteComponentProps {}

const Login = ({ auth, loginFn }: LoginProps) => {
  const classes = useStyles();

  const [userNameFieldValue, setUserNameFieldValue] = React.useState<string>(
    ""
  );

  const [
    userPasswordFieldValue,
    setUserPasswordFieldValue,
  ] = React.useState<string>("");

  const [passwordFieldType, setPasswordFieldType] = React.useState<boolean>(
    false
  );

  const handlePasswordTypeChange = () => {
    setPasswordFieldType((prevState) => !prevState);
  };

  const handleUserNameFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserNameFieldValue(e.target.value);
  };

  const handleUserPasswordFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserPasswordFieldValue(e.target.value);
  };

  const handleLoginSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    loginFn(userNameFieldValue, userPasswordFieldValue);
  };

  return (
    <React.Fragment>
      {auth ? (
        <Redirect
          noThrow
          to={`/${basePath}/${dashboardPath}/${collections[0].routerPath}`}
        />
      ) : (
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={userNameFieldValue}
                  onChange={handleUserNameFieldChange}
                  id="email"
                  label="Endereço de e-mail"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip
                          title={String(
                            passwordFieldType
                              ? "Ocultar senha"
                              : "Mostrar senha"
                          )}
                        >
                          <SvgIcon
                            onClick={handlePasswordTypeChange}
                            style={{ cursor: "pointer" }}
                            component={
                              passwordFieldType ? Visibility : VisibilityOff
                            }
                          />
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                  value={userPasswordFieldValue}
                  variant="outlined"
                  margin="normal"
                  onChange={handleUserPasswordFieldChange}
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type={String(passwordFieldType ? "text" : "password")}
                  id="password"
                  autoComplete="current-password"
                />
                {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
                <Tooltip
                  title={
                    userPasswordFieldValue.length <= 0 ||
                    userNameFieldValue.length <= 0
                      ? "Preencha os campos para poder tentar realizar o login"
                      : ""
                  }
                >
                  <span>
                    <Button
                      disabled={
                        userPasswordFieldValue.length <= 0 ||
                        userNameFieldValue.length <= 0
                          ? true
                          : false
                      }
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={handleLoginSubmit}
                      className={classes.submit}
                    >
                      Entrar
                    </Button>
                  </span>
                </Tooltip>

                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth.isAuth,
});

const mapDispatchToProps = {
  loginFn: loginUser,
};

const loginConnector = connect(mapStateToProps, mapDispatchToProps);

type LoginReduxProps = ConnectedProps<typeof loginConnector>;

export default loginConnector(Login);
