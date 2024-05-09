
import * as types from "./actionTypes";
import * as userApi from "../../Api/userApi";
import { beginApiCall, apiCallError, endApiSuccess } from "./apiStatusActions";

export function loadUserSuccess(users) {
  return { type: types.LOAD_USER_SUCCESS, users };
}

export function loadUser() {
  return function (dispatch) {
    dispatch(beginApiCall()); // ici on informe le store qu'une action beginApiCall a ete execute et lorsqu'il est fait le status = 1
    return userApi
      .getUser()
      .then((users) => {
      
        dispatch(loadUserSuccess(users));
          dispatch(endApiSuccess());
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };

}