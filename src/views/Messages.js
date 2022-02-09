import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";
import FileForm from "./FileForm";
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
                      <tr>
                        <td>
                          <Message />
                          {userRole === "Nutricionista" && (
                            <Link
                              class="btn btn-primary btn-round"
                              to="/admin/icons/upload"
                            >
                              + Agregar Mensaje
                            </Link>
                          )}
                        </td>
                        <td className="td-actions text-right"></td>
                      </tr>
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
