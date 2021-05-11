import React from "react";
import FeedbackDialog from "../../components/Util/FeedbackDialog";

import { FeedbackDialogProps } from "../../components/Util/FeedbackDialog";
import { FeedbackSeverity } from "../../components/Util/FeedbackDialog/styles";

interface EnhanceDialogComponent extends FeedbackDialogProps {}

interface EnhancedDialog {
  readonly visibility: boolean;
  setVisibility: (open: boolean) => void;
  setCallback: (callback: (...args: any[]) => void) => void;
  callback: ((...args: any[]) => void) | null;
  EnhancedDialog: () => JSX.Element;
}

const useEnhancedDialog = (
  message: string,
  title: string,
  severity: FeedbackSeverity
): EnhancedDialog => {
  const [feedbackDialogState, setFeedbackDialogState] = React.useState<{
    callback: (...args: any[]) => void;
    open: boolean;
  }>({
    callback: () => console.log("well hello"),
    open: false,
  });

  const handleSetDialog = (callback: (...args: any[]) => void) => {
    setFeedbackDialogState({ open: true, callback: callback });
  };

  const toggleDialogVisibility = (open: boolean) => {
    setFeedbackDialogState((prevState) => {
      let currentState = prevState;

      return { ...currentState, open: open };
    });
  };

  const EnhancedComponent = () => {
    return (
      <FeedbackDialog
        closeFn={() => toggleDialogVisibility(false)}
        open={feedbackDialogState.open}
        callback={feedbackDialogState.callback}
        message={message}
        severity={severity}
        title={title}
      />
    );
  };

  return {
    EnhancedDialog: EnhancedComponent,
    setCallback: handleSetDialog,
    setVisibility: toggleDialogVisibility,
    callback: feedbackDialogState.callback,
    visibility: feedbackDialogState.open,
  };
};

export default useEnhancedDialog;
