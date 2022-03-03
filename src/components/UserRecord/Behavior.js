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

export default function Behavior() {
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);
  const [abierto, setAbierto] = useState(false);
  const [lastBehavior, setLastBehavior] = useState("");
  const [sentirseGordo, setSentirseGordo] = useState(0);
  const [temorSubirdePeso, setTemorSubirdePeso] = useState(0);
  const [autoestima, setAutoestima] = useState(0);
  const [verguenzaPorComer, setVerguenzaPorComer] = useState(0);
  const [dietasEspeciales, setDietasEspeciales] = useState(0);
  const [grandesCantidadesComida, setGrandesCantidadesComida] = useState(0);
  const [esconderComida, setEsconderComida] = useState(0);
  const [mentirHabitos, setMentirHabitos] = useState(0);
  const [restringirComida, setRestringirComida] = useState(0);
  const [vomito, setVomito] = useState(0);
  const [diureticos, setDiureticos] = useState(0);
  const [ejercicio, setEjercicio] = useState(0);
  const [comerEvitarAnsiedad, setComerEvitarAnsiedad] = useState(0);
  const [comerSinHambre, setComerSinHambre] = useState(0);
  const [verguezaPeso, setVerguezaPeso] = useState(0);
  const [comerControlarSentimientos, setComerControlarSentimientos] =
    useState(0);
  const [ayuna, setAyuna] = useState(0);
  const [problemasEstomacales, setProblemasEstomacales] = useState(0);
  const [animoPorPeso, setAnimoPorPeso] = useState(0);

  useEffect(async () => {
    const res = await axios.get(
      `https://sanuco-back-end-uxuex.ondigitalocean.app/api/behavior/lastDate/${user}`
    );

    setLastBehavior(res.data[0]);
  }, [lastBehavior]);

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
    formData.append("sentirseGordo", sentirseGordo);
    formData.append("temorSubirdePeso", temorSubirdePeso);
    formData.append("autoestima", autoestima);
    formData.append("verguenzaPorComer", verguenzaPorComer);
    formData.append("dietasEspeciales", dietasEspeciales);
    formData.append("grandesCantidadesComida", grandesCantidadesComida);
    formData.append("esconderComida", esconderComida);
    formData.append("mentirHabitos", mentirHabitos);
    formData.append("restringirComida", restringirComida);
    formData.append("vomito", vomito);
    formData.append("diureticos", diureticos);
    formData.append("ejercicio", ejercicio);
    formData.append("comerEvitarAnsiedad", comerEvitarAnsiedad);
    formData.append("comerSinHambre", comerSinHambre);
    formData.append("verguezaPeso", verguezaPeso);
    formData.append("comerControlarSentimientos", comerControlarSentimientos);
    formData.append("ayuna", ayuna);
    formData.append("problemasEstomacales", problemasEstomacales);
    formData.append("animoPorPeso", animoPorPeso);

    const res = await axios.post(
      "https://sanuco-back-end-uxuex.ondigitalocean.app/api/behavior/createnew",
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
              <h5 className="title">COMPORTAMIENTO Y NUTRICIÓN</h5>
              <h6 className="title">Con qué frecuencia:</h6>
            </CardHeader>
            <CardBody>
              {size(lastBehavior) === 0 ? (
                <>
                  <Col className="pr-md-1" md="12">
                    <h5>
                      Aún no se ha registrado test de comportamiento y nutrición
                    </h5>
                  </Col>
                </>
              ) : (
                <Row>
                  <Col className="pr-md-1" md="4">
                    <FormGroup>
                      <label>
                        Tienes pensamientos relacionados con "sentirte gord@"
                      </label>
                      <Input
                        type="text"
                        disabled
                        value={
                          lastBehavior.sentirseGordo === null
                            ? "No seleccionado"
                            : lastBehavior.sentirseGordo
                        }
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col className="px-md-1" md="4">
                    <FormGroup>
                      <label>Tienes temor de subir de peso</label>
                      <Input
                        type="text"
                        disabled
                        value={
                          lastBehavior.temorSubirDePeso === null
                            ? "No seleccionado"
                            : lastBehavior.temorSubirDePeso
                        }
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col className="px-md-1" md="4">
                    <FormGroup>
                      <label>Tu autoestima es afectada por tu peso</label>
                      <Input
                        type="text"
                        disabled
                        value={
                          lastBehavior.autoestima === null
                            ? "No seleccionado"
                            : lastBehavior.autoestima
                        }
                      ></Input>
                    </FormGroup>
                  </Col>

                  <Col className="pr-md-1" md="4">
                    <FormGroup>
                      <label>Sientes culpa o vergüenza luego de comer</label>
                      <Input
                        type="text"
                        disabled
                        value={
                          lastBehavior.verguenzaPorComer === null
                            ? "No seleccionado"
                            : lastBehavior.verguenzaPorComer
                        }
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col className="px-md-1" md="4">
                    <FormGroup>
                      <label>
                        Comienzas dietas especiales con el fin de bajar de peso
                      </label>
                      <Input
                        type="text"
                        disabled
                        value={
                          lastBehavior.dietasEspeciales === null
                            ? "No seleccionado"
                            : lastBehavior.dietasEspeciales
                        }
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col className="px-md-1" md="4">
                    <FormGroup>
                      <label>
                        Comes grandes cantidades de comida en cortos períodos de
                        tiempo
                      </label>
                      <Input
                        type="text"
                        disabled
                        value={
                          lastBehavior.grandesCantidadesComida === null
                            ? "No seleccionado"
                            : lastBehavior.grandesCantidadesComida
                        }
                      ></Input>
                    </FormGroup>
                  </Col>

                  <Col className="pr-md-1" md="4">
                    <FormGroup>
                      <label>Escondes comida</label>
                      <Input
                        type="text"
                        disabled
                        value={
                          lastBehavior.esconderComida === null
                            ? "No seleccionado"
                            : lastBehavior.esconderComida
                        }
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col className="px-md-1" md="4">
                    <FormGroup>
                      <label>
                        Mientes acerca de tus hábitos de comer cuando se te
                        pregunta sobre eso
                      </label>
                      <Input
                        type="text"
                        disabled
                        value={
                          lastBehavior.mentirHabitos === null
                            ? "No seleccionado"
                            : lastBehavior.mentirHabitos
                        }
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col className="px-md-1" md="4">
                    <FormGroup>
                      <label>
                        Te restringes de lo que comes para bajar de peso
                      </label>
                      <Input
                        type="text"
                        disabled
                        value={
                          lastBehavior.restringirComida === null
                            ? "No seleccionado"
                            : lastBehavior.restringirComida
                        }
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="4">
                    <FormGroup>
                      <label>
                        Te induces el vómito después de haber comido para no
                        engordar
                      </label>
                      <Input
                        type="text"
                        disabled
                        value={
                          lastBehavior.vomito === null
                            ? "No seleccionado"
                            : lastBehavior.vomito
                        }
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col className="px-md-1" md="4">
                    <FormGroup>
                      <label>
                        Usas diuréticos para bajar de peso o no engordar
                      </label>
                      <Input
                        type="text"
                        disabled
                        value={
                          lastBehavior.diureticos === null
                            ? "No seleccionado"
                            : lastBehavior.diureticos
                        }
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col className="px-md-1" md="4">
                    <FormGroup>
                      <label>
                        Necesitas hacer ejercicio para no engordar o bajar de
                        peso
                      </label>
                      <Input
                        type="text"
                        disabled
                        value={
                          lastBehavior.ejercicio === null
                            ? "No seleccionado"
                            : lastBehavior.ejercicio
                        }
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="4">
                    <FormGroup>
                      <label>
                        Comes para relajarte y para evitar la ansiedad o la
                        depresión?
                      </label>
                      <Input
                        type="text"
                        disabled
                        value={
                          lastBehavior.comerEvitarAnsiedad === null
                            ? "No seleccionado"
                            : lastBehavior.comerEvitarAnsiedad
                        }
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col className="px-md-1" md="4">
                    <FormGroup>
                      <label>Comes aún cuando no tienes hambre?</label>
                      <Input
                        type="text"
                        disabled
                        value={
                          lastBehavior.comerSinHambre === null
                            ? "No seleccionado"
                            : lastBehavior.comerSinHambre
                        }
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col className="px-md-1" md="4">
                    <FormGroup>
                      <label>Te sientes avergonzado por tu peso</label>
                      <Input
                        type="text"
                        disabled
                        value={
                          lastBehavior.verguenzaPeso === null
                            ? "No seleccionado"
                            : lastBehavior.verguenzaPeso
                        }
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="4">
                    <FormGroup>
                      <label>Comes para controlar tus sentimientos</label>
                      <Input
                        type="text"
                        disabled
                        value={
                          lastBehavior.comerControlarSentimientos === null
                            ? "No seleccionado"
                            : lastBehavior.comerControlarSentimientos
                        }
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col className="px-md-1" md="4">
                    <FormGroup>
                      <label>Ayunas para bajar de peso</label>
                      <Input
                        type="text"
                        disabled
                        value={
                          lastBehavior.ayuna === null
                            ? "No seleccionado"
                            : lastBehavior.ayuna
                        }
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col className="px-md-1" md="4">
                    <FormGroup>
                      <label>Tienes a menudo problemas estomacales</label>
                      <Input
                        type="text"
                        disabled
                        value={
                          lastBehavior.problemasEstomacales === null
                            ? "No seleccionado"
                            : lastBehavior.problemasEstomacales
                        }
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="4">
                    <FormGroup>
                      <label>Tu estado de ánimo es afectado por tu peso</label>
                      <Input
                        type="text"
                        disabled
                        value={
                          lastBehavior.animoPorPeso === null
                            ? "No seleccionado"
                            : lastBehavior.animoPorPeso
                        }
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="4">
                    <FormGroup>
                      <label>Resultado</label>
                      <Input
                        type="Number"
                        disabled
                        value={
                          lastBehavior.total === null
                            ? "No Calculado"
                            : lastBehavior.total
                        }
                      ></Input>
                    </FormGroup>
                  </Col>
                  {userRole === "Paciente" ? (
                    <Col className="pr-md-1" md="12">
                      <FormGroup>
                        <label>Interpretación del resultado</label>
                        <Input
                          type="textarea"
                          disabled
                          value={
                            "Para conocer el significado del resultado que has obtenido, espera que un nutricionista se comunique contigo, mantente al tanto de los mensajes que él te deje."
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                  ) : userRole === "Nutricionista" ? (
                    <Col className="pr-md-1" md="12">
                      <FormGroup>
                        <label>Interpretación del resultado</label>
                        <Input
                          type="textarea"
                          disabled
                          value={
                            lastBehavior.total <= 4
                              ? "No se detecta comportamientos relacionados a desórdenes alimentarios"
                              : lastBehavior.total >= 5 &&
                                lastBehavior.total <= 14
                              ? "Significa que usted tiene algunos asuntos que resolver en su relacion con la comida. Este puede ser un buen momento para revisar esos asuntos. Sin embargo es dificil llamarle adicción a su problema"
                              : lastBehavior.total >= 15
                              ? "Significa que usted está sufriendo de un desorden alimentario del tipo del comedor compulsivo o bulimia. Es urgente que consiga ayuda profesional."
                              : ""
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                  ) : (
                    ""
                  )}
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
                <h5 className="title">COMPORTAMIENTO Y NUTRICIÓN</h5>
                <h6 className="title">Con qué frecuencia:</h6>
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
                        <label>
                          Tienes pensamientos relacionados con "sentirte gord@"
                        </label>
                        <Input
                          type="select"
                          value={sentirseGordo}
                          onChange={(e) =>
                            setSentirseGordo(e.currentTarget.value)
                          }
                        >
                          <option value={2}>A veces</option>
                          <option value={5}>Siempre</option>
                          <option value={0}>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>Tienes temor de subir de peso</label>
                        <Input
                          type="select"
                          value={temorSubirdePeso}
                          onChange={(e) =>
                            setTemorSubirdePeso(e.currentTarget.value)
                          }
                        >
                          <option value={2}>A veces</option>
                          <option value={5}>Siempre</option>
                          <option value={0}>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>Tu autoestima es afectada por tu peso</label>
                        <Input
                          type="select"
                          value={autoestima}
                          onChange={(e) => setAutoestima(e.currentTarget.value)}
                        >
                          <option value={2}>A veces</option>
                          <option value={5}>Siempre</option>
                          <option value={0}>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>

                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Sientes culpa o vergüenza luego de comer</label>
                        <Input
                          type="select"
                          value={verguenzaPorComer}
                          onChange={(e) =>
                            setVerguenzaPorComer(e.currentTarget.value)
                          }
                        >
                          <option value={2}>A veces</option>
                          <option value={5}>Siempre</option>
                          <option value={0}>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>
                          Comienzas dietas especiales con el fin de bajar de
                          peso
                        </label>
                        <Input
                          type="select"
                          value={dietasEspeciales}
                          onChange={(e) =>
                            setDietasEspeciales(e.currentTarget.value)
                          }
                        >
                          <option value={2}>A veces</option>
                          <option value={5}>Siempre</option>
                          <option value={0}>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>
                          Comes grandes cantidades de comida en cortos períodos
                          de tiempo
                        </label>
                        <Input
                          type="select"
                          value={grandesCantidadesComida}
                          onChange={(e) =>
                            setGrandesCantidadesComida(e.currentTarget.value)
                          }
                        >
                          <option value={2}>A veces</option>
                          <option value={5}>Siempre</option>
                          <option value={0}>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>

                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Escondes comida</label>
                        <Input
                          type="select"
                          value={esconderComida}
                          onChange={(e) =>
                            setEsconderComida(e.currentTarget.value)
                          }
                        >
                          <option value={2}>A veces</option>
                          <option value={5}>Siempre</option>
                          <option value={0}>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>
                          Mientes acerca de tus hábitos de comer cuando se te
                          pregunta sobre eso
                        </label>
                        <Input
                          type="select"
                          value={mentirHabitos}
                          onChange={(e) =>
                            setMentirHabitos(e.currentTarget.value)
                          }
                        >
                          <option value={2}>A veces</option>
                          <option value={5}>Siempre</option>
                          <option value={0}>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>
                          Te restringes de lo que comes para bajar de peso
                        </label>
                        <Input
                          type="select"
                          value={restringirComida}
                          onChange={(e) =>
                            setRestringirComida(e.currentTarget.value)
                          }
                        >
                          <option value={2}>A veces</option>
                          <option value={5}>Siempre</option>
                          <option value={0}>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>
                          Te induces el vómito después de haber comido para no
                          engordar
                        </label>
                        <Input
                          type="select"
                          value={vomito}
                          onChange={(e) => setVomito(e.currentTarget.value)}
                        >
                          <option value={2}>A veces</option>
                          <option value={5}>Siempre</option>
                          <option value={0}>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>
                          Usas diuréticos para bajar de peso o no engordar
                        </label>
                        <Input
                          type="select"
                          value={diureticos}
                          onChange={(e) => setDiureticos(e.currentTarget.value)}
                        >
                          <option value={2}>A veces</option>
                          <option value={5}>Siempre</option>
                          <option value={0}>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>
                          Necesitas hacer ejercicio para no engordar o bajar de
                          peso
                        </label>
                        <Input
                          type="select"
                          value={ejercicio}
                          onChange={(e) => setEjercicio(e.currentTarget.value)}
                        >
                          <option value={2}>A veces</option>
                          <option value={5}>Siempre</option>
                          <option value={0}>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>
                          Comes para relajarte y para evitar la ansiedad o la
                          depresión?
                        </label>
                        <Input
                          type="select"
                          value={comerEvitarAnsiedad}
                          onChange={(e) =>
                            setComerEvitarAnsiedad(e.currentTarget.value)
                          }
                        >
                          <option value={2}>A veces</option>
                          <option value={5}>Siempre</option>
                          <option value={0}>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>Comes aún cuando no tienes hambre?</label>
                        <Input
                          type="select"
                          value={comerSinHambre}
                          onChange={(e) =>
                            setComerSinHambre(e.currentTarget.value)
                          }
                        >
                          <option value={2}>A veces</option>
                          <option value={5}>Siempre</option>
                          <option value={0}>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>Te sientes avergonzado por tu peso</label>
                        <Input
                          type="select"
                          value={verguezaPeso}
                          onChange={(e) =>
                            setVerguezaPeso(e.currentTarget.value)
                          }
                        >
                          <option value={2}>A veces</option>
                          <option value={5}>Siempre</option>
                          <option value={0}>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Comes para controlar tus sentimientos</label>
                        <Input
                          type="select"
                          value={comerControlarSentimientos}
                          onChange={(e) =>
                            setComerControlarSentimientos(e.currentTarget.value)
                          }
                        >
                          <option value={2}>A veces</option>
                          <option value={5}>Siempre</option>
                          <option value={0}>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>Ayunas para bajar de peso</label>
                        <Input
                          type="select"
                          value={ayuna}
                          onChange={(e) => setAyuna(e.currentTarget.value)}
                        >
                          <option value={2}>A veces</option>
                          <option value={5}>Siempre</option>
                          <option value={0}>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>Tienes a menudo problemas estomacales</label>
                        <Input
                          type="select"
                          value={problemasEstomacales}
                          onChange={(e) =>
                            setProblemasEstomacales(e.currentTarget.value)
                          }
                        >
                          <option value={2}>A veces</option>
                          <option value={5}>Siempre</option>
                          <option value={0}>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>
                          Tu estado de ánimo es afectado por tu peso
                        </label>
                        <Input
                          type="select"
                          value={animoPorPeso}
                          onChange={(e) =>
                            setAnimoPorPeso(e.currentTarget.value)
                          }
                        >
                          <option value={2}>A veces</option>
                          <option value={5}>Siempre</option>
                          <option value={0}>Nunca</option>
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
