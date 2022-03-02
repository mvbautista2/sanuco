import React, { useState, useEffect } from "react";
import axios from "axios";
import FileBase64 from "react-file-base64";
import DatePicker, { ReactDatePicker } from "react-datepicker";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap";
import { ISO_8601 } from "moment";

function UserProfile() {
  const [userRole, setUserRole] = useState(null);
  const [userInfo, setUserInfo] = useState("");
  const [abierto, setAbierto] = useState(false);
  const [todo, setTodo] = useState({
    given_name: "",
    family_name: "",
    username: "",
    address: "",
    phone: "",
    picture: "",
    birthday: "",
    sex: "Mujer",
  });

  useEffect(async () => {
    const email = window.localStorage
      .getItem("UserFound")
      .replace(/['"]+/g, "");
    const res = await axios.get(`http://localhost:4000/api/userInfo/${email}`);
    setUserInfo(res.data[0]);
  }, [userInfo]);

  useEffect(() => {
    const role = window.localStorage.getItem("Role");
    if (role) {
      const userRole = JSON.parse(role);
      setUserRole(userRole);
    }
  }, []);

  const openModal = () => {
    setAbierto(true);
    setTodo(userInfo);
  };
  const closeModal = () => {
    setAbierto(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = window.localStorage
        .getItem("UserFound")
        .replace(/['"]+/g, "");
      console.log(todo.birthday);
      const formData = new FormData();
      formData.append("given_name", todo.given_name);
      formData.append("family_name", todo.family_name);
      formData.append("username", todo.username);
      formData.append("address", todo.address);
      formData.append("sex", todo.sex);
      formData.append("phone", todo.phone);
      formData.append("birthday", todo.birthday);
      formData.append("picture", todo.picture);
      const res = await axios.put(
        "http://localhost:4000/api/user/" + email,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      closeModal();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Información General</h5>
              </CardHeader>
              <CardBody>
                <>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Nombres</label>
                        <Input
                          placeholder="Nombres"
                          type="text"
                          disabled
                          defaultValue={userInfo.given_name}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Apellidos</label>
                        <Input
                          placeholder="Last Name"
                          type="text"
                          disabled
                          defaultValue={userInfo.family_name}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Fecha de nacimiento</label>
                        <Input
                          type="text"
                          disabled
                          value={new Date(userInfo.birthday).toUTCString()}
                          // value={`${new Date(userInfo.birthday).getUTCDay()}/${new Date(userInfo.birthday).getUTCMonth()}/${new Date(userInfo.birthday).getUTCFullYear()}`}
                          // value={new Date(
                          //   userInfo.birthday
                          // ).getFullYear(), "/" ,new Date(
                          //   userInfo.birthday
                          // ).getMonth() }
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Usuario</label>
                        <Input
                          placeholder="Username"
                          type="text"
                          disabled
                          defaultValue={userInfo.username}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="5">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <Input
                          placeholder="mike@email.com"
                          type="email"
                          disabled
                          defaultValue={userInfo.email}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Sexo</label>
                        <Input
                          type="text"
                          disabled
                          defaultValue={userInfo.sex}
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Teléfono</label>
                        <Input
                          type="text"
                          disabled
                          defaultValue={userInfo.phone}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Dirección</label>
                        <Input
                          type="text"
                          disabled
                          defaultValue={userInfo.address}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </>
              </CardBody>
              <CardFooter>
                {userRole === "Paciente" && (
                  <Button
                    className="btn-fill"
                    color="primary"
                    type="submit"
                    onClick={openModal}
                  >
                    Actualizar
                  </Button>
                )}
              </CardFooter>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    {userInfo.picture === null ||
                    userInfo.picture === undefined ? (
                      <img
                        alt="..."
                        src={require("assets/img/anime3.png").default}
                        className="avatar"
                      />
                    ) : (
                      <img
                        alt="..."
                        src={userInfo.picture}
                        className="avatar"
                      />
                    )}
                    <h5 className="title">
                      {userInfo.given_name} {userInfo.family_name}
                    </h5>
                  </a>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <Modal isOpen={abierto}>
        <Row>
          <Col md="12">
            <Card>
              <ModalHeader>
                <h5 className="title">Actualizar Información General</h5>
                <button
                  aria-label="Close"
                  className="close"
                  onClick={closeModal}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
              </ModalHeader>

              <form onSubmit={handleSubmit}>
                <ModalBody>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Nombres</label>
                        <Input
                          placeholder="Company"
                          type="text"
                          defaultValue={todo.given_name}
                          onChange={(e) =>
                            setTodo({ ...todo, given_name: e.target.value })
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Apellidos</label>
                        <Input
                          placeholder="Last Name"
                          type="text"
                          defaultValue={todo.family_name}
                          onChange={(e) =>
                            setTodo({ ...todo, family_name: e.target.value })
                          }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Fecha de nacimiento</label>
                        <Input
                          type="date"
                          defaultValue="2022-02-20"
                          min="1922-01-01"
                          max="2022-01-01"
                          onChange={(e) =>
                            setTodo({
                              ...todo,
                              birthday : new Date(e.target.value)
                            })
                          }
                        ></Input>
                        
                        {/* <Input
                          type="date"
                          defaultValue={new Date(todo.birthday).toLocaleDateString()}
                          onChange={(e) =>
                            setTodo({
                              ...todo,
                              birthday: new Date(e.target.value)
                                .toISOString()
                                .split("T")[0],
                            })
                          }
                        /> */}
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Usuario</label>
                        <Input
                          // placeholder="Username"
                          type="text"
                          defaultValue={todo.username}
                          onChange={(e) =>
                            setTodo({ ...todo, username: e.target.value })
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="5">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <Input
                          placeholder="mike@email.com"
                          type="email"
                          disabled
                          defaultValue={todo.email}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Sexo</label>
                        <Input
                          type="select"
                          defaultValue={
                            todo.sex == undefined ? "Mujer" : todo.sex
                          }
                          onChange={(e) =>
                            setTodo({ ...todo, sex: e.currentTarget.value })
                          }
                        >
                          <option value={"No registrado"}>
                            Seleccione uno
                          </option>
                          <option>Mujer</option>
                          <option>Hombre</option>
                          <option>Prefiero no decirlo</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Teléfono</label>
                        <Input
                          type="tel"
                          pattern="^[0-9]{9,10}$"
                          required
                          defaultValue={todo.phone}
                          onChange={(e) =>
                            setTodo({ ...todo, phone: e.target.value })
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Dirección</label>
                        <Input
                          type="text"
                          required
                          defaultValue={todo.address}
                          onChange={(e) =>
                            setTodo({ ...todo, address: e.target.value })
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <label>
                          Clic aquí para actualizar imagen de perfil
                        </label>
                        <FileBase64
                          type="file"
                          multiple={false}
                          onDone={({ base64 }) =>
                            setTodo({ ...todo, picture: base64 })
                          }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </ModalBody>
                <CardFooter>
                  {userRole === "Paciente" && (
                    <Button className="btn-fill" color="primary" type="submit">
                      Guardar
                    </Button>
                  )}
                </CardFooter>
              </form>
            </Card>
          </Col>
        </Row>
      </Modal>
    </>
  );
}

export default UserProfile;
