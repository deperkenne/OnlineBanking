import { useState } from "react";
import Formpersonaliser from "./formPersonaliser";
import React, { Component } from "react";
import Transactionspages from "../../components/transactionspage/Transactionspages";
import "./anmeldungperso.css"
import ManageTransaction from "../../components/transactionspage/manageTransaction";


 function Anmeldungpersonaliser ({accounts,users,transactions}){
 const [stateobject,setState] = useState({username:"",passwort:""});
 const [errors, setErrors] = useState({})
 const [save,setSave] = useState(false)

 function handleChange(event){

  const {name,value} = event.target
  setState (prevState => ({
      ...prevState,
      [name]: value
    }));
  
}
  



function savevalue(event){
    event.preventDefault();
  if(formIsValid()){
    alert("everythingisgood")
    setSave(true)
 
    }

}

 function formIsValid() {
   const { username, passwort } = stateobject;
   const errors = {};

   if (!username) errors.username = "user is required.";
   if (username.length > 14) errors.username ="username must not long as 6"
   if (!passwort) errors.passwort = "pass is required";
   setErrors(errors);
   // Form is valid if the errors object still has no properties
   return Object.keys(errors).length === 0;
 }


return (
  <Container>
    {save ? (
      <ManageTransaction
        userinfo={stateobject}
        accounts={accounts}
        transactions={transactions}
        users = {users}

      />
    ) : (
      <Formpersonaliser
        save={save}
        error={errors}
        objectvalue={stateobject}
        onSubmit={savevalue}
        onChange={handleChange}
      />
    )}
  </Container>
);

}



function Container({children}){
return <div className="containerdiv">{children}</div>

}



export default Anmeldungpersonaliser;