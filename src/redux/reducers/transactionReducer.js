
import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function transactionReducer(state = initialState.transactions, action) {
  switch (action.type) {
    case types.CREATE_TRANSACTION_SUCCESS:
      return [...state, { ...action.transaction }];
    case types.DELETE_TRANSACTION_OPTIMISTIC:
      return state.filter((transaction) => transaction.id !== action.transaction.id);
    case types.UPDATE_TRANSACTION_SUCCESS:
      return state.map((transaction) => {
        if (transaction.id === action.transaction.id) {
          return action.newtransaction; // ici le transaction recoit le nouveau cours
        } else {
          return transaction; // ici le cours reste intate
        }
      });

    case types.LOAD_TRANSACTION_SUCCESS:
      return action.transaction;

    default:
      return state;
  }
}