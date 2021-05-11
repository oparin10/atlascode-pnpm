import {
  AuthenticationActionTypes,
  AuthenticationState,
  AUTHENTICATION_LOGIN_SUCCESS,
  AUTHENTICATION_LOGOUT_SUCCESS,
} from "../types";

export const authPersistence: { authenticated: boolean } = JSON.parse(
  localStorage.getItem("atlas_auth") || "{}"
);

export let isAuthPersisted: boolean = authPersistence.authenticated ?? false;

let initialState: AuthenticationState = {
  isAuth: false,
};

isAuthPersisted
  ? (initialState = { ...initialState, isAuth: true })
  : (initialState = { ...initialState, isAuth: false });

export const authenticationReducer = (
  state = initialState,
  action: AuthenticationActionTypes
): AuthenticationState => {
  switch (action.type) {
    case AUTHENTICATION_LOGIN_SUCCESS:
      return { ...state, isAuth: true };

    case AUTHENTICATION_LOGOUT_SUCCESS:
      return { ...state, isAuth: false };

    default:
      return state;
  }
};
