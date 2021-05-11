import { Fade } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { useDocumentBodyLock } from "../../../hooks/useDocumentBodyLock";

interface BackdropComponentProps {
  backdround?: string;
}

const Backdrop = styled.div<BackdropComponentProps>`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  /* background: ${(props) =>
    props.backdround ? props.backdround : "rgba(155, 155, 155, 0.5)"}; */
  mix-blend-mode: normal;
  backdrop-filter: blur(10px);
  z-index: 2000;
  top: 0;
  left: 0;
`;

interface UseBackdropProps {
  children: React.ReactNode;
  backdropColor?: string;
  onClose?: (...args: any[]) => void;
  closeFn: (...args: any[]) => void;
  open: boolean;
}

const AtlasBackdrop = ({
  children,
  onClose,
  closeFn,
  open,
  backdropColor,
}: UseBackdropProps) => {
  const backdropRef: React.RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  useDocumentBodyLock(open);

  const eventOnParent = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target == backdropRef.current) {
      closeFn();
    } else {
      return;
    }
  };

  return (
    <Fade
      in={open}
      timeout={{ enter: 750, exit: 400 }}
      mountOnEnter
      unmountOnExit
      exit={true}
    >
      <Backdrop
        backdround={backdropColor}
        onClick={(e: React.MouseEvent<HTMLElement>) => eventOnParent(e)}
        ref={backdropRef}
      >
        {children}
      </Backdrop>
    </Fade>
  );
};

export default AtlasBackdrop;
