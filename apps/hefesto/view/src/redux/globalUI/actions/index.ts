import {
  AlertSeverity,
  GLOBAL_NOTIFICATION_CUSTOM,
  SetGlobalNotificationActionTypes,
  SetLoadingActionTypes,
  SET_GLOBAL_NOTIFICATION_CLOSED,
  SET_GLOBAL_NOTIFICATION_OPEN,
  SET_LOADING_FALSE,
  SET_LOADING_TRUE,
} from "../types";

export const globalNotificationCustom = (
  notificationMessage: string,
  notificationSeverity: AlertSeverity
): SetGlobalNotificationActionTypes => {
  return {
    type: GLOBAL_NOTIFICATION_CUSTOM,
    payload: {
      notificationMessage: notificationMessage,
      notificationSeverity: notificationSeverity,
    },
  };
};

export const setLoadingTrue = (): SetLoadingActionTypes => {
  return {
    type: SET_LOADING_TRUE,
  };
};

export const setLoadingFalse = (): SetLoadingActionTypes => {
  return {
    type: SET_LOADING_FALSE,
  };
};

export const setGlobalNotificationOpen = (): SetGlobalNotificationActionTypes => {
  return {
    type: SET_GLOBAL_NOTIFICATION_OPEN,
  };
};

export const setGlobalNotificationClosed = (): SetGlobalNotificationActionTypes => {
  return {
    type: SET_GLOBAL_NOTIFICATION_CLOSED,
  };
};
