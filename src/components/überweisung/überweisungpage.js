import { Container } from "postcss/lib/postcss";
import "./überweisungpage.css";
import ÜberweisungForm from "./überweisungForm"
import React, { useState ,useEffect} from "react";
import * as accountActions from "../../redux/actions/accountAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as transactionActions  from "../../redux/actions/transactionAction" ;
import { saveTransaction } from "../../Api/transaction";
import { saveAccount } from "../../Api/accountApi";



function UberweisungPage({accounts,loadAccount,saveTransaction,saveAccount,useraccount}){
  const [stateinfo, setStateinfo] = useState({
    newname: "",
    nummer: "",
    montant: 0,
  });
  const [error, setError] = useState({});
  const [account, setAccount] = useState({});
  const [isüberweisunginfovalid, setIsüberweisunginfovalid] = useState(false);
  const [takestateinfo,setTakestateinfo] = useState({})
  const [errorvalidationsoldeoraccount,setErrovalidationsoldeoraccount] = useState({})

  const handlerchange = (e) => {
    let { name, value } = e.target;
    value = name === "montant" ? parseInt(value) : value; // Convertir en entier
    setStateinfo({ ...stateinfo, [name]: value });
  };
  useEffect(() => {
    if (accounts.length === 0) {
      loadAccount().catch((error) => {
        alert("Loading account failed" + error);
      });
    }
  });


  

  useEffect(() => {
    function FindSpecificAccount() {
    const specificAccount = accounts.find(
      (account) => account.accountnumber === stateinfo.nummer
    );

    
    return specificAccount;

    }

   setAccount(FindSpecificAccount());
  }, [stateinfo.nummer]); // Exécuter uniquement lorsque les stateinfo changent

 

  function validateInput() {
    const error = {};
    if (!stateinfo.montant) error.montant = "give uberweisung beitrag";
    if (!stateinfo.nummer) error.nummer = "give  accountnummer";
   
    setError(error);

    return Object.keys(error).length === 0;
  }

function validateSoldeAndAccount(){
 const errorsoldeOrAccount = {};
 if (stateinfo.montant > useraccount.solde){
     errorsoldeOrAccount.solde = "votre solde est insufissant"
  }

  if(!account){
    errorsoldeOrAccount.account = "account no exist"
  }
   setErrovalidationsoldeoraccount(errorsoldeOrAccount)
   return Object.keys(errorsoldeOrAccount).length === 0;


}

  
  function sendüberweisung(event) {
    event.preventDefault();
    if (validateInput() && validateSoldeAndAccount()) {
      
       const newObject = {
         name: "virement",
         montant: stateinfo.montant,
         accountIDE: useraccount.accountnumber,
         accountIDB: stateinfo.nummer,
         date: new Date(),
        
       };

     
      const accountNew = {...useraccount,solde:useraccount.solde-stateinfo.montant}
       const accountB = { ...account, solde: account.solde + stateinfo.montant};
       console.log(accountB.solde + " "+ accountB.name+ " " + account.id)

    if (accountB && accountB.id) {  
   // Effectuer la transaction
saveTransaction(newObject)
  .then(() => {
    // Mettre à jour le premier compte
    return saveAccount(accountNew);
  })
  .then(() => {
    // Mettre à jour le deuxième compte une fois que la mise à jour du premier compte est terminée
    return saveAccount(accountB);
  })
  .then(() => {
    // Si toutes les mises à jour réussissent, afficher un message de succès
    console.log("Virement effectué avec succès");
  })
  .catch((error) => {
    // Si une erreur survient à n'importe quelle étape, afficher une alerte avec le message d'erreur correspondant
    alert("Erreur lors de la transaction : " + error);
  });

}else{
  console.log("rien a signaler")
}

    }
    else{
        if(errorvalidationsoldeoraccount.account){
          alert(errorvalidationsoldeoraccount.account);
          return;
        }
        if(errorvalidationsoldeoraccount.solde){
          alert(errorvalidationsoldeoraccount.solde);
        }


    }
  }

  return (
    <div className="überweisungpagecss ">
      <ÜberweisungForm
        error={error}
        newobjectvalue={stateinfo}
        onSubmit={sendüberweisung}
        onChange={handlerchange}
      />
    </div>
  );
}




UberweisungPage.propTypes = {
  accounts: PropTypes.array.isRequired,
  loadAccount: PropTypes.func.isRequired,
  saveTransaction: PropTypes.func.isRequired,
  saveAccount: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    transactions : state.transactions,
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  loadAccount: accountActions.loadAccount,
  saveTransaction: transactionActions.saveTransaction,
  saveAccount:accountActions.saveAccount

};

export default connect(mapStateToProps, mapDispatchToProps)(UberweisungPage);