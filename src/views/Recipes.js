import React, { useState } from "react";

import { Route, Switch, useHistory } from "react-router-dom";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import RecipesCategory from "../components/Recipes/RecipesCategory";

function Recipes() {
  const notificationAlertRef = React.useRef(null);

  const history = useHistory();
  return (
    <>
      <Switch>
        <Route
          path="/admin/recipes/recipes/category/:category"
          component={RecipesCategory}
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
                        Recetas Saludables
                        <p className="category">
                          Escoge el tipo de receta que deseas buscar
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
                            value="ensaladas"
                            onClick={() =>
                              history.push(
                                `/admin/recipes/recipes/category/ensaladas`
                              )
                            }
                          >
                            Ensaladas
                          </Button>
                        </Col>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            value="jugos"
                            onClick={() =>
                              history.push(
                                `/admin/recipes/recipes/category/jugos`
                              )
                            }
                          >
                            Jugos
                          </Button>
                        </Col>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            value="refrigerios"
                            onClick={() =>
                              history.push(
                                `/admin/recipes/recipes/category/refrigerios`
                              )
                            }
                          >
                            Refrigerios
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="ml-auto mr-auto" lg="8">
                      <Row>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            value="postres"
                            onClick={() =>
                              history.push(
                                `/admin/recipes/recipes/category/postres`
                              )
                            }
                          >
                            Postres
                          </Button>
                        </Col>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            value="almuerzoscenas"
                            onClick={() =>
                              history.push(
                                `/admin/recipes/recipes/category/almuerzoscenas`
                              )
                            }
                          >
                            Almuerzos y cenas
                          </Button>
                        </Col>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            value="desayunos"
                            onClick={() =>
                              history.push(
                                `/admin/recipes/recipes/category/desayunos`
                              )
                            }
                          >
                            Desayunos
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

export default Recipes;
