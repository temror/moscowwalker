import React from "react";
import {Switch, Route, Redirect} from "react-router-dom"
import {AuthPage} from "./pages/AuthPage";
import {WalkPage} from "./pages/WalkPage";
import {PlaceInfo} from "./pages/PlaceInfo";
import {Visited} from "./pages/Visited";

export const useRoutes = (isAuth,token) => {
    console.log(isAuth,token)
    if (isAuth) {
        return( <Switch>
              <Route path="/was" exact>
                 <Visited visited={true}/>
              </Route>
            <Route path="/want" exact>
                <Visited visited={false}/>
            </Route>
              <Route path="/walk" exact>
                  <WalkPage/>
              </Route>
              <Route path="/places/:id">
                 <PlaceInfo/>
              </Route>
              <Redirect to="/walk"/>
          </Switch>)
    }
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}