import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import Recipes from "views/Recipes";
import Training from "views/Training";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";

ReactDOM.render(
    <ThemeContextWrapper>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} exact/>}/>
        <Route path="/admin/recipes" component={Recipes} exact/>
        <Route path="/admin/training" component={Training} exact/>
        <Redirect from="/" to="/admin/dashboard" exact/>
        
      </Switch>
    </BrowserRouter>
    </ThemeContextWrapper>,
  document.getElementById("root")
);
