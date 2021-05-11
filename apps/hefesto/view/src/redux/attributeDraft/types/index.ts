export const ATTRIBUTE_DRAFT_DELETE_START = "ATTRIBUTE_DRAFT_DELETE_START";
export const ATTRIBUTE_DRAFT_DELETE_SUCCESS = "ATTRIBUTE_DRAFT_DELETE_SUCCESS";
export const ATTRIUBTE_DRAFT_DELETE_FAIL = "ATTRIBUTE_DRAFT_DELETE_FAIL";

interface AttributeDraftDeleteStart {
  type: typeof ATTRIBUTE_DRAFT_DELETE_START;
}

interface AttributeDraftDeleteSuccess {
  type: typeof ATTRIBUTE_DRAFT_DELETE_SUCCESS;
}

interface AttributeDraftDeleteFail {
  type: typeof ATTRIUBTE_DRAFT_DELETE_FAIL;
  payload: {
    errorMessage: string;
  };
}

export type AttributeDraftDeleteActionTypes =
  | AttributeDraftDeleteStart
  | AttributeDraftDeleteSuccess
  | AttributeDraftDeleteFail;

export const ATTRIBUTE_DRAFT_CREATE_START = "ATTRIBUTE_DRAFT_CREATE_START";
export const ATTRIBUTE_DRAFT_CREATE_SUCCESS = "ATTRIBUTE_DRAFT_CREATE_SUCCESS";
export const ATTRIBUTE_DRAFT_CREATE_FAIL = "ATTRIBUTE_DRAFT_CREATE_FAIL";

interface AttributeDraftCreateStart {
  type: typeof ATTRIBUTE_DRAFT_CREATE_START;
}

interface AttributeDraftCreateSuccess {
  type: typeof ATTRIBUTE_DRAFT_CREATE_SUCCESS;
}

interface AttributeDraftCreateFail {
  type: typeof ATTRIBUTE_DRAFT_CREATE_FAIL;
  payload: {
    errorMessage: string;
  };
}

export type AttributeDraftCreateActionTypes =
  | AttributeDraftCreateStart
  | AttributeDraftCreateSuccess
  | AttributeDraftCreateFail;

export const ATTRIBUTE_DRAFT_CHANGE_FIELD = "ATTRIBUTE_DRAFT_CHANGE_FIELD";

interface AttributeDraftChangeField {
  type: typeof ATTRIBUTE_DRAFT_CHANGE_FIELD;
  payload: {
    key: string;
    value: any;
  };
}

export type AttributeDraftChangeFieldActionTypes = AttributeDraftChangeField;

export const ATTRIBUTE_DRAFT_VISIBILITY_SHOW =
  "ATTRIBUTE_DRAFT_VISIBILITY_SHOW";
export const ATTRIBUTE_DRAFT_VISIBILITY_HIDE =
  "ATTRIBUTE_DRAFT_VISIBILITY_HIDE";

interface AttributeDraftVisibilityShow {
  type: typeof ATTRIBUTE_DRAFT_VISIBILITY_SHOW;
}

interface AttributeDraftVisibilityHide {
  type: typeof ATTRIBUTE_DRAFT_VISIBILITY_HIDE;
}

export type AttributeDraftVisibilityActionTypes =
  | AttributeDraftVisibilityShow
  | AttributeDraftVisibilityHide;

export const ATTRIBUTE_DRAFT_FIELD_SETUP = "ATTRIBUTE_DRAFT_FIELD_SETUP";
export const ATTRIBUTE_DRAFT_FIELD_DISCARD = "ATTRIBUTE_DRAFT_FIELD_DISCARD";

interface AttributeDraftFieldSetup {
  type: typeof ATTRIBUTE_DRAFT_FIELD_SETUP;
  payload: {
    fields: Record<string, { name: string; label: string; value: any }>;
  };
}

interface AttributeDraftFieldDiscard {
  type: typeof ATTRIBUTE_DRAFT_FIELD_DISCARD;
}

export type AttributeDraftFieldActionTypes =
  | AttributeDraftFieldSetup
  | AttributeDraftFieldDiscard;

export type AttributeDraftActionTypes =
  | AttributeDraftVisibilityActionTypes
  | AttributeDraftFieldActionTypes
  | AttributeDraftChangeFieldActionTypes
  | AttributeDraftCreateActionTypes
  | AttributeDraftDeleteActionTypes;

export interface AttributeDraftState {
  fields?: Record<string, { name: string; label: string; value: any }>;
}
