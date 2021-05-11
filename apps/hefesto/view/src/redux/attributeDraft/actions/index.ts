import { Label } from "@material-ui/icons";
import { Dispatch } from "react";
import { RootStateOrAny } from "react-redux";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../..";
import { db, fieldValues } from "../../../firebase";
import {
  AttributeDraftChangeFieldActionTypes,
  AttributeDraftCreateActionTypes,
  AttributeDraftDeleteActionTypes,
  AttributeDraftFieldActionTypes,
  AttributeDraftVisibilityActionTypes,
  ATTRIBUTE_DRAFT_CHANGE_FIELD,
  ATTRIBUTE_DRAFT_CREATE_FAIL,
  ATTRIBUTE_DRAFT_CREATE_START,
  ATTRIBUTE_DRAFT_CREATE_SUCCESS,
  ATTRIBUTE_DRAFT_DELETE_START,
  ATTRIBUTE_DRAFT_DELETE_SUCCESS,
  ATTRIBUTE_DRAFT_FIELD_DISCARD,
  ATTRIBUTE_DRAFT_FIELD_SETUP,
  ATTRIBUTE_DRAFT_VISIBILITY_HIDE,
  ATTRIBUTE_DRAFT_VISIBILITY_SHOW,
  ATTRIUBTE_DRAFT_DELETE_FAIL,
} from "../types";

export const attributeDraftComponentShow = (): AttributeDraftVisibilityActionTypes => {
  return {
    type: ATTRIBUTE_DRAFT_VISIBILITY_SHOW,
  };
};

export const attributeDraftComponentHide = (): AttributeDraftVisibilityActionTypes => {
  return {
    type: ATTRIBUTE_DRAFT_VISIBILITY_HIDE,
  };
};

export const attributeDraftFieldDiscard = (): AttributeDraftFieldActionTypes => {
  return {
    type: ATTRIBUTE_DRAFT_FIELD_DISCARD,
  };
};

export const attributeDraftFieldSetup = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => {
  return async (
    dispatch: Dispatch<AttributeDraftFieldActionTypes>,
    getState: () => RootState
  ) => {
    let { activeCollection }: RootState = getState();

    let attributeFieldsLocal: Record<
      string,
      { name: string; label: string; value: any }
    > = {};

    for (const attributeField of activeCollection.attributesFields!) {
      attributeFieldsLocal[attributeField.name] = {
        name: attributeField.name,
        label: attributeField.label,
        value: "",
      };
    }

    dispatch({
      type: ATTRIBUTE_DRAFT_FIELD_SETUP,
      payload: {
        fields: attributeFieldsLocal,
      },
    });
  };
};

export const attributeDraftChangeField = (
  key: string,
  value: any
): AttributeDraftChangeFieldActionTypes => {
  return {
    type: ATTRIBUTE_DRAFT_CHANGE_FIELD,
    payload: {
      key: key,
      value: value,
    },
  };
};

export const attributeDelete = (
  attributeName: string,
  valueToRemove: any
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (
    dispatch: Dispatch<AttributeDraftDeleteActionTypes>,
    getState: () => RootState
  ) => {
    const { activeCollection }: RootState = getState();

    dispatch({
      type: ATTRIBUTE_DRAFT_DELETE_START,
    });

    db.collection("collections")
      .doc(activeCollection.collectionRef)
      .collection("attributes")
      .doc(attributeName)
      .update({
        values: fieldValues.arrayRemove(valueToRemove),
      })
      .then(() => {
        dispatch({
          type: ATTRIBUTE_DRAFT_DELETE_SUCCESS,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: ATTRIUBTE_DRAFT_DELETE_FAIL,
          payload: {
            errorMessage: error.message,
          },
        });
      });
  };
};

export const attributeCreate = (
  attributeName: string,
  value: any
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (
    dispatch: Dispatch<AttributeDraftCreateActionTypes>,
    getState: () => RootState
  ) => {
    const { activeCollection }: RootState = getState();

    dispatch({
      type: ATTRIBUTE_DRAFT_CREATE_START,
    });

    db.collection("collections")
      .doc(activeCollection.collectionRef)
      .collection("attributes")
      .doc(attributeName)
      .get()
      .then((attributeResult) => {
        let existingAttributes: Array<string> =
          attributeResult.data()?.values ?? [];

        existingAttributes.push(value);

        attributeResult.ref
          .set({
            values: existingAttributes,
          })
          .then(() => {
            dispatch({
              type: ATTRIBUTE_DRAFT_CREATE_SUCCESS,
            });
          })
          .catch((error) => {
            console.log(error);
            dispatch({
              type: ATTRIBUTE_DRAFT_CREATE_FAIL,
              payload: {
                errorMessage: "Erro ao tentar atualizar a lista de atributos",
              },
            });
          });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: ATTRIBUTE_DRAFT_CREATE_FAIL,
          payload: {
            errorMessage: "Houve um erro ao tentar encontrar o atributo",
          },
        });
      });
  };
};
