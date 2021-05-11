import styled from "styled-components";
import { motion, Variants } from "framer-motion";
import React from "react";
import { Checkbox, SvgIcon } from "@material-ui/core";
import { ArrowRightAlt, ExpandMore } from "@material-ui/icons";
import _ from "lodash";
import { CategoryMaterializedPair } from "..";

export const CategorySelectGridContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 1fr;
  justify-items: center;
  grid-row-gap: 65px;
  grid-column-gap: 30px;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const CategorySelectRoot = styled.div`
  width: auto;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.25);
  height: auto;
  max-height: 1500px;
  overflow: hidden;

  @media (min-width: 1024px) {
    min-width: 60%;
  }
`;

const CategorySelectHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const CategorySelectHeaderCheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategorySelectHeaderLabel = styled.div`
  text-align: center;
  flex-grow: 1;
  font-weight: 700;

  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;

const CategorySelectHeaderCollapse = styled(motion.div)`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CategorySelectBody = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

const CategorySelectItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const CategorySelectItemCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CategorySelectItemLabel = styled.div`
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

const categorySelectBodyVariants: Variants = {
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

interface CategorySelectLayoutProps {
  rootCategory: CategoryMaterializedPair;
  childCategories: CategoryMaterializedPair[];
  insertFn: (...args: any[]) => void;
  removeFn: (...args: any[]) => void;
}

interface CategorySelectItemProps {
  childCategories: CategoryMaterializedPair;
  changeFn: (...args: any[]) => void;
}

export const CategorySelectItem = ({
  childCategories,
  changeFn,
}: CategorySelectItemProps) => {
  return (
    <CategorySelectItemContainer>
      <CategorySelectItemCheckboxContainer>
        <Checkbox
          onChange={(
            event: React.ChangeEvent<HTMLInputElement>,
            checked: boolean
          ) =>
            changeFn(
              childCategories.uuidPath[childCategories.uuidPath.length - 1],
              checked
            )
          }
        />
      </CategorySelectItemCheckboxContainer>
      <CategorySelectItemLabel>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {childCategories.labelPath.map((label: string, index: number) => {
            return (
              <div
                key={index}
                style={{ display: "flex", alignItems: "center" }}
              >
                <div>{_.capitalize(label)}</div>
                {index == childCategories.labelPath.length - 1 ? (
                  ""
                ) : (
                  <SvgIcon
                    component={ArrowRightAlt}
                    style={{
                      marginLeft: "8px",
                      marginRight: "8px",
                      fontSize: "1.2rem",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </CategorySelectItemLabel>
    </CategorySelectItemContainer>
  );
};

export const CategorySelectLayout = ({
  rootCategory,
  childCategories,
  insertFn,
  removeFn,
}: CategorySelectLayoutProps) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const toggleOpen = () => {
    setOpen((prevState) => !prevState);
  };

  const handleCheckChange = (categoryUUID: string, checked: boolean) => {
    if (checked) {
      insertFn(categoryUUID);
    } else {
      removeFn(categoryUUID);
    }
  };

  return (
    <CategorySelectRoot>
      <CategorySelectHeader>
        <CategorySelectHeaderCheckboxContainer>
          <Checkbox
            onChange={(
              event: React.ChangeEvent<HTMLInputElement>,
              checked: boolean
            ) => handleCheckChange(rootCategory.uuidPath[0], checked)}
          />
        </CategorySelectHeaderCheckboxContainer>
        <CategorySelectHeaderLabel>
          {rootCategory.labelPath[0]}
        </CategorySelectHeaderLabel>
        <CategorySelectHeaderCollapse
          onClick={toggleOpen}
          variants={expandButtonVariant}
          whileHover="hover"
          whileTap="pressed"
          animate={open ? "expanded" : "initial"}
        >
          <SvgIcon component={ExpandMore} />
        </CategorySelectHeaderCollapse>
      </CategorySelectHeader>
      <CategorySelectBody
        initial="initial"
        variants={categorySelectBodyVariants}
        animate={open ? "expanded" : "initial"}
      >
        {childCategories.map((value, index) => {
          return (
            <CategorySelectItem
              changeFn={handleCheckChange}
              childCategories={value}
              key={index}
            />
          );
        })}
      </CategorySelectBody>
    </CategorySelectRoot>
  );
};
