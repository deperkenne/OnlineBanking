export const CREATE_ACCOUNT_SUCCESS = "CREATE_ACCOUNT_SUCCESS";
export const DELETE_ACCOUNT_SUCCESS = "DELETE_ACCOUNT_SUCCESS";
export const UPDATE_ACCOUNT_SUCCESS= "UPDATE_ACCOUNT_SUCCESS";
export const LOAD_ACCOUNT_SUCCESS = "LOAD_ACCOUNT_SUCCESS";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const BEGIN_API_CALL = "BEGIN_API_CALL";
export const API_CALL_ERROR = "API_CALL_ERROR";
export const END_API_SUCCESS = "END_API_SUCCESS";
export const CREATE_TRANSACTION_SUCCESS = "CREATE_TRANSACTION_SUCCESS";
export const UPDATE_TRANSACTION_SUCCESS = "UPDATE_TRANSACTION_SUCCESS";
export const LOAD_TRANSACTION_SUCCESS = "LOAD_TRANSACTION_SUCCESS";

// By convention, actions that end in "_SUCCESS" are assumed to have been the result of a completed
// API call. But since we're doing an optimistic delete, we're hiding loading state.
// So this action name deliberately omits the "_SUCCESS" suffix.
// If it had one, our apiCallsInProgress counter would be decremented below zero
// because we're not incrementing the number of apiCallInProgress when the delete request begins.
export const DELETE_ACCOUNT_OPTIMISTIC = "DELETE_ACCOUNT_OPTIMISTIC";
export const DELETE_TRANSACTION_OPTIMISTIC = "DELETE_TRANSACTION_OPTIMISTIC";

