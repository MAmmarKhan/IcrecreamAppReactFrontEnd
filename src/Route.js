import React from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoginPage from './LoginPage' ;
import AdminPanel from './AdminPanel';
import ProvideAuth from './ContextAPI/Authentication';
import ProvideURL from './ContextAPI/ServerURL';
import OrderPanel from './OrderPanel';
import PurchasePanel from './PurchasePanel';
import SalesPanel from './SalesPanel';
function RouteConfig() {  
    return (
      <ProvideAuth>
        <ProvideURL>
          <Router>
            <div>
              <Switch>
              <Route exact path="/">
                  <LoginPage />
                </Route>
                <Route path="/login">
                  <LoginPage />
                </Route>
                <Route path="/admin">
                  <AdminPanel />
                </Route>
                <Route path="/order">
                  <OrderPanel/>
                </Route>
                <Route path="/purchases">
                  <PurchasePanel/>
                </Route>
                <Route path="/sales">
                  <SalesPanel/>
                </Route>
              </Switch>
              <footer> ICMS version 1.0</footer>
            </div>
          </Router>
        </ProvideURL>
      </ProvideAuth>
    );
  }
  

export default RouteConfig;
