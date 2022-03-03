import React, { useState, useEffect } from "react";
import axios from "axios";
import { size } from "lodash";

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
  ModalFooter,
  ModalHeader,
} from "reactstrap";

export default function Anamnesis() {
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);
  const [lastAnamnesis, setLastAnamnesis] = useState("");
  const [abierto, setAbierto] = useState(false);
  const [antecedentesNoP, setAntecedentesNoP] = useState("");
  const [antecedentesP, setAntecedentesP] = useState("");
  const [antecedentesHeredo, setAntecedentesHeredo] = useState("");
  const [alergias, setAlergias] = useState("");

  useEffect(async () => {
    const res = await axios.get(
      `https://sanuco-back-end-uxuex.ondigitalocean.app/api/anamnesis/lastDate/${user}`
    );

    setLastAnamnesis(res.data[0]);
  }, [lastAnamnesis]);

  useEffect(() => {
    const role = window.localStorage.getItem("Role");
    if (role) {
      const userRole = JSON.parse(role);
      setUserRole(userRole);
    }
  }, []);

  useEffect(() => {
    const email = window.localStorage.getItem("UserFound");
    if (email) {
      const user = JSON.parse(email);
      setUser(user);
    }
  }, []);

  const openModal = () => {
    setAbierto(true);
  };
  const closeModal = () => {
    setAbierto(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("antecedentesNoP", antecedentesNoP);
    formData.append("antecedentesP", antecedentesP);
    formData.append("antecedentesHeredo", antecedentesHeredo);
    formData.append("alergias", alergias);
    formData.append("user", user);

    const res = await axios.post(
      "https://sanuco-back-end-uxuex.ondigitalocean.app/api/anamnesis/createnew",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    closeModal();
    window.location.reload(true);
    console.log(res);
  };

  return (
    <>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <h5 className="title">ANAMNESIS E HISTORIAL</h5>
            </CardHeader>
            <CardBody>
              {size(lastAnamnesis) === 0 ? (
                <>
                  <Col className="pr-md-1" md="12">
                    <h5>Aún no se han registrado datos en anamnesis </h5>
                  </Col>
                </>
              ) : (
                <Row>
                  <Col className="pr-md-1" md="3">
                    <FormGroup>
                      <label>Antecendentes no patológicos</label>
                      <Input
                        type="textarea"
                        placeholder="(Hábitos tóxicos, alcohol, tabaco,…)"
                        disabled
                        value={
                          lastAnamnesis.antecedentesNoP === null
                            ? "No registrado"
                            : lastAnamnesis.antecedentesNoP
                        }
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col className="px-md-1" md="3">
                    <FormGroup>
                      <label>Antecedentes Patológicos</label>
                      <Input
                        type="textarea"
                        placeholder="(Enfermedades o tratornos que ha sufrido o padece)"
                        disabled
                        value={
                          lastAnamnesis.antecedentesP === null
                            ? "No registrado"
                            : lastAnamnesis.antecedentesP
                        }
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col className="px-md-1" md="3">
                    <FormGroup>
                      <label>Antecedentes Heredofamiliares</label>
                      <Input
                        type="textarea"
                        placeholder="(Historial familiar de enfermedades)"
                        disabled
                        value={
                          lastAnamnesis.antecedentesHeredo === null
                            ? "No registrado"
                            : lastAnamnesis.antecedentesHeredo
                        }
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col className="px-md-1" md="3">
                    <FormGroup>
                      <label>Alergias</label>
                      <Input
                        type="textarea"
                        disabled
                        value={
                          lastAnamnesis.alergias === null
                            ? "No registrado"
                            : lastAnamnesis.alergias
                        }
                      ></Input>
                    </FormGroup>
                  </Col>
                </Row>
              )}
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
      </Row>
      <Modal isOpen={abierto}>
        <Row>
          <Col md="12">
            <Card>
              <ModalHeader>
                <h5 className="title">ACTUALIZAR ANAMNESIS E HISTORIAL</h5>
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
                    <Col className="pr-md-1" md="12">
                      <FormGroup>
                        <label>Antecendentes no patológicos</label>
                        <Input
                          type="textarea"
                          placeholder="(Hábitos tóxicos, alcohol, tabaco,…)"
                          onChange={(e) =>
                            setAntecedentesNoP(e.currentTarget.value)
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="12">
                      <FormGroup>
                        <label>Antecedentes Patológicos</label>
                        <Input
                          type="textarea"
                          placeholder="(Enfermedades o tratornos que ha sufrido o padece)"
                          onChange={(e) =>
                            setAntecedentesP(e.currentTarget.value)
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="12">
                      <FormGroup>
                        <label>Antecedentes Heredofamiliares</label>
                        <Input
                          type="textarea"
                          placeholder="(Historial familiar de enfermedades)"
                          onChange={(e) =>
                            setAntecedentesHeredo(e.currentTarget.value)
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="12">
                      <FormGroup>
                        <label>Alergias</label>
                        <Input
                          type="textarea"
                          onChange={(e) => setAlergias(e.currentTarget.value)}
                        ></Input>
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
