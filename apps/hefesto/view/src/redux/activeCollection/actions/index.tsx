import { DialogContent } from "@material-ui/core";
import { nanoid } from "nanoid";
import { Dispatch } from "react";
import { RootStateOrAny } from "react-redux";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../..";
import { Category, DashboardItem, DataCreationField } from "@hefesto/types";
import { db } from "../../../firebase";
import { categoryLabelFromUUIDPath } from "../../../helper/cateroyLabelFromUUIDPath";
import converToSlug from "../../../helper/convertToSlug";
import { GlobalStateActionTypes } from "../../globalUI/types";
import {
  ActiveCollectionAttributesObserverActionTypes,
  ActiveCollectionCategoriesObserverActionTypes,
  ActiveCollectionEntriesObserverActionTypes,
  ActiveCollectionEntryCreateActionTypes,
  ActiveCollectionEntryDeleteActionTypes,
  ActiveCollectionEntrySetupActionTypes,
  ActiveCollectionEntryUpdateActionTypes,
  ActiveCollectionEntryViewVisibilityActionTypes,
  ActiveCollectionState,
  ActiveContentActionTypes,
  ACTIVE_COLLECTION_ATTRIBUTES_OBSERVER_FAIL,
  ACTIVE_COLLECTION_ATTRIBUTES_OBSERVER_START,
  ACTIVE_COLLECTION_ATTRIBUTES_OBSERVER_SUCCESS,
  ACTIVE_COLLECTION_CATEGORIES_OBSERVER_FAIL,
  ACTIVE_COLLECTION_CATEGORIES_OBSERVER_START,
  ACTIVE_COLLECTION_CATEGORIES_OBSERVER_SUCCESS,
  ACTIVE_COLLECTION_ENTRIES_OBSERVER_FAIL,
  ACTIVE_COLLECTION_ENTRIES_OBSERVER_START,
  ACTIVE_COLLECTION_ENTRIES_OBSERVER_SUCCESS,
  ACTIVE_COLLECTION_ENTRY_CREATE_FAIL,
  ACTIVE_COLLECTION_ENTRY_CREATE_START,
  ACTIVE_COLLECTION_ENTRY_CREATE_SUCCESS,
  ACTIVE_COLLECTION_ENTRY_DELETE_FAIL,
  ACTIVE_COLLECTION_ENTRY_DELETE_START,
  ACTIVE_COLLECTION_ENTRY_DELETE_SUCCESS,
  ACTIVE_COLLECTION_ENTRY_SETUP_DISCARD,
  ACTIVE_COLLECTION_ENTRY_SETUP_NEW,
  ACTIVE_COLLECTION_ENTRY_SETUP_UPDATE,
  ACTIVE_COLLECTION_ENTRY_UPDATE_FAIL,
  ACTIVE_COLLECTION_ENTRY_UPDATE_START,
  ACTIVE_COLLECTION_ENTRY_UPDATE_SUCCESS,
  ACTIVE_COLLECTION_ENTRY_VIEW_VISIBILITY_HIDDEN,
  ACTIVE_COLLECTION_ENTRY_VIEW_VISIBILITY_SHOW,
  ACTIVE_COLLECTION_SET_FAIL,
  ACTIVE_COLLECTION_SET_START,
  ACTIVE_COLLECTION_SET_SUCCESS,
  SetActiveContentActionTypes,
  SET_ACTIVE_CONTENT,
} from "../types";

export const setActiveCollection = (
  activeCollection: DashboardItem
): SetActiveContentActionTypes => {
  return {
    type: SET_ACTIVE_CONTENT,
    payload: activeCollection,
  };
};

export const newEntryCreate = (
  data: any
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (
    dispatch: Dispatch<ActiveCollectionEntryCreateActionTypes>,
    getState: () => RootState
  ) => {
    dispatch({ type: ACTIVE_COLLECTION_ENTRY_CREATE_START });

    const { activeCollection } = getState();
    const transactionUUID: string = nanoid();
    let slug: string = "";

    activeCollection.fields.forEach((value, index) => {
      if (value.slug) {
        slug = converToSlug(data[value.name]);
      }
    });

    let newEntry: any = {};

    if (slug.length <= 0) {
      newEntry = { ...data, uuid: transactionUUID };
    } else {
      newEntry = { ...data, uuid: transactionUUID, slug: slug };
    }

    db.collection("collections")
      .doc(activeCollection.collectionRef)
      .collection("entries")
      .add(newEntry)
      .then(() => {
        dispatch({ type: ACTIVE_COLLECTION_ENTRY_CREATE_SUCCESS });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: ACTIVE_COLLECTION_ENTRY_CREATE_FAIL });
      });
  };
};

