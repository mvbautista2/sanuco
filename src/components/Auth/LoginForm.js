import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export default function LoginForm() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  const {
    loginWithPopup,
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  function callApi() {
    axios
      .get("http://localhost:4000/")
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.message));
  }

  async function callProtectedApi() {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get("http://localhost:4000/protected", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
    } catch (error) {
      console.log(error.message);
      //return null;
    }

    // axios
    //   .get("http://localhost:4000/protected")
    //   .then((response) => console.log(response.data))
    //   .catch((error) => console.log(error.message));
  }

  return (
    <>
      <body
        class="offline-doc"
        style={{
          backgroundImage:
            "url(" + require("../../assets/img/GLST4GV6H5ADFOI2PVFSY5S6XU.jpg").default + ")",
        }}
      >
        <div class="page-header clear-filter">
          <div
            class="page-header-image"
            
          ></div>
          <div class="content-center">
            <div class="col-md-8 ml-auto mr-auto">
              <div class="brand">
                <h1 class="title">Bienvenido a Sanuco</h1>
                <h3 class="description">Salud, Nutrición y Control de peso</h3>
                <br />
                <button
                  onClick={loginWithPopup}
                  class="btn btn-primary btn-round"
                >
                  Iniciar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
    // <>
    //   <div>
    //     <h1>Auth0 authentication</h1>
    //     <ul>
    //       <li>
    //         <button onClick={loginWithPopup}>Login with Popup</button>
    //       </li>
    //       <li>
    //         <button onClick={loginWithRedirect}>Login with Redirect</button>
    //       </li>
    //       <li>
    //         <button onClick={logout}>Logout</button>
    //       </li>
    //     </ul>
    //     <h3>User is{isAuthenticated ? "Logged in" : "Not logged in"}</h3>
    //     <ul>
    //       <li>
    //         <button onClick={callApi}>CALL API route</button>
    //       </li>
    //       <li>
    //         <button onClick={callProtectedApi}>CALL Protect API route</button>
    //       </li>
    //     </ul>
    //     {isAuthenticated && (
    //       <pre style={{ textAlign: "start" }}>{JSON.stringify(user.name)}</pre>
    //     )}
    //   </div>
    // </>
  );
}
