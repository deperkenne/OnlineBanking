import { combineReducers } from "redux";
import transactions from "./transactionReducer";
import accounts from "./accountReducer";
import  users from  "./userReducer"
//import { transactions } from "../../Api/tools/mockData";



const rootReducer = combineReducers({
  accounts,
  users,
  transactions
});

export default rootReducer;
