import { Dispatch } from "react";
import { RootStateOrAny } from "react-redux";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../..";
import { auth } from "../../../firebase";

import {
  AuthenticationLoginActionTypes,
  AuthenticationLogoutActionTypes,
  AuthenticationObserverSetupActionTypes,
  AUTHENTICATION_LOGIN_FAIL,
  AUTHENTICATION_LOGIN_START,
  AUTHENTICATION_LOGIN_SUCCESS,
  AUTHENTICATION_LOGOUT_FAIL,
  AUTHENTICATION_LOGOUT_START,
  AUTHENTICATION_LOGOUT_SUCCESS,
  AUTHENTICATION_OBSERVER_SETUP,
} from "../types";

export const loginUser = (
  email: string,
  password: string
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (
    dispatch: Dispatch<
      | AuthenticationLoginActionTypes
      | ReturnType<typeof setupAuthenticationObserver>
    >,
    getState: () => RootState
  ) => {
    dispatch({
      type: AUTHENTICATION_LOGIN_START,
    });

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userInfo) => {
        console.log(userInfo);

        localStorage.setItem(
          "atlas_auth",
          JSON.stringify({ authenticated: true })
        );

        dispatch(setupAuthenticationObserver());

        dispatch({
          type: AUTHENTICATION_LOGIN_SUCCESS,
        });
      })
      .catch((error) => {
        console.log(error);

        dispatch({
          type: AUTHENTICATION_LOGIN_FAIL,
        });
      });
  };
};

export const logoutUser = (): ThunkAction<
  void,
  RootStateOrAny,
  unknown,
  Action<string>
> => {
  return async (
    dispatch: Dispatch<AuthenticationLogoutActionTypes>,
    getState: () => RootState
  ) => {
    dispatch({
      type: AUTHENTICATION_LOGOUT_START,
    });

    auth
      .signOut()
      .then(() => {
        dispatch({ type: AUTHENTICATION_LOGOUT_SUCCESS });
        localStorage.removeItem("atlas_auth");
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: AUTHENTICATION_LOGOUT_FAIL });
      });
  };
};

export const setupAuthenticationObserver = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => {
  return async (
    dispatch: Dispatch<
      AuthenticationObserverSetupActionTypes | ReturnType<typeof logoutUser>
    >
  ) => {
    dispatch({
      type: AUTHENTICATION_OBSERVER_SETUP,
    });

    auth.onAuthStateChanged((observer) => {
      if (observer) {
        return;
      } else {
        console.log("not observed");
        localStorage.removeItem("atlas_auth");
      }
    });
  };
};

export const createUserWithFields = (
  email: string,
  password: string,
  displayName: string,
  userRole: string,
  firstName: string,
  lastName: string,
  userTitle: string
) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({ type: "ANY" });
  };
};
