import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import React from "react";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { RootState } from "../../../redux";
import { setGlobalNotificationClosed } from "../../../redux/globalUI/actions";

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props}></MuiAlert>;
};

interface Props extends PropsFromRedux {}

const GlobalAlert = ({
  alertMessage,
  alertOpen,
  alertSeverity,
  setGlobalNotificationClosed,
}: Props) => {
  const closeAlert = () => {
    setGlobalNotificationClosed();
  };

  return (
    <div>
      <Snackbar
        style={{ zIndex: 9999 }}
        open={alertOpen}
        autoHideDuration={6000}
        onClose={closeAlert}
      >
        <Alert severity={alertSeverity} onClose={closeAlert}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

const mapDispatchToProps = {
  setGlobalNotificationClosed: setGlobalNotificationClosed,
};

const mapStateToProps = (state: RootState) => ({
  alertMessage: state.globalUI.notificationMessage,
  alertSeverity: state.globalUI.notificationSeverity,
  alertOpen: state.globalUI.notificationOpen,
});

const globalUIConnector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof globalUIConnector>;

export default globalUIConnector(GlobalAlert);
