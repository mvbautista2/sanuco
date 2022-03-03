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

export default function Habits() {
  const [abierto, setAbierto] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);
  const [acontecimiento, setAcontecimiento] = useState("");
  const [descripcionAcontecimiento, setDescripcionAcontecimiento] =
    useState("");
  const [comerMismaHora, setComerMismaHora] = useState("");
  const [preparacionComida, setPreparacionComida] = useState("");
  const [preferencias, setPreferencias] = useState("");
  const [aversiones, setAversiones] = useState("");
  const [ocupacion, setOcupacion] = useState("");
  const [necesidadDeComer, setNecesidadDeComer] = useState("");
  const [alcohol, setAlcohol] = useState("");
  const [pique, setPique] = useState();
  const [descripcionPique, setDescripcionPique] = useState("");
  const [lastHabits, setLastHabits] = useState("");

  useEffect(async () => {
    const res = await axios.get(
      `https://sanuco-back-end-uxuex.ondigitalocean.app/api/habits/lastDate/${user}`
    );

    setLastHabits(res.data[0]);
  }, [lastHabits]);

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
    formData.append("user", user);
    formData.append("acontecimiento", acontecimiento);
    formData.append("descripcionAcontecimiento", descripcionAcontecimiento);
    formData.append("comerMismaHora", comerMismaHora);
    formData.append("preparacionComida", preparacionComida);
    formData.append("pique", pique);
    formData.append("decripcionPique", descripcionPique);
    formData.append("preferencias", preferencias);
    formData.append("aversiones", aversiones);
    formData.append("ocupacion", ocupacion);
    formData.append("necesidadDeComer", necesidadDeComer);
    formData.append("alcohol", alcohol);

    const res = await axios.post(
      "https://sanuco-back-end-uxuex.ondigitalocean.app/api/habits/createnew",
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
              <h5 className="title">HÁBITOS Y ACTIVIDAD</h5>
            </CardHeader>
            <CardBody>
              {size(lastHabits) === 0 ? (
                <>
                  <Col className="pr-md-1" md="12">
                    <h5>Aún no se han registrado Hábitos y Actividad </h5>
                  </Col>
                </>
              ) : (
                <>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>
                          Acontecimiento de la vida que te ha provocado un
                          aumento de peso significativo en los últimos años
                        </label>
                        <Input
                          type="text"
                          disabled
                          value={
                            lastHabits.acontecimiento === null
                              ? "No seleccionado"
                              : lastHabits.acontecimiento
                          }
                        ></Input>
                        {lastHabits.acontecimiento === "Otro" ? (
                          <>
                            <FormGroup>
                              <label>Descripcón del ese acontecimiento</label>
                              <Input
                                type="textarea"
                                disabled
                                value={
                                  lastHabits.descripcionAcontecimiento === null
                                    ? "No registrado"
                                    : lastHabits.descripcionAcontecimiento
                                }
                              ></Input>
                            </FormGroup>
                          </>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>
                          ¿Come aproximadamente a la misma hora para cada comida
                          todos los días?
                        </label>
                        <Input
                          type="text"
                          disabled
                          value={
                            lastHabits.comerMismaHora === null
                              ? "No seleccionado"
                              : lastHabits.comerMismaHora
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>¿Cómo suele preparar sus comidas?</label>
                        <Input
                          type="text"
                          disabled
                          value={
                            lastHabits.preparacionComida === null
                              ? "No seleccionado"
                              : lastHabits.preparacionComida
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>¿Qué suele desencadenar el pique?</label>
                        <Input
                          type="text"
                          disabled
                          value={
                            lastHabits.pique === null
                              ? "No seleccionado"
                              : lastHabits.pique
                          }
                        ></Input>
                        {lastHabits.pique === "Algo más" ? (
                          <>
                            <FormGroup>
                              <label>Descripción</label>
                              <Input
                                type="textarea"
                                disabled
                                value={
                                  lastHabits.descripcionPique === null
                                    ? "No registrado"
                                    : lastHabits.descripcionPique
                                }
                              ></Input>
                            </FormGroup>
                          </>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="5">
                      <FormGroup>
                        <label>Preferencias alimentarias</label>
                        <Input
                          type="textarea"
                          disabled
                          value={
                            lastHabits.preferencias === null
                              ? "No registrado"
                              : lastHabits.preferencias
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>Alimentos que no te gustan</label>
                        <Input
                          type="textarea"
                          disabled
                          value={
                            lastHabits.aversiones === null
                              ? "No registrado"
                              : lastHabits.aversiones
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Nivel de ocupación</label>
                        <Input
                          type="text"
                          disabled
                          value={
                            lastHabits.ocupacion === null
                              ? "No seleccionado"
                              : lastHabits.ocupacion
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="5">
                      <FormGroup>
                        <label>
                          ¿Cuándo sientes normalmente la necesidad de comer
                          algo?
                        </label>
                        <Input
                          type="text"
                          disabled
                          value={
                            lastHabits.necesidadDeComer === null
                              ? "No seleccionado"
                              : lastHabits.necesidadDeComer
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>
                          ¿Generalmente consume bebidas alcohólicas?
                        </label>
                        <Input
                          type="text"
                          disabled
                          value={
                            lastHabits.alcohol === null
                              ? "No seleccionado"
                              : lastHabits.alcohol
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </>
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
                <h5 className="title">HÁBITOS Y ACTIVIDAD</h5>
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
                        <label>
                          Selecciona algún acontecimiento de la vida que te ha
                          provocado un aumento de peso significativo en los
                          últimos años
                        </label>
                        <Input
                          type="select"
                          value={acontecimiento}
                          onChange={(e) =>
                            setAcontecimiento(e.currentTarget.value)
                          }
                        >
                          <option>Seleccione</option>
                          <option>Matrimonio o relación</option>
                          <option>El embarazo</option>
                          <option>Trabajo y vida familiar más ocupados</option>
                          <option>Estrés</option>
                          <option>Trastorno hormonal o de medicamentos</option>
                          <option>Dejar de hacer ejercicio</option>
                          <option>Otro</option>
                        </Input>
                        {acontecimiento === "Otro" ? (
                          <>
                            <FormGroup>
                              <label>Describe ese acontecimiento</label>
                              <Input
                                type="textarea"
                                onChange={(e) =>
                                  setDescripcionAcontecimiento(e.target.value)
                                }
                              ></Input>
                            </FormGroup>
                          </>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="12">
                      <FormGroup>
                        <label>
                          ¿Come aproximadamente a la misma hora para cada comida
                          todos los días?
                        </label>
                        <Input
                          type="select"
                          onChange={(e) => setComerMismaHora(e.target.value)}
                        >
                          <option>Seleccione</option>
                          <option>Sí</option>
                          <option>No</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>¿Cómo suele preparar sus comidas?</label>
                        <Input
                          type="select"
                          onChange={(e) => setPreparacionComida(e.target.value)}
                        >
                          <option>Seleccione</option>
                          <option>Las cocina yo mismo</option>
                          <option>Las cocina alguien en casa </option>
                          <option>Yo como en restaurantes</option>
                          <option>
                            Preparación en casa y también como en restaurantes
                          </option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>¿Qué suele desencadenar el pique?</label>
                        <Input
                          type="select"
                          value={pique}
                          onChange={(e) => setPique(e.currentTarget.value)}
                        >
                          <option>Seleccione</option>
                          <option>Comida a mi alrededor</option>
                          <option>Aburrimiento</option>
                          <option>Hambre</option>
                          <option>Otras personas comiendo bocadillos</option>
                          <option>Algo más</option>
                        </Input>
                        {pique === "Algo más" ? (
                          <>
                            <FormGroup>
                              <label>Descríbelo</label>
                              <Input
                                type="textarea"
                                onChange={(e) =>
                                  setDescripcionPique(e.target.value)
                                }
                              ></Input>
                            </FormGroup>
                          </>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Preferencias alimentarias</label>
                        <Input
                          type="textarea"
                          onChange={(e) => setPreferencias(e.target.value)}
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="6">
                      <FormGroup>
                        <label>Alimentos que no te gustan</label>
                        <Input
                          type="textarea"
                          onChange={(e) => setAversiones(e.target.value)}
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Nivel de ocupación</label>
                        <Input
                          type="select"
                          onChange={(e) => setOcupacion(e.target.value)}
                        >
                          <option>Seleccione</option>
                          <option>Apenas tengo tiempo para mi</option>
                          <option>
                            Estoy ocupado, pero trato de reservar algo de tiempo
                            cada día para relajarme y descansar
                          </option>
                          <option>
                            No estoy demasiado ocupado y mantengo el tiempo
                            disponible para diferentes cosas
                          </option>
                          <option>
                            Mi horario es bastante abierto y flexible.
                          </option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="8">
                      <FormGroup>
                        <label>
                          ¿Cuándo sientes normalmente la necesidad de comer
                          algo?
                        </label>
                        <Input
                          type="select"
                          onChange={(e) => setNecesidadDeComer(e.target.value)}
                        >
                          <option>Seleccione</option>
                          <option>Mañanas</option>
                          <option>Tardes</option>
                          <option>Noches</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="12">
                      <FormGroup>
                        <label>
                          ¿Generalmente consume bebidas alcohólicas?
                        </label>
                        <Input
                          type="select"
                          onChange={(e) => setAlcohol(e.target.value)}
                        >
                          <option>Seleccione</option>
                          <option>Sí</option>
                          <option>De vez en cuando</option>
                          <option>No</option>
                        </Input>
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
