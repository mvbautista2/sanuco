import React, {useEffect, useState} from "react";
import { Route, Switch, Link } from "react-router-dom";
import FileForm from "./FileForm";
import Files from "./Files";
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

function Icons() {
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
          <Route path="/admin/icons/upload" component={FileForm} />
        </Switch>
        <Row>
          <Col md="12">
            <Card className="card-tasks">
              <CardHeader>
                <h6 className="title d-inline">Archivos</h6>
              </CardHeader>

              <CardBody>
                <div className="table-full-width table-responsive">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          <Files />
                          {userRole === "Paciente" && (
                            <Link
                              class="btn btn-primary btn-round"
                              to="/admin/icons/upload"
                            >
                              + Adjuntar Archivo
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

export default Icons;
