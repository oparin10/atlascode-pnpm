import { nanoid } from "nanoid";
import { Dispatch } from "react";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../..";
import { Category } from "@hefesto/types";
import { db } from "../../../firebase";
import {
  CategoryDraftChangeFieldActionTypes,
  CategoryDraftDeleteActionTypes,
  CategoryDraftUpdateActionTypes,
  CATEGORY_DRAFT_CHANGE_FIELD,
  CATEGORY_DRAFT_CREATE_FAIL,
  CATEGORY_DRAFT_CREATE_SUCCESS,
  CATEGORY_DRAFT_DELETE_FAIL,
  CATEGORY_DRAFT_DELETE_START,
  CATEGORY_DRAFT_DELETE_SUCCESS,
  CATEGORY_DRAFT_UPDATE_FAIL,
  CATEGORY_DRAFT_UPDATE_START,
  CATEGORY_DRAFT_UPDATE_SUCCESS,
  ROOT_LEVEL_CATEGORY,
} from "../types";

import {
  CategoryDraftCreateActionTypes,
  CategoryDraftNewFieldActionTypes,
  CategoryDraftUpdateFieldActionTypes,
  CategoryDraftVisibilityActionTypes,
  CATEGORY_DRAFT_CREATE_START,
  CATEGORY_DRAFT_NEW_FIELD_DISCARD,
  CATEGORY_DRAFT_NEW_FIELD_SETUP,
  CATEGORY_DRAFT_UPDATE_FIELD_DISCARD,
  CATEGORY_DRAFT_UPDATE_FIELD_SETUP,
  CATEGORY_DRAFT_VISIBILITY_HIDE,
  CATEGORY_DRAFT_VISIBILITY_SHOW,
} from "../types";

export const categoryDraftComponentOpen = (): CategoryDraftVisibilityActionTypes => {
  return {
    type: CATEGORY_DRAFT_VISIBILITY_SHOW,
  };
};

export const categoryDraftComponentClose = (): CategoryDraftVisibilityActionTypes => {
  return {
    type: CATEGORY_DRAFT_VISIBILITY_HIDE,
  };
};

export const categoryDraftUpdateFieldSetup = (
  categoryUUID: string,
  categoryName: string
): CategoryDraftUpdateFieldActionTypes => {
  return {
    type: CATEGORY_DRAFT_UPDATE_FIELD_SETUP,
    payload: {
      fields: {
        category_name: categoryName,
        category_uuid: categoryUUID,
      },
    },
  };
};

export const categoryDraftUpdateFieldDiscard = (): CategoryDraftUpdateFieldActionTypes => {
  return {
    type: CATEGORY_DRAFT_UPDATE_FIELD_DISCARD,
  };
};

export const categoryDraftCreateFieldSetup = (): CategoryDraftNewFieldActionTypes => {
  return {
    type: CATEGORY_DRAFT_NEW_FIELD_SETUP,
    payload: {
      fields: {
        category_name: "",
        category_parent: "",
      },
    },
  };
};

export const categoryDraftNewFieldDiscard = (): CategoryDraftNewFieldActionTypes => {
  return {
    type: CATEGORY_DRAFT_NEW_FIELD_DISCARD,
  };
};

// Category draft field change methods

export const categoryDraftFieldChange = (
  key: string,
  value: any
): CategoryDraftChangeFieldActionTypes => {
  return {
    type: CATEGORY_DRAFT_CHANGE_FIELD,
    payload: {
      key: key,
      value: value,
    },
  };
};

// Async CRUD operations

