import React, { useState, useEffect } from "react";
import axios from "axios";
import { size } from "lodash";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

export default function DemographicProfile() {
  const [sexo, setSexo] = useState();
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);
  const [lastDemographic, setlastDemographic] = useState("");
  const [abierto, setAbierto] = useState(false);
  const [durationPeriodoMenstrual, setDurationPeriodoMenstrual] = useState("");
  const [durationCycloMenstrual, setDurationCycloMenstrual] = useState("");
  const [menstrualIrregularities, setMenstrualIrregularities] = useState("");
  const [description, setDescription] = useState("");
  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");
  const [typicDay, setTypicDay] = useState("");
  const [idealWeight, setIdealWeight] = useState("");
  const [objectives, setObjectives] = useState("");

  useEffect(async () => {
    const res = await axios.get(
      `http://localhost:4000/api/demographicProfile/lastDate/${user}`
    );

    setlastDemographic(res.data[0]);
  }, [lastDemographic]);

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
    formData.append("sexo", sexo);
    formData.append("durationPeriodoMenstrual", durationPeriodoMenstrual);
    formData.append("durationCycloMenstrual", durationCycloMenstrual);
    formData.append("menstrualIrregularities", menstrualIrregularities);
    formData.append("description", description);
    formData.append("breakfast", breakfast);
    formData.append("lunch", lunch);
    formData.append("dinner", dinner);
    formData.append("typicDay", typicDay);
    formData.append("idealWeight", idealWeight);
    formData.append("objectives", objectives);
    formData.append("user", user);

    const res = await axios.post(
      "http://localhost:4000/api/demographicProfile/createnew",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(res);
  };

  return (
    <>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <h5 className="title">PERFIL DEMOGRÁFICO</h5>
            </CardHeader>
            <CardBody>
              {size(lastDemographic) === 0 ? (
                <>
                  <Col className="pr-md-1" md="12">
                    <h5>Aún no se ha registrado un perfil demográfico </h5>
                  </Col>
                </>
              ) : (
                <>
                  <Row>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Selecciona tu sexo</label>
                        <Input
                          type="text"
                          disabled
                          value={
                            lastDemographic.sexo === null
                              ? "No seleccionado"
                              : lastDemographic.sexo
                          }
                        ></Input>
                        {lastDemographic.sexo === "Mujer" ? (
                          <>
                            <FormGroup>
                              <label>Duración de tu período menstrual</label>
                              <Input
                                type="number"
                                placeholder="Días"
                                disabled
                                value={
                                  lastDemographic.durationPeriodoMenstrual ===
                                  null
                                    ? "0"
                                    : lastDemographic.durationPeriodoMenstrual
                                }
                              ></Input>
                            </FormGroup>
                            <FormGroup>
                              <label>Duración de tu ciclo menstrual</label>
                              <Input
                                type="number"
                                placeholder="Días"
                                disabled
                                value={
                                  lastDemographic.durationCycloMenstrual ===
                                  null
                                    ? "0"
                                    : lastDemographic.durationCycloMenstrual
                                }
                              ></Input>
                            </FormGroup>
                            <FormGroup>
                              <label>
                                ¿Tienes a menudo irregularidades menstruales?
                              </label>
                              <Input
                                type="text"
                                disabled
                                value={
                                  lastDemographic.menstrualIrregularities ===
                                  null
                                    ? "No seleccionado"
                                    : lastDemographic.menstrualIrregularities
                                }
                              ></Input>
                            </FormGroup>
                          </>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="6">
                      <FormGroup>
                        <label>¿Qué es lo que te describe mejor?</label>
                        <Input
                          type="text"
                          disabled
                          value={
                            lastDemographic.description === null
                              ? "No seleccionado"
                              : lastDemographic.description
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Describe tu último desayuno</label>
                        <Input
                          type="textarea"
                          disabled
                          value={
                            lastDemographic.breakfast === null
                              ? "No registrado"
                              : lastDemographic.breakfast
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Describe tu último almuerzo</label>
                        <Input
                          type="textarea"
                          disabled
                          value={
                            lastDemographic.lunch === null
                              ? "No registrado"
                              : lastDemographic.lunch
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>Describe tu última merienda</label>
                        <Input
                          type="textarea"
                          disabled
                          value={
                            lastDemographic.dinner === null
                              ? "No registrado"
                              : lastDemographic.dinner
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>
                          Selecciona la opción que describe mejor tu día típico
                        </label>
                        <Input
                          type="text"
                          disabled
                          value={
                            lastDemographic.typicDay === null
                              ? "No seleccionado"
                              : lastDemographic.typicDay
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Peso que quisieras alcanzar</label>
                        <Input
                          type="number"
                          placeholder="kg"
                          disabled
                          value={
                            lastDemographic.idealWeight === null
                              ? "No registrado"
                              : lastDemographic.idealWeight
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Describe tus objetivos nutricionales</label>
                        <Input
                          type="textarea"
                          disabled
                          value={
                            lastDemographic.objectives === null
                              ? "No registrado"
                              : lastDemographic.objectives
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </>
              )}

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
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Modal isOpen={abierto}>
        <Row>
          <Col md="12">
            <Card>
              <ModalHeader>
                <h5 className="title">ACTUALIZAR PERFIL DEMOGRÁFICO</h5>
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
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Selecciona tu sexo</label>
                        <Input
                          type="select"
                          value={sexo}
                          onChange={(e) => setSexo(e.currentTarget.value)}
                        >
                          <option>Seleccione</option>
                          <option>Mujer</option>
                          <option>Hombre</option>
                        </Input>
                        {sexo === "Mujer" ? (
                          <>
                            <FormGroup>
                              <label>Duración de tu período menstrual</label>
                              <Input
                                type="number"
                                placeholder="Días"
                                onChange={(e) =>
                                  setDurationPeriodoMenstrual(e.target.value)
                                }
                              ></Input>
                            </FormGroup>
                            <FormGroup>
                              <label>Duración de tu ciclo menstrual</label>
                              <Input
                                type="number"
                                placeholder="Días"
                                onChange={(e) =>
                                  setDurationCycloMenstrual(e.target.value)
                                }
                              ></Input>
                            </FormGroup>
                            <FormGroup>
                              <label>
                                ¿Tienes a menudo irregularidades menstruales?
                              </label>
                              <Input
                                type="select"
                                onChange={(e) =>
                                  setMenstrualIrregularities(e.target.value)
                                }
                              >
                                <option>Seleccione</option>
                                <option>A veces</option>
                                <option>Siempre</option>
                                <option>Nunca</option>
                              </Input>
                            </FormGroup>
                          </>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="8">
                      <FormGroup>
                        <label>¿Qué es lo que te describe mejor?</label>
                        <Input
                          type="select"
                          onChange={(e) => setDescription(e.target.value)}
                        >
                          <option>Seleccione</option>
                          <option>
                            Mi dieta y actividad necesitan mucho trabajo.
                          </option>
                          <option>Tengo algunos hábitos saludables</option>
                          <option>
                            Principalmente como bien y me mantengo activo
                          </option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Describe tu último desayuno</label>
                        <Input
                          type="textarea"
                          onChange={(e) => setBreakfast(e.target.value)}
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Describe tu último almuerzo</label>
                        <Input
                          type="textarea"
                          onChange={(e) => setLunch(e.target.value)}
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>Describe tu última merienda</label>
                        <Input
                          type="textarea"
                          onChange={(e) => setDinner(e.target.value)}
                        ></Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="12">
                      <FormGroup>
                        <label>
                          Selecciona la opción que describe mejor tu día típico
                        </label>
                        <Input
                          type="select"
                          onChange={(e) => setTypicDay(e.target.value)}
                        >
                          <option>Seleccione</option>
                          <option>
                            Casi siempre como menos de 3 comidas al día
                          </option>
                          <option>
                            Casi siempre como al menos 3 comidas al día
                          </option>
                          <option>
                            Casi siempre como al menos 3 comidas y algunos
                            bocadillos al día
                          </option>
                          <option>Depende, a veces menos de 3</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Peso que quisieras alcanzar</label>
                        <Input
                          type="number"
                          placeholder="kg"
                          onChange={(e) => setIdealWeight(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="8">
                      <FormGroup>
                        <label>Describe tus objetivos nutricionales</label>
                        <Input
                          type="textarea"
                          onChange={(e) => setObjectives(e.target.value)}
                        ></Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  <CardFooter>
                    {userRole === "Paciente" && (
                      <Button
                        className="btn-fill"
                        color="primary"
                        type="submit"
                      >
                        Guardar
                      </Button>
                    )}
                  </CardFooter>
                </ModalBody>
              </form>
            </Card>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
