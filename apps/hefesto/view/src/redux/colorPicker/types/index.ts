export const COLOR_PICKER_VISIBILITY_SHOW = "COLOR_PICKER_VISIBILITY_SHOW";
export const COLOR_PICKER_VISIBILITY_HIDDEN = "COLOR_PICKER_VISIBILITY_HIDDEN";

interface ColorPickerVisibilityShow {
  type: typeof COLOR_PICKER_VISIBILITY_SHOW;
}

interface ColorPickerVisibilityHidden {
  type: typeof COLOR_PICKER_VISIBILITY_HIDDEN;
}

export type ColorPickerVisibilityActionTypes =
  | ColorPickerVisibilityHidden
  | ColorPickerVisibilityShow;

export interface ColorPickerState {
  isOpen: boolean;
}

export type ColorPickerActionTypes = ColorPickerVisibilityActionTypes;
