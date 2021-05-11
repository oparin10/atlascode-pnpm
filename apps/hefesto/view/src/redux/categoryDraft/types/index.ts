// Category field change action types start
export const CATEGORY_DRAFT_CHANGE_FIELD = "CATEGORY_DRAFT_CHANGE_FIELD";

export interface CategoryDraftChangeField {
  type: typeof CATEGORY_DRAFT_CHANGE_FIELD;
  payload: {
    key: string;
    value: any;
  };
}

export type CategoryDraftChangeFieldActionTypes = CategoryDraftChangeField;

// Category field change action types ends

// Category update field setup action types start

export const CATEGORY_DRAFT_UPDATE_FIELD_SETUP =
  "CATEGORY_DRAFT_UPDATE_FIELD_SETUP";
export const CATEGORY_DRAFT_UPDATE_FIELD_DISCARD =
  "CATEGORY_DRAFT_UPDATE_FIELD_DISCARD";

interface CategoryDraftUpdateFieldSetup {
  type: typeof CATEGORY_DRAFT_UPDATE_FIELD_SETUP;
  payload: {
    fields: {
      category_uuid: string;
      category_name: string;
    };
  };
}

interface CategoryDraftUpdateFieldDiscard {
  type: typeof CATEGORY_DRAFT_UPDATE_FIELD_DISCARD;
}

export type CategoryDraftUpdateFieldActionTypes =
  | CategoryDraftUpdateFieldSetup
  | CategoryDraftUpdateFieldDiscard;

// Category update field setup action types end

// Category new field setup action types start

export const CATEGORY_DRAFT_NEW_FIELD_SETUP = "CATEGORY_DRAFT_NEW_FIELD_SETUP";
export const CATEGORY_DRAFT_NEW_FIELD_DISCARD =
  "CATEGORY_DRAFT_NEW_FIELD_DISCARD";

interface CategoryDraftNewFieldSetup {
  type: typeof CATEGORY_DRAFT_NEW_FIELD_SETUP;
  payload: {
    fields: {
      category_name: string;
      category_parent: string;
    };
  };
}

interface CategoryDraftNewFieldDiscard {
  type: typeof CATEGORY_DRAFT_NEW_FIELD_DISCARD;
}

export type CategoryDraftNewFieldActionTypes =
  | CategoryDraftNewFieldSetup
  | CategoryDraftNewFieldDiscard;

// Category new field setup action types end

// Category component visibility action types start

export const CATEGORY_DRAFT_VISIBILITY_SHOW = "CATEGORY_DRAFT_VISIBILITY_SHOW";
export const CATEGORY_DRAFT_VISIBILITY_HIDE = "CATEGORY_DRAFT_VISIBILITY_HIDE";

interface CategoryDraftVisibilityShow {
  type: typeof CATEGORY_DRAFT_VISIBILITY_SHOW;
}

interface CategoryDraftVisibilityHide {
  type: typeof CATEGORY_DRAFT_VISIBILITY_HIDE;
}

export type CategoryDraftVisibilityActionTypes =
  | CategoryDraftVisibilityShow
  | CategoryDraftVisibilityHide;

// Category component visibility action types end

// Category Create action types start

export const CATEGORY_DRAFT_CREATE_START = "CATEGORY_DRAFT_CREATE_START";
export const CATEGORY_DRAFT_CREATE_SUCCESS = "CATEGORY_DRAFT_CREATE_SUCCESS";
export const CATEGORY_DRAFT_CREATE_FAIL = "CATEGORY_DRAFT_CREATE_FAIL";

interface CategoryDraftCreateStart {
  type: typeof CATEGORY_DRAFT_CREATE_START;
}

interface CategoryDraftCreateSuccess {
  type: typeof CATEGORY_DRAFT_CREATE_SUCCESS;
}

interface CategoryDraftCreateFail {
  type: typeof CATEGORY_DRAFT_CREATE_FAIL;
}

export type CategoryDraftCreateActionTypes =
  | CategoryDraftCreateStart
  | CategoryDraftCreateSuccess
  | CategoryDraftCreateFail;

//   Category Create action types end

// Category Update action types start

export const CATEGORY_DRAFT_UPDATE_START = "CATEGORY_DRAFT_UPDATE_START";
export const CATEGORY_DRAFT_UPDATE_SUCCESS = "CATEGORY_DRAFT_UPDATE_SUCCESS";
export const CATEGORY_DRAFT_UPDATE_FAIL = "CATEGORY_DRAFT_UPDATE_FAIL";

interface CategoryDraftUpdateStart {
  type: typeof CATEGORY_DRAFT_UPDATE_START;
}

interface CategoryDraftUpdateSuccess {
  type: typeof CATEGORY_DRAFT_UPDATE_SUCCESS;
}

interface CategoryDraftUpdateFail {
  type: typeof CATEGORY_DRAFT_UPDATE_FAIL;
}

export type CategoryDraftUpdateActionTypes =
  | CategoryDraftUpdateStart
  | CategoryDraftUpdateSuccess
  | CategoryDraftUpdateFail;

// Category Update action types end

//  Category Delete action types start

export const CATEGORY_DRAFT_DELETE_START = "CATEGORY_DRAFT_DELETE_START";
export const CATEGORY_DRAFT_DELETE_SUCCESS = "CATEGORY_DRAFT_DELETE_SUCCESS";
export const CATEGORY_DRAFT_DELETE_FAIL = "CATEGORY_DRAFT_DELETE_FAIL";

interface CategoryDraftDeleteStart {
  type: typeof CATEGORY_DRAFT_DELETE_START;
}

interface CategoryDraftDeleteSuccess {
  type: typeof CATEGORY_DRAFT_DELETE_SUCCESS;
}

interface CategoryDraftDeleteFail {
  type: typeof CATEGORY_DRAFT_DELETE_FAIL;
  payload: {
    errorMessage: string;
  };
}

export type CategoryDraftDeleteActionTypes =
  | CategoryDraftDeleteStart
  | CategoryDraftDeleteSuccess
  | CategoryDraftDeleteFail;

// Category Delete action types end

// Categoy draft action types start

export type CategoryDraftActionTypes =
  | CategoryDraftCreateActionTypes
  | CategoryDraftUpdateActionTypes
  | CategoryDraftDeleteActionTypes
  | CategoryDraftVisibilityActionTypes
  | CategoryDraftNewFieldActionTypes
  | CategoryDraftUpdateFieldActionTypes
  | CategoryDraftChangeFieldActionTypes;

//   Category draft action types end

// Category draft state

export interface CategoryDraftState {
  isOpen: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  isBusy: boolean;
  fields?: {
    category_uuid?: string;
    category_name: string;
    category_parent?: string;
  };
}

// ROOT LEVEL CATEGORY UUID

export const ROOT_LEVEL_CATEGORY = "f3ee0bf5-b95d-4896-b3d8-b5b1a13f65fe";
