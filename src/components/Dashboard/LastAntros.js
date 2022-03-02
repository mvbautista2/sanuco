import React, { useEffect, useState } from "react";
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

export default function LastAntros() {
  const [lastAntro, setLastAntro] = useState("");
  const [estatura, setEstatura] = useState("");
  const [peso, setPeso] = useState("");
  const [sentimiento, setSentimiento] = useState("");
  const [cadera, setCadera] = useState("");
  const [cintura, setCintura] = useState("");
  const [abierto, setAbierto] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(async () => {
    const res1 = await axios.get(
      `http://localhost:4000/api/antropometric/lastDate/${user}`
    );

    setLastAntro(res1.data[0]);
  }, [lastAntro]);

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

  const openModal = () => {
    setAbierto(true);
  };
  const closeModal = () => {
    setAbierto(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("estatura", estatura);
    formData.append("peso", peso);
    formData.append("cadera", cadera);
    formData.append("cintura", cintura);
    formData.append("sentimiento", sentimiento);
    formData.append("user", user);

    const res = await axios.post(
      "http://localhost:4000/api/antropometric/createnew",
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
      <Col lg="6" md="12">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Últimos signos antropométricos</CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              {size(lastAntro) === 0 ? (
                <>
                  <Col className="pr-md-1" md="12">
                    <h5>Aún no se han registrado signos antropométricos</h5>
                  </Col>
                </>
              ) : (
                <>
                  <Col className="pr-md-1" md="3">
                    <FormGroup>
                      <label>Estatura</label>
                      <Input
                        placeholder="m"
                        type="number"
                        step="0.01"
                        disabled
                        value={
                          lastAntro.estatura === null ? 0 : lastAntro.estatura
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="3">
                    <FormGroup>
                      <label>Peso</label>
                      <Input
                        placeholder="kg"
                        type="number"
                        step="0.01"
                        disabled
                        value={lastAntro.peso === null ? 0 : lastAntro.peso}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Índice de Masa Corporal</label>
                      <Input
                        disabled
                        type="number"
                        placeholder="kg/m2"
                        step="0.01"
                        disabled
                        value={
                          lastAntro.masaCorporal === null
                            ? 0
                            : lastAntro.masaCorporal
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="3">
                    <FormGroup>
                      <label>Cintura</label>
                      <Input
                        placeholder="cm"
                        type="number"
                        step="0.01"
                        disabled
                        value={
                          lastAntro.cintura === null ? 0 : lastAntro.cintura
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="3">
                    <FormGroup>
                      <label>Cadera</label>
                      <Input
                        placeholder="cm"
                        type="number"
                        disabled
                        value={lastAntro.cadera === null ? 0 : lastAntro.cadera}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Índice Cintura Cadera</label>
                      <Input
                        disabled
                        type="number"
                        disabled
                        value={
                          lastAntro.cinturaCadera === null
                            ? 0
                            : lastAntro.cinturaCadera
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Con estas medidas me siento</label>
                      <Input
                        type="text"
                        disabled
                        value={
                          lastAntro.sentimiento === null
                            ? 0
                            : lastAntro.sentimiento
                        }
                      ></Input>
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
                onClick={openModal}
              >
                Actualizar
              </Button>
            )}
          </CardFooter>
        </Card>
      </Col>

      <Modal isOpen={abierto}>
        <Col lg="12" md="12">
          <Card>
            <ModalHeader>
              <CardHeader>
                <CardTitle tag="h4">
                  Actualizar últimos signos antropométricos
                </CardTitle>
                <button
                  aria-label="Close"
                  className="close"
                  onClick={closeModal}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
              </CardHeader>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit}>
                <CardBody>
                  <Row>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Estatura</label>
                        <Input
                          required
                          placeholder="m"
                          type="number"
                          step="0.01"
                          min="1"
                          pattern="^[0-9]+"
                          onChange={(e) => setEstatura(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Peso</label>
                        <Input
                          required
                          placeholder="kg"
                          type="number"
                          step="0.01"
                          min="1"
                          pattern="^[0-9]+"
                          onChange={(e) => setPeso(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Índice de Masa Corporal</label>
                        <Input
                          disabled
                          type="number"
                          placeholder="kg/m2"
                          step="0.01"
                          
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Cintura</label>
                        <Input
                          required
                          placeholder="cm"
                          type="number"
                          step="0.01"
                          min="1"
                          pattern="^[0-9]+"
                          onChange={(e) => setCintura(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Cadera</label>
                        <Input
                          required
                          placeholder="cm"
                          type="number"
                          min="1"
                          pattern="^[0-9]+"
                          onChange={(e) => setCadera(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Índice Cintura Cadera</label>
                        <Input disabled type="number" />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Con estas medidas me siento</label>
                        <Input
                          required
                          type="select"
                          value={sentimiento}
                          onChange={(e) =>
                            setSentimiento(e.currentTarget.value)
                          }
                        >
                          <option>Seleccione una</option>
                          <option>Normal</option>
                          <option>Feliz</option>
                          <option>Tranquil@</option>
                          <option>Preocupad@ </option>
                          <option>Triste</option>
                        </Input>
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
        </Col>
      </Modal>
    </>
  );
}
