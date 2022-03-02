import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import EmailHunter from "hunter.io";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  FormGroup,
  Button,
  Col,
  Row,
} from "reactstrap";

import NotificationAlert from "react-notification-alert";

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
  const notificationAlertRef = React.useRef(null);
  const notify = (place) => {
    var type = "info";
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Bienvenido a <b>Sanuco</b> - Salud, Nutrición y Control de Peso
          </div>
        </div>
      ),
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };
  const notifyPaciente = (place) => {
    var type = "danger";
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Por favor seleccione un <b>Paciente</b> para continuar
          </div>
        </div>
      ),
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };
  const notifyError = (place) => {
    var type = "warning";
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Usuario y/o Contraseña<b> Incorrectos</b> - Inténtelo nuevamente
          </div>
        </div>
      ),
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };
  const notifyErrorSignUP = (place) => {
    var type = "warning";
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Usuario y/o Email<b> ya se encuentran registados</b> - Ingrese un
            usuario y/o email diferente
          </div>
        </div>
      ),
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  const [abierto, setAbierto] = useState(false);
  const [actualizarRol, setActualizarRol] = useState(false);
  const [role, setRole] = useState("Paciente");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [pacienteModal, setPacienteModal] = useState(null);
  const [pacienteSelected, setPacienteSelected] = useState("");
  const [pacientesList, setPacientesList] = useState([]);
  const [isSignUp, setIsSignUp] = useState(false);
  const history = useHistory();
  const hunter = new EmailHunter("2dbaa17d9ba8a731d0ffb755ac017c1dd256bb35");

  const openModal = () => {
    setAbierto(true);
  };
  const closeModal = () => {
    setAbierto(false);
  };
  const handleSubmitRol = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("role", role);
      const email = window.localStorage.getItem("User").replace(/['"]+/g, "");
      console.log(email);

      const res = await axios.put(
        "http://localhost:4000/api/auth/user/" + email,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (role === "Nutricionista") {
        listarUsuarios();
        window.localStorage.setItem("Role", JSON.stringify(role));
        window.localStorage.setItem("Nutricionista", JSON.stringify(email));
        setPacienteModal(true);
      } else {
        window.localStorage.setItem("UserFound", JSON.stringify(email));
        notify("tl");
        window.localStorage.setItem("Role", JSON.stringify(role));
        window.location.reload(true);
      }
    } catch (error) {}
  };
  const handleSubmitPaciente = async (e) => {
    e.preventDefault();
    if (pacienteSelected === "") {
      listarUsuarios();
      setPacienteModal(true);
      notifyPaciente("tl");
    } else {
      window.localStorage.setItem(
        "UserFound",
        JSON.stringify(pacienteSelected)
      );
      notify("tl");
      window.location.reload(true);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      try {
        const formData = new FormData();

        formData.append("username", usuario);
        formData.append("password", password);
        formData.append("given_name", nombre);
        formData.append("family_name", apellido);
        formData.append("email", email);
        formData.append("birthday", fechaNacimiento);
        formData.append("role", role);
        emailVerification();
        const res = await axios.post(
          "http://localhost:4000/api/auth/signup",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        window.localStorage.setItem(
          "LoggedNotAppUser",
          JSON.stringify(res.data.token)
        );
        window.localStorage.setItem(
          "Role",
          JSON.stringify(res.data.userFound.role.name)
        );
        if (res.data.userFound.role.name === "Nutricionista") {
          window.localStorage.setItem(
            "Nutricionista",
            JSON.stringify(res.data.userFound.email)
          );
          listarUsuarios();
          setPacienteModal(true);
        } else {
          window.localStorage.setItem(
            "UserFound",
            JSON.stringify(res.data.userFound.email)
          );
          notify("tl");
          window.location.reload(true);
        }
      } catch (error) {
        notifyErrorSignUP("tl");
      }
    } else {
      try {
        const formData = new FormData();

        formData.append("username", usuario);
        formData.append("password", password);

        const res = await axios.post(
          "http://localhost:4000/api/auth/signin",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        //console.log(res.data.token);
        window.localStorage.setItem(
          "LoggedNotAppUser",
          JSON.stringify(res.data.token)
        );
        window.localStorage.setItem(
          "Role",
          JSON.stringify(res.data.userFound.role.name)
        );
        if (res.data.userFound.role.name === "Nutricionista") {
          window.localStorage.setItem(
            "Nutricionista",
            JSON.stringify(res.data.userFound.email)
          );
          listarUsuarios();
          setPacienteModal(true);
        } else {
          window.localStorage.setItem(
            "UserFound",
            JSON.stringify(res.data.userFound.email)
          );
          notify("tl");
          setUsuario("");
          setPassword("");
          window.location.reload(true);
        }
      } catch (error) {
        notifyError("tl");
      }
    }
  };
  const switchMode = () => {
    setIsSignUp(!isSignUp);
  };

  const emailVerification = async (res) => {
    console.log(res);
    axios({
      method: "POST",
      url: "http://localhost:4000/api/verifyEmail",
      data: { email, api_key: hunter },
    }).then((res) => {
      console.log("El resultado", res);
    });
  };
  const responseFacebook = async (res) => {
    console.log(res);
    axios({
      method: "POST",
      url: "http://localhost:4000/api/facebooklogin",
      data: { accessToken: res.accessToken, userID: res.userID },
    })
      .then((res) => {
        console.log("Facebok login success", res);
        window.localStorage.setItem(
          "LoggedNotAppUser",
          JSON.stringify(res.data.token)
        );
        window.localStorage.setItem(
          "Role",
          JSON.stringify(res.data.userFound.role.name)
        );
        if (res.data.userFound.role.name === "Ninguno") {
          window.localStorage.setItem(
            "User",
            JSON.stringify(res.data.userFound.email)
          );
          setActualizarRol(true);
        }
        if (res.data.userFound.role.name === "Paciente") {
          window.localStorage.setItem(
            "UserFound",
            JSON.stringify(res.data.userFound.email)
          );
          notify("tl");
          window.location.reload(true);
        }
        if (res.data.userFound.role.name === "Nutricionista") {
          window.localStorage.setItem(
            "Nutricionista",
            JSON.stringify(res.data.userFound.email)
          );
          listarUsuarios();
          setPacienteModal(true);
        }
      })
      .catch((error) => {
        console.log(error);
        notifyError("tl");
      });
  };

  const googleSuccess = async (res) => {
    console.log(res);
    axios({
      method: "POST",
      url: "http://localhost:4000/api/googlelogin",
      data: { tokenId: res.tokenId },
    })
      .then((res) => {
        console.log("Google login success", res);
        window.localStorage.setItem(
          "LoggedNotAppUser",
          JSON.stringify(res.data.token)
        );
        window.localStorage.setItem(
          "Role",
          JSON.stringify(res.data.userFound.role.name)
        );
        if (res.data.userFound.role.name === "Ninguno") {
          window.localStorage.setItem(
            "User",
            JSON.stringify(res.data.userFound.email)
          );
          setActualizarRol(true);
        }
        if (res.data.userFound.role.name === "Paciente") {
          window.localStorage.setItem(
            "UserFound",
            JSON.stringify(res.data.userFound.email)
          );
          notify("tl");
          window.location.reload(true);
        }
        if (res.data.userFound.role.name === "Nutricionista") {
          window.localStorage.setItem(
            "Nutricionista",
            JSON.stringify(res.data.userFound.email)
          );
          listarUsuarios();
          setPacienteModal(true);
        }
      })
      .catch((error) => {
        console.log(error);
        notifyError("tl");
      });
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("El inicio de sesión con Google ha fracasado");
  };
  const listarUsuarios = () => {
    axios({
      method: "GET",
      url: "http://localhost:4000/api/users/Paciente",
      headers: {
        token: window.localStorage
          .getItem("LoggedNotAppUser")
          .replace(/['"]+/g, ""),
      },
    }).then((res) => {
      // console.log(res);
      setPacientesList(res.data);
    });
  };

  return (
    <>
      <body
        class="offline-doc"
        style={{
          backgroundImage:
            "url(" +
            require("../../assets/img/GLST4GV6H5ADFOI2PVFSY5S6XU.jpg").default +
            ")",
        }}
      >
        <div class="page-header clear-filter">
          <div class="page-header-image"></div>
          <div class="content-center">
            <div class="col-md-8 ml-auto mr-auto">
              <div class="brand">
                <h1 class="description">Bienvenido a Sanuco</h1>
                <h3 class="description">Salud, Nutrición y Control de peso</h3>
                <h4 class="description">
                  Somos Sanuco, un sitio web que te ayudará a tener un control
                  de tu salud a través de un autodiagnóstico de tu peso y el
                  acompañamiento de un nutricionista
                </h4>
                <br />
                <button onClick={openModal} class="btn btn-primary btn-round">
                  Iniciar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="react-notification-alert-container">
          <NotificationAlert ref={notificationAlertRef} />
        </div>
      </body>
      <Modal isOpen={abierto}>
        <ModalHeader>
          {isSignUp ? "Regístrate en Sanuco" : "Inicia Sesión"}
          <button aria-label="Close" className="close" onClick={closeModal}>
            <i className="tim-icons icon-simple-remove" />
          </button>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <>
                <Row>
                  <Col md="12">
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <Label>Nombre</Label>
                          <Input
                            type="text"
                            value={nombre}
                            name="nombre"
                            autoFocus
                            onChange={(e) => setNombre(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <Label>Apellido</Label>
                          <Input
                            type="text"
                            value={apellido}
                            name="apellido"
                            onChange={(e) => setApellido(e.target.value)}
                          />
                        </FormGroup>
                      </Col>

                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <Label>Rol</Label>
                          <Input
                            type="select"
                            name="role"
                            required
                            onChange={(e) => setRole(e.currentTarget.value)}
                          >
                            <option>Nutricionista</option>
                            <option selected>Paciente</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="7">
                        <FormGroup>
                          <Label htmlFor="exampleInputEmail1">Email</Label>
                          <Input
                            type="email"
                            value={email}
                            name="email"
                            pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
                            required
                            onChange={(e) => setEmail(e.currentTarget.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <Label>Fecha de Nacimiento</Label>
                          <Input
                            type="date"
                            value={fechaNacimiento}
                            name="fechaNacimiento"
                            required
                            onChange={(e) =>
                              setFechaNacimiento(e.currentTarget.value)
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </>
            )}
            <Row>
              <Col md="12">
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <Label>Usuario</Label>
                      <Input
                        type="text"
                        value={usuario}
                        name="usuario"
                        required
                        onChange={(e) => setUsuario(e.currentTarget.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <Label>Contraseña</Label>
                      <Input
                        type="password"
                        value={password}
                        name="password"
                        required
                        onChange={(e) => setPassword(e.currentTarget.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
            <ModalFooter>
              <Button className="btn-fill" color="primary" type="submit">
                {isSignUp ? "Guardar" : "Continuar"}
              </Button>
              <FacebookLogin
                appId="1037374753711484"
                autoLoad={false}
                callback={responseFacebook}
                render={(renderProps) => (
                  <Button
                    className="btn-fill"
                    color="info"
                    onClick={renderProps.onClick}
                  >
                    Iniciar Sesión con Facebook
                  </Button>
                )}
              />
              <GoogleLogin
                clientId="362449996279-6tog3bo75fspopbn3dhf3fmjrt8s4lik.apps.googleusercontent.com"
                buttonText="Iniciar Sesión con Google"
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy={"single_host_origin"}
              />
              ,
            </ModalFooter>
          </form>
          <Button color="link" onClick={switchMode}>
            {isSignUp
              ? "Ya tengo una cuenta. Iniciar sesión"
              : "¿Aún no tienes una cuenta? Regístrate"}
          </Button>
        </ModalBody>
      </Modal>
      <Modal isOpen={actualizarRol}>
        <ModalHeader>Escoge un rol</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmitRol}>
            <>
              <Row>
                <Col md="12">
                  <Row>
                    <Col className="pr-md-1" md="12">
                      <FormGroup>
                        <Label>Rol</Label>
                        <Input
                          type="select"
                          name="role"
                          required
                          onChange={(e) => setRole(e.currentTarget.value)}
                        >
                          <option>Nutricionista</option>
                          <option selected>Paciente</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </>

            <ModalFooter>
              <Button className="btn-fill" color="primary" type="submit">
                Continuar
              </Button>
              ,
            </ModalFooter>
          </form>
        </ModalBody>
      </Modal>
      <Modal isOpen={pacienteModal}>
        <ModalHeader>Escoge un paciente a revisar</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmitPaciente}>
            <>
              <Row>
                <Col md="12">
                  <Row>
                    <Col className="pr-md-1" md="12">
                      <FormGroup>
                        <Label>Pacientes</Label>
                        <Input
                          type="select"
                          name="pacienteSelected"
                          required
                          onChange={(e) =>
                            setPacienteSelected(e.currentTarget.value)
                          }
                        >
                          <option>Selecciona una opción</option>
                          {pacientesList.map((e) => (
                            <option key={e.email} value={e.email}>
                              {e.given_name} {e.family_name}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </>

            <ModalFooter>
              <Button className="btn-fill" color="primary" type="submit">
                Continuar
              </Button>
              ,
            </ModalFooter>
          </form>
        </ModalBody>
      </Modal>
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
