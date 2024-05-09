

import React from "react";
import PropTypes from "prop-types";

function ListTransaction({ transactionitems, onDeleteClick }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th />
          <th>name</th>
          <th>montant</th>
          <th>date</th>
          <th>accountname</th>
          <th>accountsend</th>
          <th>accountrecieve</th>
          <th>delete</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {transactionitems.map((transaction) => {
          const date = new Date(transaction.date);
          const dateString = `${date.toDateString()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
          return (
            <tr key={transaction.id}>
              <td>{transaction.name}</td>
              <td>{transaction.montant}</td>
              <td>{dateString}</td>
              <td>{transaction.accountName}</td>
              <td>{transaction.accountIDE}</td>
              <td>{transaction.accountIDB}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDeleteClick(transaction)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}



   
    
export default ListTransaction;


