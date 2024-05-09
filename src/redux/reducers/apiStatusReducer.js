import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function apiStatusReducer(state = initialState.apiCallInprogr, action) {
  switch (action.type) {
    case types.BEGIN_API_CALL:
      return state + 1;
    case types.END_API_SUCCESS:
      return state-1 ;

    default:
      return state;
  }
}