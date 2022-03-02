import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import routesNutricionista from "routesNutricionista.js";

import logo from "assets/img/2966470.png";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import LoginForm from "components/Auth/LoginForm";

var ps;

function Admin(props) {
  const location = useLocation();
  const mainPanelRef = React.useRef(null);
  const [sidebarOpened, setsidebarOpened] = React.useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );
  const [token, setToken] = useState(null);
  const [roleUser, setRoleUser] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("LoggedNotAppUser");
    if (loggedUser) {
      const token = JSON.parse(loggedUser);
      setToken(token);
    }
  }, []);
  useEffect(() => {
    const role = window.localStorage.getItem("Role");
    if (role) {
      const roleUser = JSON.parse(role);
      setRoleUser(roleUser);
    }
  }, []);
  useEffect(() => {
    const email = window.localStorage.getItem("UserFound");
    if (email) {
      const user = JSON.parse(email);
      setUser(user);
    }
  }, []);

  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return null;
  };
  return user && token && roleUser === "Paciente" ? (
    <>
      <BackgroundColorContext.Consumer>
        {({ color }) => (
          <React.Fragment>
            <div className="wrapper">
              <Sidebar
                routes={routes}
                logo={{
                  text: "Sanuco",
                  imgSrc: logo,
                }}
                toggleSidebar={toggleSidebar}
              />
              <div className="main-panel" ref={mainPanelRef} data={color}>
                <AdminNavbar
                  brandText={getBrandText(location.pathname)}
                  toggleSidebar={toggleSidebar}
                  sidebarOpened={sidebarOpened}
                />

                <Switch>
                  {getRoutes(routes)}
                  <Redirect from="*" to="/admin/dashboard" />
                </Switch>
                {
                  // we don't want the Footer to be rendered on map page
                  location.pathname === "/admin/maps" ? null : <Footer fluid />
                }
              </div>
            </div>
          </React.Fragment>
        )}
      </BackgroundColorContext.Consumer>
    </>
  ) : user && token && roleUser === "Nutricionista" ? (
    <>
      <BackgroundColorContext.Consumer>
        {({ color }) => (
          <React.Fragment>
            <div className="wrapper">
              <Sidebar
                routes={routesNutricionista}
                logo={{
                  text: "Sanuco",
                  imgSrc: logo,
                }}
                toggleSidebar={toggleSidebar}
              />
              <div className="main-panel" ref={mainPanelRef} data={color}>
                <AdminNavbar
                  brandText={getBrandText(location.pathname)}
                  toggleSidebar={toggleSidebar}
                  sidebarOpened={sidebarOpened}
                />

                <Switch>
                  {getRoutes(routes)}
                  <Redirect from="*" to="/admin/dashboard" />
                </Switch>
              </div>
            </div>
          </React.Fragment>
        )}
      </BackgroundColorContext.Consumer>
    </>
  ) : (
    <LoginForm />
  );
}

export default Admin;
