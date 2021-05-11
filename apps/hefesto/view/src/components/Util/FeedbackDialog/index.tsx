import React from "react";
import AtlasBackdrop from "../AtlasBackdrop";
import FeedbackDialogLayout, { FeedbackDialogLayoutProps } from "./styles";

export interface FeedbackDialogProps extends FeedbackDialogLayoutProps {
  open: boolean;
  onClose?: (...args: any[]) => void;
  closeFn: (...args: any[]) => void;
}

const FeedbackDialog = ({
  closeFn,
  onClose,
  callback,
  open,
  message,
  severity,
  title,
}: FeedbackDialogProps) => {
  return (
    <AtlasBackdrop closeFn={closeFn} onClose={onClose} open={open}>
      <FeedbackDialogLayout
        message={message}
        severity={severity}
        title={title}
        closeFn={closeFn}
        callback={callback}
      />
    </AtlasBackdrop>
  );
};

export default FeedbackDialog;
