

import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function accountReducer(state = initialState.accounts, action) {
  switch (action.type) {
    case types.CREATE_ACCOUNT_SUCCESS:
      return [...state, { ...action.account }];
    case types.DELETE_ACCOUNT_OPTIMISTIC:
      return state.filter((account) => account.id !== action.payload);
    case types.UPDATE_ACCOUNT_SUCCESS:
      return state.map((account) => {
        if (account.id === action.newcourse.id) {
          return action.newcourse; // ici le cours recoit le nouveau cours 
        } else {
          return account; // ici le cours reste intate
        }
      });

    case types.LOAD_ACCOUNT_SUCCESS:
      return action.account;

    default:
      return state;
  }
}