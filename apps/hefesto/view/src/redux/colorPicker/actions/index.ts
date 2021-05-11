import {
  ColorPickerVisibilityActionTypes,
  COLOR_PICKER_VISIBILITY_HIDDEN,
  COLOR_PICKER_VISIBILITY_SHOW,
} from "../types";

export const colorPickerOpen = (): ColorPickerVisibilityActionTypes => {
  return {
    type: COLOR_PICKER_VISIBILITY_SHOW,
  };
};

export const colorPickerHide = (): ColorPickerVisibilityActionTypes => {
  return {
    type: COLOR_PICKER_VISIBILITY_HIDDEN,
  };
};
