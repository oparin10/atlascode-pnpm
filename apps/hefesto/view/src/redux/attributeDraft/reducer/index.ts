import {
  AttributeDraftActionTypes,
  AttributeDraftState,
  ATTRIBUTE_DRAFT_CHANGE_FIELD,
  ATTRIBUTE_DRAFT_FIELD_DISCARD,
  ATTRIBUTE_DRAFT_FIELD_SETUP,
} from "../types";

const initialState: AttributeDraftState = {};

export const attributeDraftReducer = (
  state = initialState,
  action: AttributeDraftActionTypes
): AttributeDraftState => {
  switch (action.type) {
    case ATTRIBUTE_DRAFT_CHANGE_FIELD:
      return {
        ...state,
        fields: {
          ...state.fields!,
          [action.payload.key]: {
            ...state.fields![action.payload.key],
            value: action.payload.value,
          },
        },
      };

    case ATTRIBUTE_DRAFT_FIELD_SETUP:
      return { ...state, fields: { ...action.payload.fields } };

    case ATTRIBUTE_DRAFT_FIELD_DISCARD:
      return initialState;

    default:
      return state;
  }
};
