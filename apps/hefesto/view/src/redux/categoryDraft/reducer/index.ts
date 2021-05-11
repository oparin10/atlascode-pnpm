import {
  CategoryDraftActionTypes,
  CategoryDraftState,
  CATEGORY_DRAFT_CHANGE_FIELD,
  CATEGORY_DRAFT_CREATE_FAIL,
  CATEGORY_DRAFT_CREATE_START,
  CATEGORY_DRAFT_CREATE_SUCCESS,
  CATEGORY_DRAFT_DELETE_FAIL,
  CATEGORY_DRAFT_DELETE_START,
  CATEGORY_DRAFT_DELETE_SUCCESS,
  CATEGORY_DRAFT_NEW_FIELD_DISCARD,
  CATEGORY_DRAFT_NEW_FIELD_SETUP,
  CATEGORY_DRAFT_UPDATE_FAIL,
  CATEGORY_DRAFT_UPDATE_FIELD_DISCARD,
  CATEGORY_DRAFT_UPDATE_FIELD_SETUP,
  CATEGORY_DRAFT_UPDATE_START,
  CATEGORY_DRAFT_UPDATE_SUCCESS,
  CATEGORY_DRAFT_VISIBILITY_HIDE,
  CATEGORY_DRAFT_VISIBILITY_SHOW,
} from "../types";

const initialState: CategoryDraftState = {
  isCreating: false,
  isDeleting: false,
  isOpen: false,
  isUpdating: false,
  isBusy: false,
};

export const categoryDraftReducer = (
  state = initialState,
  action: CategoryDraftActionTypes
): CategoryDraftState => {
  switch (action.type) {
    case CATEGORY_DRAFT_UPDATE_START:
      return { ...state, isBusy: true };

    case CATEGORY_DRAFT_DELETE_START:
      return { ...state, isBusy: true };

    case CATEGORY_DRAFT_CREATE_START:
      return { ...state, isBusy: true };

    case CATEGORY_DRAFT_UPDATE_FAIL:
      return { ...state, isBusy: false };

    case CATEGORY_DRAFT_DELETE_FAIL:
      return { ...state, isBusy: false };

    case CATEGORY_DRAFT_CREATE_FAIL:
      return { ...state, isBusy: false };

    case CATEGORY_DRAFT_UPDATE_SUCCESS:
      return { ...initialState };

    case CATEGORY_DRAFT_CREATE_SUCCESS:
      return { ...initialState };

    case CATEGORY_DRAFT_DELETE_SUCCESS:
      return { ...initialState };

    case CATEGORY_DRAFT_NEW_FIELD_SETUP:
      return {
        ...initialState,
        isOpen: true,
        isCreating: true,
        fields: {
          category_name: action.payload.fields.category_name,
          category_parent: action.payload.fields.category_parent,
        },
      };

    case CATEGORY_DRAFT_UPDATE_FIELD_SETUP:
      return {
        ...initialState,
        isOpen: true,
        isUpdating: true,
        fields: {
          category_name: action.payload.fields.category_name,
          category_uuid: action.payload.fields.category_uuid,
        },
      };

    case CATEGORY_DRAFT_UPDATE_FIELD_DISCARD:
      return initialState;

    case CATEGORY_DRAFT_NEW_FIELD_DISCARD:
      return initialState;

    case CATEGORY_DRAFT_CHANGE_FIELD:
      return {
        ...state,
        fields: {
          ...state.fields!,
          [action.payload.key]: action.payload.value,
        },
      };

    case CATEGORY_DRAFT_VISIBILITY_SHOW:
      return { ...state, isOpen: true };

    case CATEGORY_DRAFT_VISIBILITY_HIDE:
      return { ...state, isOpen: false };

    default:
      return state;
  }
};
