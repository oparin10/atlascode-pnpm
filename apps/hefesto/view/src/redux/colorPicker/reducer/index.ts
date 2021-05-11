import {
  ColorPickerActionTypes,
  ColorPickerState,
  COLOR_PICKER_VISIBILITY_HIDDEN,
  COLOR_PICKER_VISIBILITY_SHOW,
} from "../types";

let initialState: ColorPickerState = {
  isOpen: false,
};

export const colorPickerReducer = (
  state = initialState,
  action: ColorPickerActionTypes
): ColorPickerState => {
  switch (action.type) {
    case COLOR_PICKER_VISIBILITY_SHOW:
      return { ...state, isOpen: true };

    case COLOR_PICKER_VISIBILITY_HIDDEN:
      return { ...state, isOpen: false };

    default:
      return state;
  }
};
