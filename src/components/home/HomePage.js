import React from "react";
import { Link } from "react-router-dom";
import Anmeldung from "../../signinup/anmeldung";
import Anmeldungpersonaliser from "../../signinup/inputPersonaliser/anmeldungpersonalise";
import { useStatus } from "../../ContextProvider/contextprovider";
import { useState,useEffect ,useMemo} from "react";
import "./homePage.css";

const HomePage = () => {
  const changestatus = useStatus();

  return (
    <div className="welcome-message">
      <div>
        <h1>Bien venu dans mon application Bancaire</h1>
        <p>Cette Application est un test de Deper.</p>
        <Link to="Transactionspage" className="btn btn-primary btn-lg">
          Learn more
        </Link>
        <Calculatrice />
      </div>
    </div>
  );
};


const Calculatrice = () => {

  const [state,setState] = useState({operande1:"",operator:"", operator2:"",operande2:"",operande3:"",status:false})
  const [statusop,setStatusop] = useState("");
  const [increment,setIncrement]  = useState(0)
  let result = "*"

   const [status, setStatus] = useState(false);
  const [operatore,setOperatore] = useState("")


 useEffect(()=>{
    result = result+state.operande1 +state.operator+state.operande2+state.operator2+state.operande3 
  },[state])
 
 
 
  
   const changevalue = 
     (op) => {
       if (status === false && increment === 0) {
         
         setState((prevState) => ({
           ...prevState,
           operande1: prevState.operande1 + op,
         }));
       } else if (status === true && increment === 1) {
       
         setState((prevState) => ({
           ...prevState,
           operande2: prevState.operande2 + op,
         }));
       } else if (status === true && increment === 2) {
         setState((prevState) => ({
           ...prevState,
           operande3: prevState.operande3 + op,
         }));
       }
     }
     
  

       const changestatus = operat => {
         setStatus((prevStatus) => !prevStatus);
         setState((prevState) => {
          
           setIncrement(increment +1)  
      
           switch (increment) {
             case 1:
               return { ...prevState, operator: operat};
             case 2:
                 
               return { ...prevState, operator2: operat};
             default:
               return prevState;
           }

            
           
           }
          
          )

        
     }


      

     

   return (
     <div>
       <div>
         <h1>
           {" "}
           {state.operande1} <span>{state.operator}</span>
           {state.operande2}
          <span>{state.operator2}</span> {state.operande3}
         </h1>
       </div>

       <div>{result}</div>

       <table>
         <tr>
           <th></th>
           <th></th>
           <th></th>
           <th></th>
         </tr>
         <tr>
           <td>
             {" "}
             <button onClick={() => changestatus("+")}>+</button>
           </td>
           <td>
             {" "}
             <button onClick={() => changestatus("-")}>-</button>
           </td>
           <td>
             {" "}
             <button onClick={() => changestatus("%")}>%</button>
           </td>
           <td>
             {" "}
             <button onClick={() => changestatus("*")}>*</button>
           </td>
         </tr>
         <tr>
           <td>
             <button onClick={() => changevalue("1")}>1</button>
           </td>
           <td>
             {" "}
             <button onClick={() => changevalue("2")}>2</button>
           </td>
           <td>
             {" "}
             <button onClick={() => changevalue("3")}>3</button>
           </td>
           <td>
             {" "}
             <button onClick={() => changevalue("4")}>4</button>
           </td>
         </tr>
         <tr>
           <td>
             {" "}
             <button onClick={() => changevalue("5")}>5</button>
           </td>
           <td>
             {" "}
             <button onClick={() => changevalue("6")}>6</button>
           </td>
           <td>
             {" "}
             <button onClick={() => changevalue("7")}>7</button>
           </td>
           <td>
             {" "}
             <button onClick={() => changevalue("8")}>8</button>
           </td>
         </tr>
       </table>
     </div>
   );


}




export default HomePage;
