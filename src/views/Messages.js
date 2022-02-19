import React, { useState, useEffect } from "react";
import axios from "axios";
import { size } from "lodash";
import { Route, Switch, Link } from "react-router-dom";
import MessageForm from "../components/Messages/MessageForm";
import Message from "./Message";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Table,
  UncontrolledTooltip,
} from "reactstrap";

function Messages() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = window.localStorage.getItem("Role");
    if (role) {
      const userRole = JSON.parse(role);
      setUserRole(userRole);
    }
  }, []);
  return (
    <>
      <div className="content">
        <Switch>
          <Route path="/admin/messages/createnew" component={MessageForm} />
        </Switch>
        <Row>
          <Col md="12">
            <Card className="card-tasks">
              <CardHeader>
                <h6 className="title d-inline">Mensajes del nutricionista</h6>
              </CardHeader>

              <CardBody>
                <div className="table-full-width table-responsive">
                  <Table>
                    <tbody>
                      <Message />
                      {userRole === "Nutricionista" && (
                        <Link
                          class="btn btn-primary btn-round"
                          to="/admin/messages/createnew"
                        >
                          + Agregar Mensaje
                        </Link>
                      )}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Messages;