export const categoryCreate = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => {
  return async (
    dispatch: Dispatch<CategoryDraftCreateActionTypes>,
    getState: () => RootState
  ) => {
    dispatch({
      type: CATEGORY_DRAFT_CREATE_START,
    });

    const cachedState: RootState = getState();
    const collectionRef: string = cachedState.activeCollection.collectionRef;

    const transactionUUID: string = nanoid();
    let UUIDpath: string[] = [];
    let categoryRoot: boolean;
    let categoryLabel: string;
    let categoryParent: string | undefined | null;

    let newCategory: Category;

    if (
      cachedState.categoryDraft.fields!.category_parent === ROOT_LEVEL_CATEGORY
    ) {
      categoryRoot = true;
      categoryParent = null;
      UUIDpath.push(transactionUUID);
      categoryLabel = cachedState.categoryDraft.fields!.category_name;
    } else {
      let categoryParentLocal: Category[] = cachedState.activeCollection.categories!.filter(
        (category: Category, index: number) => {
          return (
            category.uuid === cachedState.categoryDraft.fields!.category_parent
          );
        }
      );

      categoryRoot = false;
      categoryParent = cachedState.categoryDraft.fields!.category_parent;
      UUIDpath.push(transactionUUID);

      UUIDpath.unshift(...categoryParentLocal[0].uuid_path);

      categoryLabel = cachedState.categoryDraft.fields!.category_name;
    }

    newCategory = {
      uuid: transactionUUID,
      label: categoryLabel,
      parent: categoryParent,
      uuid_path: UUIDpath,
      root: categoryRoot,
    };

    db.collection("collections")
      .doc(collectionRef)
      .collection("categories")
      .add(newCategory)
      .then(() => {
        dispatch({
          type: CATEGORY_DRAFT_CREATE_SUCCESS,
        });
      })
      .catch((error) => {
        dispatch({
          type: CATEGORY_DRAFT_CREATE_FAIL,
        });
      });
  };
};

export const categoryDelete = (
  categoryUUID: string,
  collectionRef: string
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (
    dispatch: Dispatch<CategoryDraftDeleteActionTypes>,
    getState: () => RootState
  ) => {
    dispatch({
      type: CATEGORY_DRAFT_DELETE_START,
    });

    const cachedState = getState();
    const categoriesState: Category[] = cachedState.activeCollection
      .categories!;
    let relatedCategories: string[] = [];

    let categoryInternal: Category[] = [];

    for (let i = 0; i < categoriesState.length; i++) {
      const category = categoriesState[i];

      if (category.uuid === categoryUUID) {
        categoryInternal.push(category);
      }
    }

    for (let j = 0; j < categoriesState.length; j++) {
      const category = categoriesState[j];

      if (category.uuid_path.includes(categoryInternal[0].uuid)) {
        relatedCategories.push(category.uuid);
      }
    }

    if (relatedCategories.length >= 2) {
      dispatch({
        type: CATEGORY_DRAFT_DELETE_FAIL,
        payload: {
          errorMessage:
            "Esta categoria possui subcategorias. Delete suas subcategorias antes de deletá-la.",
        },
      });

      return;
    }

    db.collection("collections")
      .doc(collectionRef)
      .collection("categories")
      .where("uuid", "==", categoryUUID)
      .get()
      .then((fetchedCategory) => {
        fetchedCategory.forEach((category) => {
          category.ref
            .delete()
            .then(() => {
              dispatch({
                type: CATEGORY_DRAFT_DELETE_SUCCESS,
              });
            })
            .catch((error) => {
              dispatch({
                type: CATEGORY_DRAFT_DELETE_FAIL,
                payload: {
                  errorMessage:
                    "Houve um erro ao tentar deletar esta categoria.",
                },
              });
            });
        });
      })
      .catch((error) => {
        dispatch({
          type: CATEGORY_DRAFT_DELETE_FAIL,
          payload: {
            errorMessage:
              "Categoria não encontrada, atualize a página e tente novamente.",
          },
        });
      });
  };
};

export const categoryUpdate = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => {
  return async (
    dispatch: Dispatch<CategoryDraftUpdateActionTypes>,
    getState: () => RootState
  ) => {
    dispatch({
      type: CATEGORY_DRAFT_UPDATE_START,
    });

    const cachedState: RootState = getState();
    const collectionRef: string = cachedState.activeCollection.collectionRef;
    let newCategoryLabel: string = cachedState.categoryDraft.fields!
      .category_name;
    let categoryUUID: string = cachedState.categoryDraft.fields!.category_uuid!;

    db.collection("collections")
      .doc(collectionRef)
      .collection("categories")
      .where("uuid", "==", categoryUUID)
      .get()
      .then((categoryData) => {
        categoryData.forEach((category) => {
          category.ref
            .update({
              label: newCategoryLabel,
            })
            .then(() => {
              dispatch({
                type: CATEGORY_DRAFT_UPDATE_SUCCESS,
              });
            })
            .catch((error) => {
              dispatch({
                type: CATEGORY_DRAFT_UPDATE_FAIL,
              });
            });
        });
      })
      .catch((error) => {
        dispatch({
          type: CATEGORY_DRAFT_UPDATE_FAIL,
        });
      });
  };
};
