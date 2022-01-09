import React from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";

import Recipes from "./Recipes";

// reactstrap components
import {
  Alert,
  UncontrolledAlert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import RecipeDetail from "./RecipeDetail";

function Notifications() {
  const notificationAlertRef = React.useRef(null);
  const notify = (place) => {
    var color = Math.floor(Math.random() * 5 + 1);
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Welcome to <b>Black Dashboard React</b> - a beautiful freebie for
            every web developer.
          </div>
        </div>
      ),
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };
  return (
    <>
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
                        <p className="category">Escoge el tipo de receta que deseas buscar</p>
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
                            //onClick={}
                          >
                            Ensaladas
                          </Button>
                        </Col>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            //onClick={}
                          >
                            Jugos
                          </Button>
                        </Col>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            //onClick={}
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
                           // onClick={}
                          >
                            Postres
                          </Button>
                        </Col>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            //onClick={}
                          >
                            Almuerzos y cenas
                          </Button>
                        </Col>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                           //onClick={}
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

export default Notifications;
