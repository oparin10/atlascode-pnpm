import styled from "styled-components";
import { motion, Variants } from "framer-motion";
import { SvgIcon } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React from "react";

export const EntryCreationFieldsRoot = styled.div``;

export const EntryCreationFieldContainerGrid = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 1fr;
  justify-items: center;
  /* grid-row-gap: 10px; */

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

interface EntryFieldGroupRootProps {
  open: boolean;
}

export const EntryFieldGroupRoot = styled("div")<EntryFieldGroupRootProps>`
  grid-column: 1/3;
  width: 98%;
  height: auto;
  max-height: 1500px;
  background-color: #f6f7f9;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: ${(props) =>
    props.open
      ? "0px 0px 0px rgba(0, 0, 0, 0.15)"
      : "0px 4px 6px rgba(0, 0, 0, 0.15)"};
`;

export const EntryFieldGroupHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

export const EntryFieldGroupHeaderLabel = styled.div`
  text-align: center;
  flex-grow: 1;

  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;

export const EntryFieldGroupHeaderCollapse = styled(motion.div)`
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: #f6f7f9;
`;

const EntryFieldGroupMainContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  background-color: #fff;
`;

const EntryFieldGroupMainContainerGrid = styled.div`
  padding: 20px;
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 1fr;
  justify-items: center;
  grid-row-gap: 65px;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const expandButtonVariant: Variants = {
  initial: {
    scale: 1,
    transition: { duration: 0.3 },
  },
  hover: { scale: 1.3 },
  pressed: { scale: 0.9 },
  expanded: {
    rotate: 180,
    transition: { duration: 0.3 },
  },
};

const entryFieldGroupMainContainerVariants: Variants = {
  initial: {
    height: 0,
  },
  expanded: {
    height: "fit-content",
    transition: {
      type: "spring",
      mass: 0.5,
      damping: 9,
      bounce: 1,
    },
  },

  outlined: {
    border: "solid 1px #e6e6e6",
  },
};

interface EntryFieldGroupContainerProps {
  label: string;
  children: React.ReactNode;
}

export const EntryFieldGroupContainer = ({
  label = "Default label",
  children,
}: EntryFieldGroupContainerProps) => {
  const [open, setOpen] = React.useState<boolean>(true);

  const handleExpandState = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <EntryFieldGroupRoot open={open}>
      <EntryFieldGroupHeader>
        <EntryFieldGroupHeaderLabel>{label}</EntryFieldGroupHeaderLabel>
        <EntryFieldGroupHeaderCollapse
          onClick={handleExpandState}
          variants={expandButtonVariant}
          whileHover="hover"
          whileTap="pressed"
          animate={open ? "expanded" : "initial"}
        >
          <SvgIcon component={ExpandMore} />
        </EntryFieldGroupHeaderCollapse>
      </EntryFieldGroupHeader>
      <EntryFieldGroupMainContainer
        style={{ border: "0px solid rgba(0, 0, 0, 0)" }}
        initial="initial"
        variants={entryFieldGroupMainContainerVariants}
        animate={open ? ["expanded", "outlined"] : "initial"}
      >
        <EntryFieldGroupMainContainerGrid>
          {children}
        </EntryFieldGroupMainContainerGrid>
      </EntryFieldGroupMainContainer>
    </EntryFieldGroupRoot>
  );
};
