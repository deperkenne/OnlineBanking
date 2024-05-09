import * as types from "./actionTypes";
import * as accountApi from "../../Api/accountApi"
import { beginApiCall, apiCallError,endApiSuccess } from "./apiStatusActions";

export function createAccountSuccess(account) {
  return { type: types.CREATE_ACCOUNT_SUCCESS, account };
}

export function updateAccountSuccess(account) {
  return { type: types.UPDATE_ACCOUNT_SUCCESS, account };
}

export function deleteAccountOptimistic(account) {
  return { type: types.DELETE_ACCOUNT_OPTIMISTIC, account };
}

export function loadAccountSuccess(account) {
  return { type: types.LOAD_ACCOUNT_SUCCESS, account };
}

export function loadAccount() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return accountApi
      .getAccount()
      .then((account) => {
        dispatch(loadAccountSuccess(account));
         dispatch(endApiSuccess());
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveAccount(account) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return accountApi
      .saveAccount(account)
      .then((savedAccount) => {
        account.id
          ? dispatch(updateAccountSuccess(savedAccount))
          : dispatch(createAccountSuccess(savedAccount));
           dispatch(endApiSuccess());
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteAccount(account) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteAccountOptimistic(account));
    return accountApi.deleteAccount(account.id).then(()=>{
          dispatch(endApiSuccess());
    });
  };
}
