import React from "react";
import styled from "styled-components";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { SvgIcon, TextField, Tooltip } from "@material-ui/core";
import { Add, Delete, ExpandMore } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { globalNotificationCustom } from "../../../../redux/globalUI/actions";

const AttributeCreationRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: auto;
  max-height: 1500px;
  background-color: #fff;
  border-radius: 6px;
  padding-right: 15px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  margin-bottom: 10%;
`;
const AttributeCreationHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;
const AttributeCreationHeaderTitle = styled.div`
  text-align: center;
  flex-grow: 1;
  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;
const AttributeCreationHeaderCollapse = styled(motion.div)`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const AttributeCreationFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;
const AttributeCreationField = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;
const AttributeCreationAddIcon = styled(motion.div)`
  height: 100%;
  display: flex;
  margin-top: 15px;
  align-items: center;
  cursor: pointer;
`;

const AttributeListContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AttributeListItemContainer = styled(motion.div)`
  margin-top: 5%;
  display: flex;
  width: 93%;
  margin-bottom: 10%;
`;

const AttributeListItemLabel = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  text-align: center;
`;
const AttributeListItemDeleteButton = styled(motion.div)`
  cursor: pointer;
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
    height: "fit-content",
    transition: {
      type: "spring",
      bounce: 1,
      mass: 1,
      velocity: 200,
    },
  },
};

interface Props {
  deleteFn: (...args: any[]) => void;
  createFn: (...args: any[]) => void;
  attributesData: Array<any>;
  label: string;
  name: string;
}

const AttributeCreation = ({
  deleteFn,
  createFn,
  label,
  name,
  attributesData = [],
}: Props) => {
  const [
    attributeListVisible,
    setAttributeListVisible,
  ] = React.useState<boolean>(true);

  const [
    attributeCreateValue,
    setAttributeCreateValue,
  ] = React.useState<string>("");

  const handleCreateAttribute = () => {
    if (attributeCreateValue.length <= 0) {
      handleEmptyField();
    } else {
      createFn(name, attributeCreateValue);

      setAttributeCreateValue("");
    }
  };

  const handleDeleteAttribute = (attributeToDelete: any) => {
    deleteFn(name, attributeToDelete);
  };

  const handleAttributeListVisible = () => {
    setAttributeListVisible((prevState) => !prevState);
  };

  const dispatch = useDispatch();

  const handleEmptyField = () => {
    dispatch(
      globalNotificationCustom(
        "Preencha o campo para adicionar o atributo",
        "info"
      )
    );
  };

  const handleSubmitOnKeyPressEnter = (
    e: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();

      if (attributeCreateValue.length > 0) {
        handleCreateAttribute();
      } else {
        handleEmptyField();
      }
    }
  };

  return (
    <div>
      <AttributeCreationRoot>
        <AttributeCreationHeader>
          <AttributeCreationHeaderTitle>{label}</AttributeCreationHeaderTitle>
          <AttributeCreationHeaderCollapse
            onClick={handleAttributeListVisible}
            variants={expandButtonVariant}
            whileHover="hover"
            whileTap="pressed"
            animate={attributeListVisible ? "expanded" : "initial"}
          >
            <SvgIcon component={ExpandMore} />
          </AttributeCreationHeaderCollapse>
        </AttributeCreationHeader>
        <AttributeCreationFormContainer>
          <AttributeCreationField>
            <TextField
              variant="standard"
              onChange={(e) => setAttributeCreateValue(e.target.value)}
              value={attributeCreateValue}
              label={label}
              onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
                handleSubmitOnKeyPressEnter(e)
              }
            />
          </AttributeCreationField>
          <AttributeCreationAddIcon
            variants={addButtonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="pressed"
            onClick={handleCreateAttribute}
          >
            <Tooltip
              arrow
              title="Digite o nome do atributo e clique para adicionar."
            >
              <SvgIcon component={Add} />
            </Tooltip>
          </AttributeCreationAddIcon>
        </AttributeCreationFormContainer>
        <AttributeListContainer
          initial="initial"
          variants={attributeListContainerVariants}
          animate={attributeListVisible ? "expanded" : "initial"}
        >
          {attributesData.map((item, index) => {
            return (
              <AttributeListItemContainer
                key={index}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                }}
                exit={{ opacity: 0 }}
              >
                <AttributeListItemLabel>{item}</AttributeListItemLabel>
                <AttributeListItemDeleteButton
                  onClick={() => handleDeleteAttribute(item)}
                  variants={deleteButtonVariants}
                  whileHover="hover"
                  initial="initial"
                  whileTap="pressed"
                >
                  <SvgIcon component={Delete} />
                </AttributeListItemDeleteButton>
              </AttributeListItemContainer>
            );
          })}
        </AttributeListContainer>
      </AttributeCreationRoot>
    </div>
  );
};

export default AttributeCreation;
