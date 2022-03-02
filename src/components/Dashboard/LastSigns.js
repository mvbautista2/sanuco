import React, { useState, useEffect } from "react";
import axios from "axios";
import { size } from "lodash";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  FormGroup,
  Input,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

export default function LastSigns() {
  const [lastSigns, setLastSigns] = useState("");
  const [temperatura, setTemperatura] = useState("");
  const [frecuenciaCardiaca, setFrecuenciaCardiaca] = useState("");
  const [frecuenciaRespiratoria, setFrecuenciaRespiratoria] = useState("");
  const [sistolica, setSistolica] = useState("");
  const [diastolica, setDiastolica] = useState("");
  const [saturacionOxigeno, setSaturacionOxigeno] = useState("");
  const [abiertoSigns, setAbiertoSigns] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const openModalSigns = () => {
    setAbiertoSigns(true);
  };
  const closeModalSigns = () => {
    setAbiertoSigns(false);
  };

  useEffect(async () => {
    const res = await axios.get(
      `https://sanuco-back-end-74qk6.ondigitalocean.app/api/vitalSigns/lastDate/${user}`
    );
    setLastSigns(res.data[0]);
  }, [lastSigns]);

  useEffect(() => {
    const email = window.localStorage.getItem("UserFound");
    if (email) {
      const user = JSON.parse(email);
      setUser(user);
    }
  }, []);
  useEffect(() => {
    const role = window.localStorage.getItem("Role");
    if (role) {
      const userRole = JSON.parse(role);
      setUserRole(userRole);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("temperatura", temperatura);
    formData.append("frecuenciaCardiaca", frecuenciaCardiaca);
    formData.append("frecuenciaRespiratoria", frecuenciaRespiratoria);
    formData.append("sistolica", sistolica);
    formData.append("diastolica", diastolica);
    formData.append("saturacionOxigeno", saturacionOxigeno);
    formData.append("user", user);

    const res = await axios.post(
      "https://sanuco-back-end-74qk6.ondigitalocean.app/api/vitalSigns/createnew",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    closeModalSigns();
    window.location.reload(true);
    console.log(res);
  };

  return (
    <>
      <Col lg="6" md="12">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Últimos signos vitales</CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              {size(lastSigns) === 0 ? (
                <>
                  <Col className="pr-md-1" md="12">
                    <h5>Aún no se han registrado signos vitales</h5>
                  </Col>
                </>
              ) : (
                <>
                  <Col className="pr-md-1" md="3">
                    <FormGroup>
                      <label>Temperatura</label>
                      <Input
                        placeholder="ºC"
                        type="number"
                        step="0.01"
                        disabled
                        value={
                          lastSigns.temperatura === null
                            ? 0
                            : lastSigns.temperatura
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="4">
                    <FormGroup>
                      <label>Frecuencia Cardiaca</label>
                      <Input
                        placeholder="Latidos por minuto"
                        type="number"
                        disabled
                        value={
                          lastSigns.frecuenciaCardiaca === null
                            ? 0
                            : lastSigns.frecuenciaCardiaca
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="4">
                    <FormGroup>
                      <label>Frecuencia Respiratoria</label>
                      <Input
                        placeholder="Respiraciones por minuto"
                        type="number"
                        disabled
                        value={
                          lastSigns.frecuenciaRespiratoria === null
                            ? 0
                            : lastSigns.frecuenciaRespiratoria
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="3">
                    <FormGroup>
                      <label>Sistólica</label>
                      <Input
                        placeholder="mmHg"
                        type="number"
                        disabled
                        value={
                          lastSigns.sistolica === null ? 0 : lastSigns.sistolica
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="3">
                    <FormGroup>
                      <label>Diastólica</label>
                      <Input
                        placeholder="mmHg"
                        type="number"
                        disabled
                        value={
                          lastSigns.diastolica === null
                            ? 0
                            : lastSigns.diastolica
                        }
                      />
                    </FormGroup>
                  </Col>

                  <Col className="pr-md-1" md="5">
                    <FormGroup>
                      <label>Saturación de oxígeno</label>
                      <Input
                        placeholder="00"
                        type="number  "
                        disabled
                        value={
                          lastSigns.saturacionOxigeno === null
                            ? 0
                            : lastSigns.saturacionOxigeno
                        }
                      />
                    </FormGroup>
                  </Col>
                </>
              )}
            </Row>
          </CardBody>

          <CardFooter>
            {userRole === "Paciente" && (
              <Button
                className="btn-fill"
                color="primary"
                type="submit"
                onClick={openModalSigns}
              >
                Actualizar
              </Button>
            )}
          </CardFooter>
        </Card>
        <Modal isOpen={abiertoSigns}>
          <Card>
            <ModalHeader>
              <CardHeader>
                <CardTitle tag="h4">Actualiza últimos signos vitales</CardTitle>
              </CardHeader>
              <button
                aria-label="Close"
                className="close"
                onClick={closeModalSigns}
              >
                <i className="tim-icons icon-simple-remove" />
              </button>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit}>
                <CardBody>
                  <Row>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Temperatura</label>
                        <Input
                          placeholder="ºC"
                          type="number"
                          step="0.01"
                          min="1"
                          pattern="^[0-9]+"
                          onChange={(e) => setTemperatura(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Frecuencia Cardiaca</label>
                        <Input
                          placeholder="Latidos por minuto"
                          type="number"
                          min="1"
                          pattern="^[0-9]+"
                          onChange={(e) =>
                            setFrecuenciaCardiaca(e.target.value)
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>Frecuencia Respiratoria</label>
                        <Input
                          placeholder="Respiraciones por minuto"
                          type="number"
                          min="1"
                          pattern="^[0-9]+"
                          onChange={(e) =>
                            setFrecuenciaRespiratoria(e.target.value)
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Sistólica</label>
                        <Input
                          placeholder="mmHg"
                          type="number"
                          min="1"
                          pattern="^[0-9]+"
                          onChange={(e) => setSistolica(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Diastólica</label>
                        <Input
                          placeholder="mmHg"
                          type="number"
                          min="1"
                          pattern="^[0-9]+"
                          onChange={(e) => setDiastolica(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>Saturación de oxígeno</label>
                        <Input
                          placeholder="00"
                          type="number"
                          min="1"
                          pattern="^[0-9]+"
                          onChange={(e) => setSaturacionOxigeno(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <ModalFooter>
                  <CardFooter>
                    <Button className="btn-fill" color="primary" type="submit">
                      Guardar
                    </Button>
                  </CardFooter>
                </ModalFooter>
              </form>
            </ModalBody>
          </Card>
        </Modal>
      </Col>
    </>
  );
}