export const entryUpdate = (
  data: any
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (
    dispatch: Dispatch<ActiveCollectionEntryUpdateActionTypes>,
    getState: () => RootState
  ) => {
    dispatch({ type: ACTIVE_COLLECTION_ENTRY_UPDATE_START });

    const { activeCollection } = getState();

    const transactionUUID: string = activeCollection.entrySelected.entryUUID;
    let slug: string = "";

    activeCollection.fields.forEach((value, index) => {
      if (value.slug) {
        slug = converToSlug(data[value.name]);
      }
    });

    let updatedEntry: any = {};

    if (slug.length <= 0) {
      updatedEntry = { ...data };
    } else {
      updatedEntry = { ...data, slug: slug };
    }

    db.collection("collections")
      .doc(activeCollection.collectionRef)
      .collection("entries")
      .where("uuid", "==", transactionUUID)
      .get()
      .then((entrySnapshot) => {
        entrySnapshot.forEach((docRef) => {
          docRef.ref
            .update(updatedEntry)
            .then(() => {
              dispatch({
                type: ACTIVE_COLLECTION_ENTRY_UPDATE_SUCCESS,
              });
            })
            .catch((error) => {
              console.log(error);
              dispatch({
                type: ACTIVE_COLLECTION_ENTRY_UPDATE_FAIL,
                payload: {
                  error:
                    "Ocorreu um erro ao tentar atualizar o item selecionado.",
                },
              });
            });
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: ACTIVE_COLLECTION_ENTRY_UPDATE_FAIL,
          payload: {
            error:
              "Não foi possível encontrar o item selecionado no banco de dados, atualize a página e tente novamente.",
          },
        });
      });
  };
};

export const entryUpdateSetup = (
  values: any
): ActiveCollectionEntrySetupActionTypes => {
  return {
    type: ACTIVE_COLLECTION_ENTRY_SETUP_UPDATE,
    payload: values,
  };
};

export const newEntrySetup = (): ActiveCollectionEntrySetupActionTypes => {
  return {
    type: ACTIVE_COLLECTION_ENTRY_SETUP_NEW,
  };
};

export const newEntryDiscard = (): ActiveCollectionEntrySetupActionTypes => {
  return {
    type: ACTIVE_COLLECTION_ENTRY_SETUP_DISCARD,
  };
};

export const setupCategoriesObserver = (
  collectionRef: string
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (
    dispatch: Dispatch<ActiveCollectionCategoriesObserverActionTypes>,
    getState: () => RootState
  ) => {
    dispatch({
      type: ACTIVE_COLLECTION_CATEGORIES_OBSERVER_START,
    });

    try {
      db.collection("collections")
        .doc(collectionRef)
        .collection("categories")
        .onSnapshot((categoriesObserver) => {
          let categoriesData: Category[] = [];

          categoriesObserver.forEach((category) => {
            let categoryDataLocal: Category = category.data() as Category;

            categoriesData.push(categoryDataLocal);
          });

          categoriesData.forEach((category: Category, index: number) => {
            let labelArrayInternal: string[] = categoryLabelFromUUIDPath(
              category.uuid_path,
              categoriesData
            );

            category.label_path = labelArrayInternal;
          });

          dispatch({
            type: ACTIVE_COLLECTION_CATEGORIES_OBSERVER_SUCCESS,
            payload: [...categoriesData],
          });
        });
    } catch (error) {
      dispatch({ type: ACTIVE_COLLECTION_CATEGORIES_OBSERVER_FAIL });
    }
  };
};

export const setupAttributesObserver = (
  collectionRef: string
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (
    dispatch: Dispatch<ActiveCollectionAttributesObserverActionTypes>,
    getState: () => RootState
  ) => {
    dispatch({ type: ACTIVE_COLLECTION_ATTRIBUTES_OBSERVER_START });

    try {
      db.collection("collections")
        .doc(collectionRef)
        .collection("attributes")
        .onSnapshot((attributeObserver) => {
          let attributesDataBetter: Record<string, Array<any>> = {};

          attributeObserver.forEach((attribute) => {
            let attributeDataArrayValues: Array<any> = [
              ...(attribute.data()?.values ?? []),
            ];

            attributesDataBetter[attribute.id] = [...attributeDataArrayValues];
          });

          dispatch({
            type: ACTIVE_COLLECTION_ATTRIBUTES_OBSERVER_SUCCESS,
            payload: { ...attributesDataBetter },
          });
        });
    } catch (error) {
      dispatch({ type: ACTIVE_COLLECTION_ATTRIBUTES_OBSERVER_FAIL });
    }
  };
};

