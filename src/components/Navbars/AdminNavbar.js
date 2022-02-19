import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  UncontrolledDropdown,
  Input,
  InputGroup,
  NavbarBrand,
  Navbar,
  Nav,
  Container,
  Modal,
  NavbarToggler,
  ModalHeader,
} from "reactstrap";

import Recipes from "../../views/Recipes";
import RecipeDetail from "../../views/RecipeDetail";
import Notifications from "views/Notifications";

function AdminNavbar(props) {
  const [collapseOpen, setcollapseOpen] = React.useState(false);
  const [modalSearch, setmodalSearch] = React.useState(false);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState("");
  const [color, setcolor] = React.useState("navbar-transparent");
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  React.useEffect(() => {
    window.addEventListener("resize", updateColor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.removeEventListener("resize", updateColor);
    };
  });

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setcolor("bg-white");
    } else {
      setcolor("navbar-transparent");
    }
  };
  // this function opens and closes the collapse on small devices
  const toggleCollapse = () => {
    if (collapseOpen) {
      setcolor("navbar-transparent");
    } else {
      setcolor("bg-white");
    }
    setcollapseOpen(!collapseOpen);
  };
  // this function is to open the Search modal
  const toggleModalSearch = () => {
    setmodalSearch(!modalSearch);
  };

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload(true);
  };

  // useEffect(() => {
  //   const email = window.localStorage.getItem("UserFound");
  //   if (email) {
  //     const user = JSON.parse(email);
  //     setUser(user);
  //   }
  // }, []);

  useEffect(async () => {
    const email = window.localStorage
      .getItem("UserFound")
      .replace(/['"]+/g, "");
    // if (email) {
    //   const user = JSON.parse(email);
    //   setUser(user);
    // }
    const res = await axios.get(`http://localhost:4000/api/userInfo/${email}`);
    setUserInfo(res.data[0]);
    // console.log(res.data[0]);
  }, [userInfo]);

  return (
    <>
      <Switch>
        <Route
          path="/admin/recipes/recipes/search/:ingredient"
          component={Recipes}
          exact
        />
        <Route
          path="/admin/recipes/recipes/:id"
          component={RecipeDetail}
          exact
        />
      </Switch>
      <Navbar className={classNames("navbar-absolute", color)} expand="lg">
        <Container fluid>
          <div className="navbar-wrapper">
            <div
              className={classNames("navbar-toggle d-inline", {
                toggled: props.sidebarOpened,
              })}
            >
              <NavbarToggler onClick={props.toggleSidebar}>
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </NavbarToggler>
            </div>
            <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
              {props.brandText}
            </NavbarBrand>
          </div>
          <NavbarToggler onClick={toggleCollapse}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              <InputGroup className="search-bar">
                <Button color="link" onClick={toggleModalSearch}>
                  <i className="tim-icons icon-zoom-split" />
                  <span className="d-lg-none d-md-block">Search</span>
                </Button>
              </InputGroup>

              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="photo">
                    {userInfo.picture === null ||
                    userInfo.picture === undefined ? (
                      <img
                        alt="..."
                        src={require("assets/img/anime3.png").default}
                      />
                    ) : (
                      <img alt="..." src={userInfo.picture} />
                    )}
                  </div>
                  <b className="caret d-none d-lg-block d-xl-block" />
                  <button
                    class="btn btn-primary btn-round btn-"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </button>
                </DropdownToggle>
              </UncontrolledDropdown>
              <li className="separator d-lg-none" />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      <Modal
        modalClassName="modal-search"
        isOpen={modalSearch}
        toggle={toggleModalSearch}
      >
        <ModalHeader>
          <Input
            placeholder="SEARCH"
            value={search}
            type="text"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            aria-label="Close"
            className="close"
            onClick={() =>
              history.push(`/admin/recipes/recipes/search/${search}`)
            }
          >
            <i className="tim-icons icon-zoom-split" />
          </button>
        </ModalHeader>
      </Modal>
    </>
  );
}

export default AdminNavbar;
