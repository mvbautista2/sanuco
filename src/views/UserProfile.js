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

function UserProfile() {
  const { user } = useAuth0();

  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Información General</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Nombres</label>
                        <Input
                          defaultValue={JSON.stringify(user.name)}
                          placeholder="Company"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Apellidos</label>
                        <Input
                           defaultValue={JSON.stringify(user.name)}
                          placeholder="Last Name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Fecha de nacimiento</label>
                        <Input
                          defaultValue={JSON.stringify(user.birthdate)}
                          type="date"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Usuario</label>
                        <Input
                          defaultValue={JSON.stringify(user.nickname)}
                          placeholder="Username"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="5">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <Input
                          defaultValue={JSON.stringify(user.email)}
                          placeholder="mike@email.com"
                          type="email"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Sexo</label>
                        <Input type="select">
                          <option>Femenino</option>
                          <option>Masculino</option>
                          <option>Otro</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Teléfono</label>
                        <Input
                          type="number"
                          defaultValue={JSON.stringify(user.phone_number)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Dirección</label>
                        <Input type="text" defaultValue={JSON.stringify(user.address)} />
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
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar"
                      src={require("assets/img/emilyz.jpg").default}
                    />
                    <h5 className="title">{JSON.stringify(user.name)}</h5>
                  </a>
                </div>
              </CardBody>
              <CardFooter>
                <div className="button-container">
                  <Button className="btn-icon btn-round" color="facebook">
                    <i className="fab fa-facebook" />
                  </Button>
                  <Button className="btn-icon btn-round" color="twitter">
                    <i className="fab fa-twitter" />
                  </Button>
                  <Button className="btn-icon btn-round" color="google">
                    <i className="fab fa-google-plus" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserProfile;
