import styled from "styled-components";
import { AnimateSharedLayout, motion, Variants } from "framer-motion";
import React from "react";
import { SvgIcon, TextField, Tooltip } from "@material-ui/core";
import { Add, Delete, DeleteForever, ExpandMore } from "@material-ui/icons";
import _ from "lodash";

const ListFormFieldRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: auto;

  max-height: 1500px;
  background-color: #fff;
  border-radius: 6px;
  /* padding-right: 15px; */
  /* box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25); */
  border: 1px solid dimgray;
  border-color: rgba(0, 0, 0, 0.23);
  overflow: hidden;
  /* padding: 10px; */
  color: dimgray;
  margin-bottom: 10%;
  position: relative;

  @media (min-width: 1024px) {
    width: 400px;
  }
`;

const ListFormFieldHeader = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ListFormFieldLabel = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  font-size: 1rem;
  padding-left: 20px;
  color: rgba(0, 0, 0, 0.54);
`;

const ListFormFieldExpandButton = styled(motion.div)`
  display: flex;
  align-items: center;
  cursor: pointer;
  /* padding-left: 20px; */
  margin-left: 20px;
  margin-right: 20px;

  .MuiSvgIcon-root {
    fill: dimgray;
  }
`;

const ListFormFieldAddButton = styled(motion.div)`
  display: flex;
  align-items: center;
  cursor: pointer;

  .MuiSvgIcon-root {
    fill: dimgray;
  }
`;

const ListFormFieldDeleteButton = styled(motion.div)`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  height: min-content;
  cursor: pointer;
  margin-bottom: 2px;
`;

const ListFormContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface ListFormItemRootProps {
  alignCenter?: boolean;
}

const ListFormItemRoot = styled.div<ListFormItemRootProps>`
  display: flex;
  width: 100%;
  position: relative;
  align-items: ${(props) => (props.alignCenter ? "center" : "flex-end")};
  justify-content: space-between;
  padding-top: 10px;
`;

const expandButtonVariant = {
  initial: { scale: 1, transition: { duration: 0.3 } },
  hover: { scale: 1.3 },
  pressed: { scale: 0.9 },
  expanded: { rotate: 180, transition: { duration: 0.3 } },
};

const addButtonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.3 },
  pressed: { scale: 0.9 },
};

const deleteButtonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.3 },
  pressed: { scale: 0.9 },
};

const attributeListContainerVariants: Variants = {
  initial: {
    height: 0,
  },
  expanded: {
    height: "auto",
    transition: {
      type: "spring",
      bounce: 1,
      mass: 1,
      velocity: 200,
    },
  },
};

interface ListFormItemLayoutProps {
  children: React.ReactNode;
  removeField: () => void;
  alignCenter?: boolean;
}

// type ListFormItemLayoutPropsRef = React.HTMLProps<ListFormItemLayoutProps>

export const ListFormItemLayout = ({
  children,
  removeField,
  alignCenter = false,
}: ListFormItemLayoutProps) => {
  return (
    <ListFormItemRoot alignCenter={alignCenter}>
      {children}
      <ListFormFieldDeleteButton
        onClick={removeField}
        variants={deleteButtonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="pressed"
      >
        <SvgIcon component={DeleteForever} />
      </ListFormFieldDeleteButton>
    </ListFormItemRoot>
  );
};

interface ListFormFieldLayoutProps {
  children: React.ReactNode;
  insertField: () => void;
  label: string;
}

const ListBaseFormFieldLayout = ({
  children,
  insertField,
  label,
}: ListFormFieldLayoutProps) => {
  const [listVisibility, setListVisibility] = React.useState<boolean>(false);

  const toggleListVisibility = () => {
    setListVisibility((prevState) => !prevState);
  };

  const handleInsertField = () => {
    if (!listVisibility) {
      setListVisibility(true);
    }

    insertField();
  };

  return (
    <motion.div layout="position">
      <ListFormFieldRoot>
        <ListFormFieldHeader>
          <ListFormFieldLabel>{_.capitalize(label)}</ListFormFieldLabel>

          <ListFormFieldAddButton
            variants={addButtonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="pressed"
            onClick={handleInsertField}
          >
            <SvgIcon component={Add} />
          </ListFormFieldAddButton>
          <ListFormFieldExpandButton
            onClick={toggleListVisibility}
            variants={expandButtonVariant}
            whileHover="hover"
            whileTap="pressed"
            animate={listVisibility ? "expanded" : "initial"}
          >
            <SvgIcon component={ExpandMore} />
          </ListFormFieldExpandButton>
        </ListFormFieldHeader>
        <ListFormContent
          initial="initial"
          variants={attributeListContainerVariants}
          animate={listVisibility ? "expanded" : "initial"}
        >
          <div
            style={{
              padding: "40px",
              width: "100%",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            {children}
          </div>
        </ListFormContent>
      </ListFormFieldRoot>
    </motion.div>
  );
};

export default ListBaseFormFieldLayout;
