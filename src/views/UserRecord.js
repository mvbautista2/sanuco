import React from "react";

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
                        <label>¿Qué sexo te describe mejor?</label>
                        <Input type="select">
                          <option>Mujer</option>
                          <option>Hombre</option>
                          <option>Intersexual</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>¿Lo que te describe mejor?</label>
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
                    <Col className="px-md-1" md="5">
                      <FormGroup>
                        <label>
                          ¿Cuál de las siguientes opciones describe mejor su
                          almuerzo típico?
                        </label>
                        <Input type="select">
                          <option>Sándwich</option>
                          <option>Ensalada o cuenco de verduras mixtas</option>
                          <option>Proteína con guarnición</option>
                          <option>Sopa</option>
                          <option>Comida rápida</option>
                          <option>Otro</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>
                          ¿Cuál de las siguientes opciones describe mejor su día
                          típico?
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
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>¿Tiene problemas de espalda importantes?</label>
                        <Input type="select">
                          <option>Sí</option>
                          <option>No</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>
                          ¿Está en riesgo de padecer alguno de los siguientes?
                        </label>
                        <Input type="select">
                          <option>
                            Enfermedad cardíaca o accidente cerebrovascular
                          </option>
                          <option>Alta presión sanguínea</option>
                          <option>Diabetes</option>
                          <option>NASH</option>
                          <option> Colesterol alto</option>
                          <option>Asma</option>
                          <option>Insomnio</option>
                          <option>Osteoartritis</option>
                          <option>Nefropatía</option>
                          <option>Depresión</option>
                          <option>Otro</option>
                          <option>Ninguno</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>
                          ¿Alguna vez le han diagnosticado o recibido
                          tratamiento para la diabetes?
                        </label>
                        <Input type="select">
                          <option>Sí</option>
                          <option>No</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="5">
                      <FormGroup>
                        <label>
                          ¿Tiene un diagnóstico activo de un trastorno
                          alimentario (por ejemplo, bulimia, anorexia o un
                          diagnóstico similar)?
                        </label>
                        <Input type="select">
                          <option>Sí</option>
                          <option>No</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>
                          ¿Cuál es tu peso ideal que quieres alcanzar?
                        </label>
                        <Input type="number" placeholder="kg" />
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
                <h5 className="title">HÁBITOS Y COMPORTAMIENTOS</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>
                          ¿Algún acontecimiento de la vida ha provocado un
                          aumento de peso en los últimos años?
                        </label>
                        <Input type="select">
                          <option>Matrimonio o relación</option>
                          <option>El embarazo</option>
                          <option>Trabajo y vida familiar más ocupados</option>
                          <option>Estrés o salud mental</option>
                          <option>Trastorno hormonal o de medicamentos</option>
                          <option>Ninguna de las anteriores</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>
                          ¿Cuánto tiempo ha pasado desde que estuvo en su peso
                          ideal?
                        </label>
                        <Input type="select">
                          <option>0 - 6 meses</option>
                          <option>6 meses - 12 meses</option>
                          <option>3 años</option>
                          <option>Más de 3 años</option>
                        </Input>
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
                  </Row>
                  <Row>
                    
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>¿Tiene alguna limitación física?</label>
                        <Input type="select">
                          <option>Sí</option>
                          <option>No</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="5">
                      <FormGroup>
                        <label>
                          ¿Tiene alguna restricción dietética o alergias
                          alimentarias?
                        </label>
                        <Input type="select">
                          <option>Sí</option>
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
                <h5 className="title">ACTIVIDAD Y NUTRICIÓN</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="3">
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
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>
                          ¿Qué suele desencadenar la necesidad de picar y picar?
                        </label>
                        <Input type="select">
                          <option>Comida a mi alrededor</option>
                          <option>Aburrimiento</option>
                          <option>Hambre</option>
                          <option>Otras personas comiendo bocadillos</option>
                          <option>Algo más</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>¿Qué tan ocupado estás en un día normal?</label>
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
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>
                          ¿Es común que tome una o más bebidas alcohólicas al
                          final del día?
                        </label>
                        <Input type="select">
                          <option>Sí</option>
                          <option>De vez en cuando</option>
                          <option>No</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    
                    
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>¿Cómo suele preparar sus comidas?</label>
                        <Input type="select">
                          <option>Los cocino yo mismo</option>
                          <option>Yo como en restaurantes</option>
                          <option>Hago ambos</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>
                          ¿Sueles estar de pie o sentado la mayor parte del día?
                        </label>
                        <Input type="select">
                          <option>Sí</option>
                          <option>No</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="3">
                      <FormGroup>
                        <label>
                          En la última semana, ¿cuál de estos alimentos ha
                          comido?
                        </label>
                        <Input type="select">
                          <option>Huevos</option>
                          <option>Arroz blanco</option>
                          <option>Pollo</option>
                          <option>Palta</option>
                          <option>Ninguna de las anteriores</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>
                          ¿Anhela o disfruta alguno de los siguientes?
                        </label>
                        <Input type="select">
                          <option>Miel</option>
                          <option>Vino</option>
                          <option>Queso</option>
                          <option>Tocino</option>
                          <option>Ninguna de las anteriores</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>
                          Por último, ¿cuáles de estos alimentos comerías?
                        </label>
                        <Input type="select">
                          <option>Tomates</option>
                          <option>Plátanos</option>
                          <option>Ensaladas verdes</option>
                          <option>Pepinos</option>
                          <option>Ninguna de las anteriores</option>
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
