import * as types from "./actionTypes";

export default function incrementReducer(state , action) {
  switch (action.type) {
    case types.CREATE_INCREMENT:
      return {
        value:this.state.value+1
      };
    default:
      return state;
  }
}