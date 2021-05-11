import { Fade, LinearProgress, makeStyles } from "@material-ui/core";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../redux";

interface Props extends PropsFromRedux {}

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    zIndex: 9999,
  },
}));

const Loading = ({ isLoading }: Props) => {
  const classes = useStyles();

  return (
    <Fade in={isLoading} timeout={{ enter: 250, exit: 250 }}>
      <div
        style={{ display: isLoading ? "block" : "none" }}
        className={classes.root}
      >
        <LinearProgress />
      </div>
    </Fade>
  );
};

const mapStateToProps = (state: RootState) => ({
  isLoading: state.globalUI.isLoading,
});

const mapDispatchToProps = {};

const globalUILoadingConnector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof globalUILoadingConnector>;

export default globalUILoadingConnector(Loading);
