export const SET_GLOBAL_NOTIFICATION_OPEN = "SET_GLOBAL_NOTIFICATION_OPEN";
export const SET_GLOBAL_NOTIFICATION_CLOSED = "SET_GLOBAL_NOTIFICATION_CLOSED";
export const GLOBAL_NOTIFICATION_CUSTOM = "GLOBAL_NOTIFICATION_CUSTOM";

interface GlobalNotificationCustomPayload {
  notificationMessage: string;
  notificationSeverity: AlertSeverity;
}

export interface GlobalNotificationCustom {
  type: typeof GLOBAL_NOTIFICATION_CUSTOM;
  payload: GlobalNotificationCustomPayload;
}

interface SetGlobalNotificationClosed {
  type: typeof SET_GLOBAL_NOTIFICATION_CLOSED;
}

interface SetGlobalNotificationOpen {
  type: typeof SET_GLOBAL_NOTIFICATION_OPEN;
}
export const SET_LOADING_TRUE = "SET_LOADING_TRUE";
export const SET_LOADING_FALSE = "SET_LOADING_FALSE";
export type SetGlobalNotificationActionTypes =
  | SetGlobalNotificationClosed
  | SetGlobalNotificationOpen
  | GlobalNotificationCustom;

interface SetLoadingTrue {
  type: typeof SET_LOADING_TRUE;
}

interface SetLoadingFalse {
  type: typeof SET_LOADING_FALSE;
}

export type SetLoadingActionTypes = SetLoadingTrue | SetLoadingFalse;

export type GlobalStateActionTypes =
  | SetLoadingActionTypes
  | SetGlobalNotificationActionTypes;

export interface GlobalUIState {
  isLoading: boolean;
  notificationOpen: boolean;
  notificationMessage: string;
  notificationSeverity: AlertSeverity;
}

export type AlertSeverity = "error" | "warning" | "info" | "success";
