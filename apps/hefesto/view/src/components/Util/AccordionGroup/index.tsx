import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Add } from "@material-ui/icons";
import { Box } from "@material-ui/core";
import _ from "lodash";
import styled from "styled-components";

const AccordionGroupRoot = styled.div`
  grid-column: 1/3;
  width: 100%;
`;

const AccordionGridBox = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 1fr;
  justify-items: center;
  grid-row-gap: 50px;
  width: 100%;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr;
    justify-items: center;
    padding: 30px;
  }
`;

interface AccordionProps {
  children: React.ReactNode;
  label: string;
}

const AccordionGroup = ({ children, label }: AccordionProps) => {
  return (
    <AccordionGroupRoot>
      <Accordion square>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${label}-header`}
          id={`${_.truncate(label)}-header`}
        >
          <Typography>{_.capitalize(label)}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AccordionGridBox>{children}</AccordionGridBox>
        </AccordionDetails>
      </Accordion>
    </AccordionGroupRoot>
  );
};

export default AccordionGroup;
