import styled from "styled-components";
import { motion, Variants } from "framer-motion";
import React from "react";
import { Checkbox, SvgIcon } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import _ from "lodash";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import Attributes from "../../Attributes";

export const AttributeSelectGridContainer = styled.div`
  grid-column: 1/3;
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 1fr;
  justify-items: center;
  grid-row-gap: 65px;
  grid-column-gap: 30px;
  width: 100%;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const AttributeSelectRoot = styled.div`
  width: auto;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.25);
  height: auto;
  max-height: 1500px;
  overflow: hidden;

  @media (min-width: 1024px) {
    min-width: 50%;
  }
`;

const AttributeSelectHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const AttributeSelectHeaderCheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AttributeSelectHeaderLabel = styled.div`
  text-align: center;
  flex-grow: 1;
  font-weight: 500;

  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;

const AttributeSelectHeaderCollapse = styled(motion.div)`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const AttributeSelectBody = styled(motion.div)`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  background-color: #fff;
`;

const AttributeSelectItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const AttributeSelectItemCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AttributeSelectItemLabel = styled.div`
  text-align: center;
  flex-grow: 1;

  @media (min-width: 1024px) {
    font-size: 16px;
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

const AttributeSelectBodyVariants: Variants = {
  initial: {
    height: 0,
  },
  expanded: {
    height: "auto",
    transition: {
      type: "spring",
      mass: 0.5,
      damping: 9,
      bounce: 1,
    },
  },
};

interface AttributeSelectLayoutProps {
  attributeValues: string[];
  attributeName: string;
  attributeLabel: string;
  insertFn: (...args: any[]) => void;
  removeFn: (...args: any[]) => void;
}

interface AttributeSelectItemProps {
  attributeValue: string;
  attributeName: string;
  changeFn: (...args: any[]) => void;
}

export const AttributeSelectItem = React.memo(
  ({ attributeValue, attributeName, changeFn }: AttributeSelectItemProps) => {
    return (
      <AttributeSelectItemContainer>
        <AttributeSelectItemCheckboxContainer>
          <Checkbox
            onChange={(
              event: React.ChangeEvent<HTMLInputElement>,
              checked: boolean
            ) => changeFn(attributeValue, checked)}
          />
        </AttributeSelectItemCheckboxContainer>
        <AttributeSelectItemLabel>
          {_.capitalize(attributeValue)}
        </AttributeSelectItemLabel>
      </AttributeSelectItemContainer>
    );
  }
);

export const AttributeSelectLayout = ({
  attributeLabel,
  attributeName,
  attributeValues,
  insertFn,
  removeFn,
}: AttributeSelectLayoutProps) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const toggleOpen = () => {
    setOpen((prevState) => !prevState);
  };

  const handleCheckChange = (attributeValue: string, checked: boolean) => {
    if (checked) {
      insertFn(attributeName, attributeValue);
    } else {
      removeFn(attributeName, attributeValue);
    }
  };

  return (
    <AttributeSelectRoot>
      <AttributeSelectHeader>
        <AttributeSelectHeaderLabel>
          {_.capitalize(attributeLabel)}
        </AttributeSelectHeaderLabel>
        <AttributeSelectHeaderCollapse
          onClick={toggleOpen}
          variants={expandButtonVariant}
          whileHover="hover"
          whileTap="pressed"
          animate={open ? "expanded" : "initial"}
        >
          <SvgIcon component={ExpandMore} />
        </AttributeSelectHeaderCollapse>
      </AttributeSelectHeader>
      <AttributeSelectBody
        initial="initial"
        variants={AttributeSelectBodyVariants}
        animate={open ? "expanded" : "initial"}
      >
        {attributeValues.length > 0 ? (
          attributeValues.map((value, index: number) => {
            return (
              <AttributeSelectItem
                attributeName={attributeName}
                changeFn={handleCheckChange}
                attributeValue={value}
                key={index}
              />
            );
          })
        ) : (
          <div
            style={{
              padding: "25px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Você ainda não adicionou nenhum item a este atributo.
          </div>
        )}
      </AttributeSelectBody>
    </AttributeSelectRoot>
  );
};
