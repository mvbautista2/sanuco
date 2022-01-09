import React, { useState } from "react";

// reactstrap components

import { useAuth0 } from "@auth0/auth0-react";
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
} from "reactstrap";

function UserRecord() {
  const { user } = useAuth0();
  const [sexo, setSexo] = useState();
  const [acontecimiento, setAcontecimiento] = useState();
  const [pique, setPique] = useState();

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">PERFIL DEMOGRÁFICO</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Selecciona tu sexo</label>
                        <Input
                          type="select"
                          value={sexo}
                          onChange={(e) => setSexo(e.currentTarget.value)}
                        >
                          <option>Mujer</option>
                          <option>Hombre</option>
                        </Input>
                        {sexo === "Mujer" ? (
                          <>
                            <FormGroup>
                              <label>Duración de tu período menstrual</label>
                              <Input type="number" placeholder="Días"></Input>
                            </FormGroup>
                            <FormGroup>
                              <label>Duración de tu ciclo menstrual</label>
                              <Input type="number" placeholder="Días"></Input>
                            </FormGroup>
                            <FormGroup>
                              <label>
                                ¿Tienes a menudo irregularidades menstruales?
                              </label>
                              <Input type="select">
                                <option>Rara vez</option>
                                <option>Frecuentemente</option>
                                <option>Siempre</option>
                                <option>Nunca</option>
                              </Input>
                            </FormGroup>
                          </>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="6">
                      <FormGroup>
                        <label>¿Qué es lo que te describe mejor?</label>
                        <Input type="select">
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
                        <Input type="textarea"></Input>
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Describe tu último almuerzo</label>
                        <Input type="textarea"></Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>Describe tu última merienda</label>
                        <Input type="textarea"></Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>
                          Selecciona la opción que describe mejor tu día típico
                        </label>
                        <Input type="select">
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
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Peso que quisieras alcanzar</label>
                        <Input type="number" placeholder="kg" />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Describe tus objetivos nutricionales</label>
                        <Input type="textarea"></Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="btn-fill" color="primary" type="submit">
                  Guardar
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">ANAMNESIS E HISTORIAL</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Antecendentes no patológicos</label>
                        <Input
                          type="textarea"
                          placeholder="(Hábitos tóxicos, alcohol, tabaco,…)"
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Antecedentes Patológicos</label>
                        <Input
                          type="textarea"
                          placeholder="(Enfermedades o tratornos que ha sufrido o padece)"
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Antecedentes Heredofamiliares</label>
                        <Input
                          type="textarea"
                          placeholder="(Historial familiar de enfermedades)"
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Alergias</label>
                        <Input type="textarea"></Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="btn-fill" color="primary" type="submit">
                  Guardar
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">HÁBITOS Y ACTIVIDAD</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="4">
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
                              <Input type="textarea"></Input>
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
                        <Input type="select">
                          <option>Sí</option>
                          <option>No</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>¿Cómo suele preparar sus comidas?</label>
                        <Input type="select">
                          <option>Las cocina yo mismo</option>
                          <option>Las cocina alguien en casa </option>
                          <option>Yo como en restaurantes</option>
                          <option>
                            Preparación en casa y también como en restaurantes
                          </option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>¿Qué suele desencadenar el pique?</label>
                        <Input
                          type="select"
                          value={pique}
                          onChange={(e) => setPique(e.currentTarget.value)}
                        >
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
                              <Input type="textarea"></Input>
                            </FormGroup>
                          </>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="5">
                      <FormGroup>
                        <label>Preferencias alimentarias</label>
                        <Input type="textarea"></Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>Aversiones alimentarias</label>
                        <Input type="textarea"></Input>
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Nivel de ocupación</label>
                        <Input type="select">
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
                    <Col className="px-md-1" md="5">
                      <FormGroup>
                        <label>
                          ¿Cuándo sientes normalmente la necesidad de comer
                          algo?
                        </label>
                        <Input type="select">
                          <option>Mañanas</option>
                          <option>Tardes</option>
                          <option>Noches</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>
                          ¿Generalmente consume bebidas alcohólicas?
                        </label>
                        <Input type="select">
                          <option>Sí</option>
                          <option>De vez en cuando</option>
                          <option>No</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="btn-fill" color="primary" type="submit">
                  Guardar
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">COMPORTAMIENTO Y NUTRICIÓN</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>
                          ¿Con qué frecuencia tienes pensamientos relacionados
                          con "sentirte gord@"?
                        </label>
                        <Input type="select">
                          <option>Rara vez</option>
                          <option>Frecuentemente</option>
                          <option>Siempre</option>
                          <option>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>
                          ¿Con qué frecuencia tienes temor de subir de peso?
                        </label>
                        <Input type="select">
                          <option>Rara vez</option>
                          <option>Frecuentemente</option>
                          <option>Siempre</option>
                          <option>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>
                          ¿Con qué frecuencia tu autoestima es afectada por tu
                          peso?
                        </label>
                        <Input type="select">
                          <option>Rara vez</option>
                          <option>Frecuentemente</option>
                          <option>Siempre</option>
                          <option>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>

                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>
                          ¿Con qué frecuencia sientes culpa o vergüenza luego de
                          comer?
                        </label>
                        <Input type="select">
                          <option>Rara vez</option>
                          <option>Frecuentemente</option>
                          <option>Siempre</option>
                          <option>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>
                          ¿Con qué frecuencia comienzas dietas especiales con el
                          fin de bajar de peso?
                        </label>
                        <Input type="select">
                          <option>Rara vez</option>
                          <option>Frecuentemente</option>
                          <option>Siempre</option>
                          <option>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>
                          ¿Con qué frecuencia comes grandes cantidades de comida
                          en cortos períodos de tiempo?
                        </label>
                        <Input type="select">
                          <option>Rara vez</option>
                          <option>Frecuentemente</option>
                          <option>Siempre</option>
                          <option>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>

                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>¿Con qué frecuencia escondes comida?</label>
                        <Input type="select">
                          <option>Rara vez</option>
                          <option>Frecuentemente</option>
                          <option>Siempre</option>
                          <option>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>
                          ¿Con qué frecuencia mientes acerca de tus hábitos de
                          comer cuando se te pregunta sobre eso?
                        </label>
                        <Input type="select">
                          <option>Rara vez</option>
                          <option>Frecuentemente</option>
                          <option>Siempre</option>
                          <option>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>
                          ¿Con qué frecuencia te restringes de lo que comes para
                          bajar de peso?
                        </label>
                        <Input type="select">
                          <option>Rara vez</option>
                          <option>Frecuentemente</option>
                          <option>Siempre</option>
                          <option>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>
                          ¿Con qué frecuencia te induces el vómito después de
                          haber comido para no engordar?
                        </label>
                        <Input type="select">
                          <option>Rara vez</option>
                          <option>Frecuentemente</option>
                          <option>Siempre</option>
                          <option>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>
                          ¿Con qué frecuencia usas diuréticos para bajar de peso
                          o no engordar?
                        </label>
                        <Input type="select">
                          <option>Rara vez</option>
                          <option>Frecuentemente</option>
                          <option>Siempre</option>
                          <option>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>
                          ¿Con qué frecuencia necesitas hacer ejercicio para no
                          engordar o bajar de peso?
                        </label>
                        <Input type="select">
                          <option>Rara vez</option>
                          <option>Frecuentemente</option>
                          <option>Siempre</option>
                          <option>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>
                          ¿Con qué frecuencia comes para relajarte y para evitar
                          la ansiedad o la depresión?
                        </label>
                        <Input type="select">
                          <option>Rara vez</option>
                          <option>Frecuentemente</option>
                          <option>Siempre</option>
                          <option>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>
                          ¿Con qué frecuencia comes aún cuando no tienes hambre?
                        </label>
                        <Input type="select">
                          <option>Rara vez</option>
                          <option>Frecuentemente</option>
                          <option>Siempre</option>
                          <option>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>
                          ¿Con qué frecuencia te sientes avergonzado por tu
                          peso?
                        </label>
                        <Input type="select">
                          <option>Rara vez</option>
                          <option>Frecuentemente</option>
                          <option>Siempre</option>
                          <option>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>
                          ¿Con qué frecuencia comes para controlar tus
                          sentimientos?
                        </label>
                        <Input type="select">
                          <option>Rara vez</option>
                          <option>Frecuentemente</option>
                          <option>Siempre</option>
                          <option>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>
                          ¿Con qué frecuencia ayunas para bajar de peso?
                        </label>
                        <Input type="select">
                          <option>Rara vez</option>
                          <option>Frecuentemente</option>
                          <option>Siempre</option>
                          <option>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>
                          ¿Tienes a menudo problemas gastrointestinales?
                        </label>
                        <Input type="select">
                          <option>Rara vez</option>
                          <option>Frecuentemente</option>
                          <option>Siempre</option>
                          <option>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>
                          ¿Con qué frecuencia afecta tu estado de ánimo por tu
                          peso?
                        </label>
                        <Input type="select">
                          <option>Rara vez</option>
                          <option>Frecuentemente</option>
                          <option>Siempre</option>
                          <option>Nunca</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="btn-fill" color="primary" type="submit">
                  Guardar
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserRecord;
