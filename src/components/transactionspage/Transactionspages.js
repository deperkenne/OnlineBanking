
import * as accountActions from "../../redux/actions/accountAction";
import * as userActions from "../../redux/actions/userAction";
import * as transactionActions from "../../redux/actions/transactionAction";
import { useContext,useState,useEffect } from "react";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import ListTransaction from "../common/listTransaction";
import { deleteTransaction } from "../../Api/transaction";
import Anmeldungpersonaliser from "../../signinup/inputPersonaliser/anmeldungpersonalise";

function Transactionspage({accounts,transactions,users,loadAccount,deleteTransaction,loadTransaction,loadUser,loading,valuestatus}) {
  const [accountitems, setAccountitems] = useState([]);
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (users.length === 0) {
        await loadUser().then(() => console.log("stateuser" + valuestatus)).catch((error) => {
          alert("Loading User failed" + error);
        });
      }

      if (accounts.length === 0) {
        await loadAccount()
          .then(() => console.log("stateaccounts" + valuestatus))
          .catch((error) => {
            alert("Loading account failed" + error);
          });
      }
      if (transactions.length === 0) {
        await loadTransaction()
          .then(() => console.log("stattransaction" + valuestatus))
          .catch((error) => {
            alert("Loading transaction failed" + error);
          });
      }

      setIsloading(false);
    };

    // Appel de la fonction loadData après un délai de 1 minute (60000 millisecondes)
    const timeout = setTimeout(loadData, 100);

    return () => clearTimeout(timeout); // Nettoyer le timeout lors du démontage du composant
  }, [accounts, users, transactions]);

  const handleDeleteTransaction = async (transaction) => {
    toast.success("transaction deleted");
    try {
      await deleteTransaction(transaction);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  // Si isLoading est vrai, affichez un indicateur de chargement

  /*
  <ListTransaction
          transactionitems={transactions}
          onDeleteClick={handleDeleteTransaction}
        />

 
  if (loading) {
    return <Spinner />;
  }
 */
  return (
    <>
      {loading ? (
        <Spinner/>
      ) : (
        <div>
          <Anmeldungpersonaliser
            accounts={accounts}
            users={users}
            transactions={transactions}
          />
        </div>
      )}
    </>
  );
}

Transactionspage.propTypes = {
  users: PropTypes.array.isRequired,
  accounts: PropTypes.array.isRequired,
  transactions: PropTypes.array.isRequired,
  loadAccount: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  loadTransaction: PropTypes.func.isRequired,
  loading:PropTypes.bool.isRequired,
  valuestatus:PropTypes.number.isRequired,
  //loading: PropTypes.bool.isRequired,
  deleteTransaction:PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    transactions:
      state.accounts.length === 0
        ? []
        : state.transactions.map((transaction) => {
            const account = state.accounts.find(
              (account) => account.id === transaction.accountId
            );
            if (account) {
              return {
                ...transaction,
                accountName: account.name,
              };
            } else {
              return transaction;
            }
          }),
    users: state.users,
    accounts: state.accounts,
    valuestatus: state.apiCallInprogr,
    loading: state.apiCallInprogr > 0,
  };
}


  const mapDispatchToProps = {
    loadAccount: accountActions.loadAccount,
    loadUser: userActions.loadUser,
    loadTransaction: transactionActions.loadTransaction,
    deleteTransaction: transactionActions.deleteTransaction
  };


export default connect(mapStateToProps, mapDispatchToProps)(Transactionspage);