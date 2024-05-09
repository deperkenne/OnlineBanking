import { object } from "prop-types";
import { useState, useEffect } from "react";

import "./manageTransaction.css";

import React from "react";
import UberweisungPage from "../überweisung/überweisungpage";

const ManageTransaction = ({
  users,
  transactions,
  userinfo = {},
  accounts,
}) => {
  
  const [transactionlist, setTransactionlist] = useState([]);
  const [isclic, setIsclic] = useState(true);
  const [isclic1, setIsclic1] = useState(false);
  const [isüberweisunginfovalide, setIsüberweisunginfovalide] = useState();
  const [userfound, setUser] = useState({});
  const [foundAccount, setFoundAccount] = useState({});
  


  function handleClick() {
    setIsclic(false);
  }


  
  function finduser() {
    const user = users.find(
      (user) =>
        user.usernummer === userinfo.username &&
        user.userpwd === userinfo.passwort
    );
    return user;
  }

  const foundUser = finduser();
 
useEffect(() => {
    function findaccount() {
      let account = {};
    if (foundUser) {
        account = accounts.find((account) => {
        const threelastletter = foundUser.usernummer.slice(-3);
        const threelastletteraccount = account.accountnumber.slice(-3);
        return threelastletter === threelastletteraccount;
      });

      setFoundAccount(account)
    }
  
  }
     findaccount()
    },[accounts])
  

  useEffect(() => {
    function verifytransactionlist() {
      let transaction = [];
      if (foundAccount) {
        transaction = transactions.filter(
          (transaction) =>
            transaction.accountIDB === foundAccount.accountnumber ||
            transaction.accountIDE === foundAccount.accountnumber
        );
      }
     
      if (transaction.length > 0) {
        setTransactionlist(transaction);
      }
    }

    verifytransactionlist();
  }, [transactions,foundAccount]); // Exécuter uniquement lorsque le state des  transactions changent depuis le reducer

  function change() {
    setIsclic1(true);
  }

  if (isclic1) {
    return <UberweisungPage useraccount={foundAccount} />;
  }

  return (
    <div>
      {isclic ? (
        <ApercuDeaFinances
          user={foundUser}
          account={foundAccount}
          accounts={accounts}
          handleClick={handleClick}
          change={change}
        />
      ) : (
        <Listusertransaction transactions={transactionlist}  foundAccount={foundAccount}/>
      )}
    </div>
  );
};



function Listusertransaction({ transactions,foundAccount }) {
  const transactionByDate = {};
  transactions.map((transaction) => {
    const date = new Date(transaction.date).toDateString();
    if (!transactionByDate[date]) {
      transactionByDate[date] = [];
      transactionByDate[date].push(transaction);
    } else {
      transactionByDate[date].push(transaction);
    }
  });

  const color={
    redcolor:"red",
    greencolor:"green"
     
  }

  return (
    <div>
      {Object.entries(transactionByDate).map(([date, transactions]) => (
        <div key={date}>
          <h2>{date}</h2>
          <div>
            {transactions.map((transaction) => (
              <div className="divlinklisttransaction" key={transaction.id}>
                <div className="">
                  <p> {transaction.name}</p>
                  <p>
                    {" "}
                    {new Date(transaction.date).toDateString()}{" "}
                    {new Date(transaction.date).getHours()}{" "}
                    {new Date(transaction.date).getMinutes()}
                    {new Date(transaction.date).getSeconds()}
                  </p>
                  <p className=""> {transaction.accountIDB}</p>
                </div>
                <div className="">
                  {transaction.accountIDE === foundAccount.accountnumber ? (
                    <p className="" style={{ color: color.redcolor }}>
                      {"-"}
                      {transaction.montant}
                    </p>
                  ) : (
                    <p className="" style={{ color: color.greencolor }}>
                      {"+"}
                      {transaction.montant}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

}

function ApercuDeaFinances({ user, accounts,account, handleClick, change }) {
  return (
    <div className="containerapercu">
      <div className="barleft-side">
        <h1>Sparkasse</h1>
        <h1>Kenne</h1>
      </div>

      <div className="home">
        <h1>Guten Abend {user.name} </h1>
        <div className="button-like-divüber">
          <div>
            <h3>Finamzübersicht</h3>
             <ul>
               {accounts.map(account =>  <li key={account.id}>{account.solde} {accounts.accountName}</li>)}

            </ul>
            
          </div>
          <div className="mkp-button-group">
            <div onClick={change} className="divlinkberweisung">
              uberweisung
            </div>
            <div onClick={change} className="divlinkberweisung">
              Favorite
            </div>
          </div>
        </div>
        <div>
          <div className="button-like-div">
            <div>
              <p>Postfach</p>
              <p>Sie haben wichtige Nachrichten.</p>
            </div>
            <div className="button-like-div">
              <p>1 weiterer Hinweis</p>
              <p>@</p>
            </div>
          </div>
          <div>
            <div className="button-like-div">
              <p>Beratungs_Center</p>
              <p>Adresse</p>
              <p>015753247543</p>
            </div>
            <div className="button-like-div">
              <p>Hilfe$kontakt</p>
              <p>Q</p>
            </div>
          </div>
        </div>
        <div className="button-like-div" onClick={handleClick}>
          <p>Konten und karten</p>
          <div>
            <p>GIRO</p>
            <div>
              <p>giropay</p>
              <p>{user.name}</p>
            </div>
            <span>0,00 EUR</span>
          </div>
        </div>
        <div className="button-like-div" onClick={handleClick}>
          <div>
            <p>S</p>
            <div>
              <p>{account.accountName}</p>
              <p>{user.usernummer}</p>
            </div>
            <span>{account.solde}</span>
          </div>
        </div>
        <div className="button-like-div">
          <div>
            <p>S</p>
            <div>
              <p>{account.accountName}</p>
              <p>{user.usernummer}</p>
            </div>
            <span>{account.solde}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageTransaction;
