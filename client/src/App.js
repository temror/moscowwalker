import React from "react";
import {BrowserRouter as Router, Switch} from "react-router-dom"

import {useRoutes} from "./routes";
import {AuthContext} from "./context/AuthContext";
import {useAuth} from "./hooks/auth.hook";
import {Preloader} from "./components/Preloader";
import {Navbar} from "./components/Navbar";
import {FloatingButton} from "./components/FloatingButton";

function App() {
    const {token, login, logout, userId, ready} = useAuth()
    const isAuth = !!token
    const routes = useRoutes(isAuth,token)

    if(!ready){
        return <Preloader/>
    }

  return (
   <div>
       <AuthContext.Provider
           value={{token, login, logout, userId,isAuth}}>
           <Router>
               {isAuth && <><Navbar/><FloatingButton/></>}
               <div className='container'>
                   <Switch>
                       {routes}
                   </Switch>
               </div>
           </Router>
       </AuthContext.Provider>
   </div>
  );
}

export default App;
