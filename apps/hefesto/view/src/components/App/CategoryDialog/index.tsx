import { Button, SvgIcon, Tooltip } from "@material-ui/core";
import { ArrowBackRounded } from "@material-ui/icons";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import styled from "styled-components";
import { useDocumentBodyLock } from "../../../hooks/useDocumentBodyLock";
import { RootState } from "../../../redux";
import {
  categoryCreate,
  categoryDraftComponentClose,
  categoryDraftFieldChange,
  categoryUpdate,
} from "../../../redux/categoryDraft/actions";
import AtlasBackdrop from "../../Util/AtlasBackdrop";
import CategoryForm from "./CategoryForm";

const CategoryDialogRoot = styled.div`
  width: 330px;
  height: 470px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.35);

  @media (min-width: 1024px) {
    width: 814px;
    height: 580px;
  }
`;

const CategoryDialogContainer = styled.div`
  background-color: #fff;
  border-radius: 4px;
  height: 100%;
  width: 100%;
`;

const CategoryDialogInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CategoryDialogHeader = styled.div`
  border-bottom: 1.5px solid #dfe0eb;
  height: calc(100% * 0.11);
  width: 100%;
`;

const CategoryDialogHeaderInner = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  & .categoryHeaderLabel {
    height: 100%;
    flex-grow: 1;
    justify-content: flex-start;
    margin-left: 15px;
    font-weight: 500;
    font-size: 14px;
    color: #494949;

    & > div {
      height: 100%;
      align-items: center;
      display: flex;
    }
  }

  & .categoryHeaderExitButton {
    height: 100%;
    margin-right: 15px;

    & > div {
      flex-grow: 1;
      justify-content: flex-end;
      height: 100%;
      align-items: center;
      display: flex;
    }
  }

  @media (min-width: 1024px) {
    & .categoryHeaderExitButton {
      margin-right: 25px;
    }

    & .categoryHeaderLabel {
      margin-left: 25px;
      font-size: 20px;
    }
  }
`;

const CategoryDialogFooterInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & .categoryFooterActionCancel {
    margin-right: 15px;
  }

  & .categoryFooterActionCreate {
    margin-left: 15px;
  }
`;

const CategoryDialogContent = styled.div`
  height: calc(100% * 0.75);
  /* overflow-y: scroll; */
`;

const CategoryDialogFooter = styled.div`
  border-top: 1.5px solid #dfe0eb;
  height: calc(100% * 0.14);
`;

const CircleAroundIcon = styled.div`
  height: 28px;
  width: 28px;
  border-radius: 50%;
  background-color: #333;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & .MuiSvgIcon-root {
    font-size: 1.25rem;
  }

  @media (min-width: 1024px) {
    height: 32px;
    width: 32px;

    & .MuiSvgIcon-root {
      font-size: 1.35rem;
    }
  }
`;

interface Props extends CategoryDialogReduxProps {}

const CategoryDialog = ({
  categoryComponentClose,
  isCategoryOpen,
  activeCategories,
  categoryFields,
  changeField,
  createCategory,
  categoryNew,
  categoryUpdate,
  updateCategory,
  isBusy,
}: Props) => {
  const handleCategoryAction: () => void = () => {
    if (categoryNew) {
      createCategory();
    } else {
      updateCategory();
    }
  };

  let categoryNameCurrentValue: string = categoryFields?.category_name ?? "";

  let categoryParentCurrentValue: string =
    categoryFields?.category_parent ?? "";

  useDocumentBodyLock(isCategoryOpen!);

  return (
    <AtlasBackdrop
      closeFn={categoryComponentClose}
      onClose={categoryComponentClose}
      open={isCategoryOpen!}
    >
      <CategoryDialogRoot>
        <CategoryDialogContainer>
          <CategoryDialogInnerContainer>
            <CategoryDialogHeader>
              <CategoryDialogHeaderInner>
                <div className="categoryHeaderLabel">
                  <div>
                    {categoryNew
                      ? "Adicionar categoria"
                      : categoryUpdate
                      ? "Atualizar uma categoria existente"
                      : null}
                  </div>
                </div>

                <div className="categoryHeaderExitButton">
                  <div>
                    <CircleAroundIcon onClick={categoryComponentClose}>
                      <Tooltip title="Voltar">
                        <SvgIcon
                          style={{ position: "absolute", color: "#fff" }}
                          component={ArrowBackRounded}
                        />
                      </Tooltip>
                    </CircleAroundIcon>
                  </div>
                </div>
              </CategoryDialogHeaderInner>
            </CategoryDialogHeader>
            <CategoryDialogContent>
              <CategoryForm
                creating={categoryNew}
                updating={categoryUpdate}
                changeFieldFn={changeField}
                categoryFields={categoryFields}
                categories={activeCategories}
              />
            </CategoryDialogContent>
            <CategoryDialogFooter>
              <CategoryDialogFooterInner>
                <Button
                  onClick={categoryComponentClose}
                  variant="outlined"
                  className="categoryFooterActionCancel"
                >
                  Cancelar
                </Button>

                <Tooltip
                  arrow
                  title={
                    categoryNameCurrentValue.length <= 0 ||
                    categoryParentCurrentValue.length <= 0
                      ? "Preencha todos os campos para prosseguir"
                      : ""
                  }
                >
                  <span>
                    <Button
                      disabled={
                        (categoryNameCurrentValue.length <= 0 && categoryNew) ||
                        (categoryParentCurrentValue.length <= 0 &&
                          categoryNew) ||
                        isBusy
                      }
                      onClick={
                        categoryNew || categoryUpdate
                          ? handleCategoryAction
                          : () => null
                      }
                      color="primary"
                      variant="contained"
                      className="categoryFooterActionCreate"
                    >
                      {categoryNew
                        ? "Criar categoria"
                        : categoryUpdate
                        ? "Atualizar categoria"
                        : "Goodbye"}
                    </Button>
                  </span>
                </Tooltip>
              </CategoryDialogFooterInner>
            </CategoryDialogFooter>
          </CategoryDialogInnerContainer>
        </CategoryDialogContainer>
      </CategoryDialogRoot>
    </AtlasBackdrop>
  );
};

const mapStateToProps = (rootState: RootState) => ({
  isCategoryOpen: rootState.categoryDraft.isOpen,
  activeCategories: rootState.activeCollection.categories,
  categoryFields: rootState.categoryDraft.fields,
  categoryNew: rootState.categoryDraft.isCreating,
  categoryUpdate: rootState.categoryDraft.isUpdating,
  isBusy: rootState.categoryDraft.isBusy,
});

const mapDispatchToProps = {
  categoryComponentClose: categoryDraftComponentClose,
  changeField: categoryDraftFieldChange,
  createCategory: categoryCreate,
  updateCategory: categoryUpdate,
};

const categoryDialogConnector = connect(mapStateToProps, mapDispatchToProps);

export type CategoryDialogReduxProps = ConnectedProps<
  typeof categoryDialogConnector
>;

export default categoryDialogConnector(CategoryDialog);