export const setupEntriesObserver = (
  collectionRef: string
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (
    dispatch: Dispatch<ActiveCollectionEntriesObserverActionTypes>,
    getState: () => RootState
  ) => {
    dispatch({
      type: ACTIVE_COLLECTION_ENTRIES_OBSERVER_START,
    });

    try {
      db.collection("collections")
        .doc(collectionRef)
        .collection("entries")
        .onSnapshot((entriesObserver) => {
          let snapShotData: Array<DataCreationField> = [];

          entriesObserver.forEach((doc) => {
            snapShotData.push(doc.data() as DataCreationField);
          });

          dispatch({
            type: ACTIVE_COLLECTION_ENTRIES_OBSERVER_SUCCESS,
            payload: [...snapShotData],
          });
        });
    } catch (error) {
      console.log(error);
      dispatch({ type: ACTIVE_COLLECTION_ENTRIES_OBSERVER_FAIL });
    }
  };
};

export const setupActiveCollection = (
  activeCollection: DashboardItem
): ThunkAction<void, RootStateOrAny, unknown, Action<string>> => {
  return async (
    dispatch: Dispatch<
      | ActiveContentActionTypes
      | GlobalStateActionTypes
      | ActiveCollectionCategoriesObserverActionTypes
      | ReturnType<typeof setupCategoriesObserver>
      | ReturnType<typeof setupAttributesObserver>
      | ReturnType<typeof setupEntriesObserver>
    >
  ) => {
    dispatch({
      type: ACTIVE_COLLECTION_SET_START,
    });

    let activeCollectionLocalState: ActiveCollectionState = {
      itemCategory: activeCollection.itemCategory,
      itemID: activeCollection.itemID,
      collectionRef: activeCollection.collectionRef,
      routerPath: activeCollection.routerPath,
      sidebarIcon: activeCollection.sidebarIcon,
      sidebarLabel: activeCollection.sidebarLabel,
      attributes: {},
      entries: [],
      categories: [],
      fields: activeCollection.fields,
      showID: activeCollection.showID ? activeCollection.showID : false,
      hasAttributes: activeCollection.hasAttributes
        ? activeCollection.hasAttributes
        : false,
      hasCategories: activeCollection.hasCategories
        ? activeCollection.hasCategories
        : false,

      isCreating: false,
      isUpdating: false,
      isViewing: false,
      entrySelected: {
        entryUUID: "",
        entryValues: "",
      },
    };

    if (activeCollection.fieldGroups) {
      activeCollectionLocalState.fieldGroups = activeCollection.fieldGroups;
    }

    if (activeCollection.hasAttributes) {
      activeCollectionLocalState.attributesFields =
        activeCollection.attributesFields;

      dispatch(setupAttributesObserver(activeCollection.collectionRef));
    }

    if (activeCollection.hasCategories) {
      dispatch(setupCategoriesObserver(activeCollection.collectionRef));
    }

    dispatch(setupEntriesObserver(activeCollection.collectionRef));

    dispatch({
      type: ACTIVE_COLLECTION_SET_SUCCESS,
      payload: activeCollectionLocalState,
    });
  };
};

export const entryViewShow = (): ActiveCollectionEntryViewVisibilityActionTypes => {
  return {
    type: ACTIVE_COLLECTION_ENTRY_VIEW_VISIBILITY_SHOW,
  };
};

export const entryViewHide = (): ActiveCollectionEntryViewVisibilityActionTypes => {
  return {
    type: ACTIVE_COLLECTION_ENTRY_VIEW_VISIBILITY_HIDDEN,
  };
};

export const entryDelete = (
  entryUUID: string
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (
    dispatch: Dispatch<ActiveCollectionEntryDeleteActionTypes>,
    getState: () => RootState
  ) => {
    const cachedState: RootState = getState();

    dispatch({
      type: ACTIVE_COLLECTION_ENTRY_DELETE_START,
    });

    db.collection("collections")
      .doc(cachedState.activeCollection.collectionRef)
      .collection("entries")
      .where("uuid", "==", entryUUID)
      .get()
      .then((documentResult) => {
        documentResult.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              dispatch({ type: ACTIVE_COLLECTION_ENTRY_DELETE_SUCCESS });
            })
            .catch((error) => {
              console.log(error);

              dispatch({
                type: ACTIVE_COLLECTION_ENTRY_DELETE_FAIL,
              });
            });
        });
      })
      .catch((error) => {
        console.log(error);

        dispatch({
          type: ACTIVE_COLLECTION_ENTRY_DELETE_FAIL,
        });
      });
  };
};
