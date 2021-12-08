import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";

import { Auth0Provider } from "@auth0/auth0-react";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import LoginForm from "components/Auth/LoginForm";

ReactDOM.render(
  <Auth0Provider
    domain="dev-diwwh35w.us.auth0.com"
    clientId="Cin5HMnaXaJnT6fhFi4NtMW6cNlRArzu"
    redirectUri={window.location.origin}
    audience="este es un identificador unico"
    scope="openid profile email"
  >
    {/*<LoginForm/>*/}

    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/rtl" render={(props) => <RTLLayout {...props} />} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </BrowserRouter>
  </Auth0Provider>,
  document.getElementById("root")
);
