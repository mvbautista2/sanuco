import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
// react plugin for creating notifications over the dashboard
import TrainingCategory from "../components/Training/TrainingCategory";

// reactstrap components
import { Button, Card, CardBody, CardTitle, Row, Col } from "reactstrap";

export default function Training() {
  const history = useHistory();
  return (
    <>
      <Switch>
        <Route
          path="/admin/training/videos/category/:category"
          component={TrainingCategory}
          exact
        />
      </Switch>
      <div className="content">
        {/* <Recipes/> */}
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <div className="places-buttons">
                  <Row>
                    <Col className="ml-auto mr-auto text-center" md="6">
                      <CardTitle tag="h4">
                        Guía Para Entrenamiento
                        <p className="category">
                          Escoge el tipo de ejercicio que deseas encontrar
                        </p>
                      </CardTitle>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="ml-auto mr-auto" lg="8">
                      <Row>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            value="calentamiento"
                            onClick={() =>
                              history.push(
                                `/admin/training/videos/category/calentamiento`
                              )
                            }
                          >
                            Calentamiento
                          </Button>
                        </Col>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            value="entrenamiento"
                            onClick={() =>
                              history.push(
                                `/admin/training/videos/category/entrenamiento`
                              )
                            }
                          >
                            Entrenamiento
                          </Button>
                        </Col>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            value="estiramiento"
                            onClick={() =>
                              history.push(
                                `/admin/training/videos/category/estiramiento`
                              )
                            }
                          >
                            Estiramiento
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
