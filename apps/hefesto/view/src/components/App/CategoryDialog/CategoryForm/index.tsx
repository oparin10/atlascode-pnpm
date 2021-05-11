import { Fade, MenuItem, TextField } from "@material-ui/core";
import React from "react";
import * as Yup from "yup";
import styled from "styled-components";
import { Category } from "@hefesto/types";

import {
  CategoryDraftChangeField,
  ROOT_LEVEL_CATEGORY,
} from "../../../../redux/categoryDraft/types";

const CategoryFormRoot = styled.div`
  width: 100%;
  height: 100%;

  .MuiPopover-root {
    z-index: 3000 !important;
  }
`;

interface CategoryFormGridContainerProps {
  update: boolean;
}

const CategoryFormGridContainer = styled.div<CategoryFormGridContainerProps>`
  width: 100%;
  height: 100%;
  display: grid;
  align-content: center;
  justify-content: center;
  margin-top: 5%;
  padding-left: 10%;
  padding-right: 10%;
  grid-template-rows: ${(props) =>
    props.update ? "0.5fr 1fr" : "0.5fr 0.8fr 1fr"};
`;

const CategoryFormGridHeaderText = styled.div`
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 3%;

  @media (min-width: 1024px) {
  }
`;

interface Props {
  categories: Category[] | null | undefined;
  updating?: boolean;
  creating?: boolean;
  categoryFields?: {
    category_name: string;
    category_parent?: string;
    category_uuid?: string;
  };
  changeFieldFn: (key: string, value: any) => CategoryDraftChangeField;
}

const CategoryForm = ({
  categories,
  categoryFields,
  changeFieldFn,
  updating,
  creating,
}: Props) => {
  const [categoryNameError, setCategoryNameError] = React.useState<boolean>(
    false
  );
  const [categoryParentError, setCategoryParentError] = React.useState<boolean>(
    false
  );

  let categoryNameCurrentValue: string = categoryFields?.category_name ?? "";

  let categoryParentCurrentValue: string =
    categoryFields?.category_parent ?? "";

  const schema = Yup.object().shape({
    categoryName: Yup.string().required(),
    categoryParent: Yup.string().required(),
  });

  const validateCategoryName: () => void = () => {
    Yup.reach(schema, "categoryName", null, null)
      .validate(categoryNameCurrentValue)
      .then(() => {
        setCategoryNameError(false);
      })
      .catch(() => {
        setCategoryNameError(true);
      });
  };

  const validateCategoryParent: () => void = () => {
    Yup.reach(schema, "categoryParent", null, null)
      .validate(categoryParentCurrentValue)
      .then(() => {
        setCategoryParentError(false);
      })
      .catch(() => {
        setCategoryParentError(true);
      });
  };

  return (
    <React.Fragment>
      <Fade in={updating || creating} timeout={{ enter: 500, exit: 100 }}>
        <div style={{ height: "100%" }}>
          <CategoryFormRoot>
            <CategoryFormGridContainer update={updating!}>
              <CategoryFormGridHeaderText>
                Preecha os campos para criar uma categoria.
              </CategoryFormGridHeaderText>

              <TextField
                variant="outlined"
                label={"Nome da categoria"}
                name="categoryName"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  changeFieldFn("category_name", e.target.value)
                }
                value={categoryNameCurrentValue}
                error={categoryNameError}
                onBlur={validateCategoryName}
                helperText={
                  categoryNameError ? "Digite um nome para a categoria" : ""
                }
              />

              {updating ? null : creating ? (
                <TextField
                  variant="outlined"
                  select
                  label="Categoria pai"
                  name="categoryParent"
                  value={categoryParentCurrentValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    changeFieldFn("category_parent", e.target.value)
                  }
                  error={categoryParentError}
                  onBlur={validateCategoryParent}
                  helperText={
                    categoryParentError ? "Selecione uma categoria pai" : ""
                  }
                >
                  <MenuItem value={ROOT_LEVEL_CATEGORY}>{"[Raíz]"}</MenuItem>;
                  {categories?.map((category: Category, index: number) => {
                    return (
                      <MenuItem value={category.uuid} key={index}>
                        {category.label_path![
                          category.label_path!.length - 1
                        ].toString()}
                      </MenuItem>
                    );
                  })}
                </TextField>
              ) : null}
            </CategoryFormGridContainer>
          </CategoryFormRoot>
        </div>
      </Fade>
    </React.Fragment>
  );
};

export default CategoryForm;
