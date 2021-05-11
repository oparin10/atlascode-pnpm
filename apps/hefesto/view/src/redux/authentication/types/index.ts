export const AUTHENTICATION_OBSERVER_SETUP = "AUTHENTICATION_OBSERVER_SETUP";

interface AuthenticationObserverSetup {
  type: typeof AUTHENTICATION_OBSERVER_SETUP;
}

export type AuthenticationObserverSetupActionTypes = AuthenticationObserverSetup;

export const AUTHENTICATION_LOGOUT_START = "AUTHENTICATION_LOGOUT_START";
export const AUTHENTICATION_LOGOUT_SUCCESS = "AUTHENTICATION_LOGOUT_SUCCESS";
export const AUTHENTICATION_LOGOUT_FAIL = "AUTHENTICATION_LOGOUT_FAIL";

interface AuthenticationLogoutStart {
  type: typeof AUTHENTICATION_LOGOUT_START;
}

interface AuthenticationLogoutSuccess {
  type: typeof AUTHENTICATION_LOGOUT_SUCCESS;
}

interface AuthenticationLogoutFail {
  type: typeof AUTHENTICATION_LOGOUT_FAIL;
}

export type AuthenticationLogoutActionTypes =
  | AuthenticationLogoutStart
  | AuthenticationLogoutSuccess
  | AuthenticationLogoutFail;

export const AUTHENTICATION_LOGIN_START = "AUTHENTICATION_LOGIN_START";
export const AUTHENTICATION_LOGIN_SUCCESS = "AUTHENTICATION_LOGIN_SUCCESS";
export const AUTHENTICATION_LOGIN_FAIL = "AUTHENTICATION_LOGIN_FAIL";

interface AuthenticationLoginStart {
  type: typeof AUTHENTICATION_LOGIN_START;
}

interface AuthenticationLoginSuccess {
  type: typeof AUTHENTICATION_LOGIN_SUCCESS;
}

interface AuthenticationLoginFail {
  type: typeof AUTHENTICATION_LOGIN_FAIL;
}

export type AuthenticationLoginActionTypes =
  | AuthenticationLoginStart
  | AuthenticationLoginSuccess
  | AuthenticationLoginFail;

export type AuthenticationActionTypes =
  | AuthenticationLoginActionTypes
  | AuthenticationLogoutActionTypes
  | AuthenticationObserverSetupActionTypes;

export interface AuthenticationState {
  isAuth: boolean;
}
