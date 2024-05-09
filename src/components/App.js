import React from "react";
//import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import Anmeldungpersonaliser from "../signinup/inputPersonaliser/anmeldungpersonalise";
import { HeaderHomeProvider } from "../ContextProvider/contextprovider";
import Transactionspage from "./transactionspage/Transactionspages";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from "react";






const router = createBrowserRouter([
  {

    path: "/",
    element: <Root/>,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "Transactionspage",
        element: <Transactionspage />,
      },
      {
        path: "HomePage",
        element: <HomePage />,
      },
    ],


  },
]);


function Root(){
 const [changelayout, setChangelayout] = useState(false);
const color={
     colorred:"red",
     colorgreen:"green"
}

 function handleChildrenAction(changelayout1) {
   setChangelayout(changelayout1);
 }
   return (
      <div>
       {changelayout === false ? (
         <HeaderHomeProvider>
           <Header onAction={handleChildrenAction} color={color.colorred} />
         </HeaderHomeProvider>
       ) : (
         <HeaderHomeProvider>
           <Header onAction={handleChildrenAction}  color={color.colorred}/>
         </HeaderHomeProvider>
       )}

       <div className="container my-4">
         <Routes>
           <Route path="" element={<HomePage />} />
           {/* Autres routes... */}
         </Routes>
         <Outlet></Outlet>
       </div>
     </div>
   );
     


}

function App() {

return  <RouterProvider router={router} />;

}

export default App;
