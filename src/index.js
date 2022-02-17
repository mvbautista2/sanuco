import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import Recipes from "views/Recipes";
import Notifications from "views/Notifications";
import Training from "views/Training";

import { Auth0Provider } from "@auth0/auth0-react";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import LoginForm from "components/Auth/LoginForm";
import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";

ReactDOM.render(
  <Auth0Provider
    domain="sanuco.us.auth0.com"
    clientId="yTPTyoGuiD1GQxshxX00CuvWSyeviuZ3"
    redirectUri={window.location.origin}
    
  >
    {/*<LoginForm/>*/}
    <ThemeContextWrapper>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} exact/>}/>
        <Route path="/admin/recipes" component={Notifications} exact/>
        <Route path="/admin/training" component={Training} exact/>
        <Redirect from="/" to="/admin/dashboard" exact/>
        
      </Switch>
    </BrowserRouter>
    </ThemeContextWrapper>
  </Auth0Provider>,
  document.getElementById("root")
);
