import { Button, SvgIcon } from "@material-ui/core";
import {
  CheckCircleOutline,
  Error,
  HelpOutline,
  Info,
  Warning,
} from "@material-ui/icons";
import styled from "styled-components";

const FeedbackDialogRoot = styled.div`
  width: 320px;
  height: 416px;

  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;

  @media (min-width: 1024px) {
    width: 462px;
    height: 626px;
  }
`;

const FeedbackDialogInnerContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface FeedBackSeverityProps {
  severity: FeedbackSeverity;
}

const FeedbackDialogSeverityContainer = styled.div<FeedBackSeverityProps>`
  height: 45%;
  width: 100%;
  background-color: ${(props) =>
    props.severity == "success"
      ? "#2cd283"
      : props.severity == "error"
      ? "#FF4743"
      : props.severity == "warning"
      ? "#ff9800"
      : props.severity == "info"
      ? "#2196f3"
      : "#E5E5E5"};
  border-radius: 8px 8px 0px 0px;

  display: flex;
  justify-content: center;
  align-items: center;

  .MuiSvgIcon-root {
    height: 100px;
    width: 100px;
    fill: #fff;
  }

  @media (min-width: 1024px) {
    .MuiSvgIcon-root {
      height: 160px;
      width: 160px;
    }
  }
`;

const FeedbackDialogContentContainer = styled.div`
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: calc(100% - 45%);
`;

const FeedbackDialogContentTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;

  @media (min-width: 1024px) {
    font-size: 24px;
  }
`;

const FeedbackDialogContentText = styled.div`
  font-size: 15px;
  color: #7c7c7c;
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;

  @media (min-width: 1024px) {
    font-size: 22px;
  }
`;

interface FeedbackDialogContentButtonContainerProps {
  withCallback: boolean;
  severity: FeedbackSeverity;
}

const FeedbackDialogContentButtonContainer = styled.div<FeedbackDialogContentButtonContainerProps>`
  width: 100%;
  display: flex;
  justify-content: ${(props) =>
    props.withCallback ? "space-evenly" : "center"};
  cursor: pointer;

  .cancelBtn {
    border-color: ${(props) =>
      props.severity == "success"
        ? "#2cd283"
        : props.severity == "error"
        ? "#FF4743"
        : props.severity == "warning"
        ? "#ff9800"
        : props.severity == "info"
        ? "#2196f3"
        : "#E5E5E5"};

    color: ${(props) =>
      props.severity == "success"
        ? "#2cd283"
        : props.severity == "error"
        ? "#FF4743"
        : props.severity == "warning"
        ? "#ff9800"
        : props.severity == "info"
        ? "#2196f3"
        : "#E5E5E5"};
  }

  .confirmBtn {
    background-color: ${(props) =>
      props.severity == "success"
        ? "#2cd283"
        : props.severity == "error"
        ? "#FF4743"
        : props.severity == "warning"
        ? "#ff9800"
        : props.severity == "info"
        ? "#2196f3"
        : "#E5E5E5"};

    color: #fff;
  }
`;

const FeedbackDialogButtonBase = styled.div<FeedBackSeverityProps>`
  width: 158px;
  height: 40px;
  background: ${(props) =>
    props.severity == "success"
      ? "#2cd283"
      : props.severity == "error"
      ? "#FF4743"
      : props.severity == "warning"
      ? "#ff9800"
      : props.severity == "info"
      ? "#2196f3"
      : "#E5E5E5"};
  border-radius: 62px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 1024px) {
    width: 214px;
    height: 53px;
  }
`;

const FeedbackDialogButtonText = styled.div`
  color: #fff;
  font-size: 16px;

  @media (min-width: 1024px) {
    font-size: 22px;
  }
`;

export type FeedbackSeverity = "warning" | "success" | "error" | "info";

export type FeedbackDialogLayoutProps = {
  severity?: FeedbackSeverity;
  title?: string;
  message?: string;
  closeFn?: (...args: any[]) => void;
  callback?: ((...args: any[]) => void) | null | void;
};

const FeedbackDialogLayout = ({
  message = "Placeholder message goes here",
  severity = "info",
  title = "Placeholder title!",
  closeFn,
  callback,
}: FeedbackDialogLayoutProps) => {
  const handleCallback = () => {
    if (callback && closeFn) {
      callback();
      closeFn();
    }
  };

  return (
    <FeedbackDialogRoot>
      <FeedbackDialogInnerContainer>
        <FeedbackDialogSeverityContainer severity={severity}>
          <SvgIcon
            component={
              severity == "success"
                ? CheckCircleOutline
                : severity == "error"
                ? Error
                : severity == "info"
                ? Info
                : severity == "warning"
                ? Warning
                : HelpOutline
            }
          />
        </FeedbackDialogSeverityContainer>
        <FeedbackDialogContentContainer>
          <FeedbackDialogContentTitle>{title}</FeedbackDialogContentTitle>
          <FeedbackDialogContentText>{message}</FeedbackDialogContentText>

          <FeedbackDialogContentButtonContainer
            severity={severity}
            withCallback={Boolean(callback)}
          >
            <Button className="cancelBtn" onClick={closeFn} variant="outlined">
              Fechar
            </Button>

            {Boolean(callback) ? (
              <Button
                className="confirmBtn"
                onClick={handleCallback}
                variant="contained"
              >
                Confirmar
              </Button>
            ) : null}
          </FeedbackDialogContentButtonContainer>
        </FeedbackDialogContentContainer>
      </FeedbackDialogInnerContainer>
    </FeedbackDialogRoot>
  );
};

export default FeedbackDialogLayout;
