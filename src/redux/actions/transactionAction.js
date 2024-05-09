import * as types from "./actionTypes";
import * as transactionApi from "../../Api/transaction";
import { beginApiCall, apiCallError,endApiSuccess } from "./apiStatusActions";
import React, { Component } from "react";

export function createTransactionSuccess(transaction) {
  return { type: types.CREATE_TRANSACTION_SUCCESS, transaction };
}

export function updateTransactionSuccess(transaction) {
  return { type: types.UPDATE_TRANSACTION_SUCCESS, transaction};
}

export function deleteTransactionOptimistic(transaction) {
  return { type: types.DELETE_TRANSACTION_OPTIMISTIC, transaction };
}

export function loadTransactionSuccess(transaction) {
  return { type: types.LOAD_TRANSACTION_SUCCESS, transaction };
}

export function loadTransaction() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return transactionApi
      .gettransaction()
      .then((transaction) => {
        dispatch(loadTransactionSuccess(transaction));
         dispatch(endApiSuccess());
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveTransaction(transaction) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return transactionApi
      .saveTransaction(transaction)
      .then((savedTransaction) => {
        transaction.id
          ? dispatch(updateTransactionSuccess(savedTransaction))
          : dispatch(createTransactionSuccess(savedTransaction));
            dispatch(endApiSuccess());
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteTransaction(transaction) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteTransactionOptimistic(transaction));
     dispatch(endApiSuccess());
    return transaction.deleteTransaction(transaction.id);
  };
}


