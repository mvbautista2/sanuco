import React, { useEffect, useState } from "react";
import axios from "axios";
import { size } from "lodash";

import {
  Button,
  UncontrolledTooltip,
  NavLink as ReactstrapNavLink,
} from "reactstrap";

const Files = () => {
  const [files, setFiles] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(async () => {
    const res = await axios.get(
      `https://sanuco.herokuapp.com/api/files/${user}`
    );
    setFiles(res.data);
  }, [files]);

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

  return (
    <div className="col-md-12 offset-md-1">
      <div className="card">
        <div className="card-body">
          {size(files) === 0 ? (
            <>
              <h5>No se han adjuntado archivos</h5>
            </>
          ) : (
            files.map((file) => (
              <tbody>
                <tr>
                  <td>{file.title}</td>
                  <td>{file.key}</td>
                  <td>
                    <ReactstrapNavLink href={file.url} target="_blank">
                      <i className="tim-icons icon-cloud-download-93" />
                    </ReactstrapNavLink>
                  </td>
                  {userRole === "Paciente" && (
                    <td>
                      <Button
                        color="link"
                        id="tooltip636901683"
                        title=""
                        type="button"
                        onClick={async () => {
                          const res = await axios.delete(
                            "https://sanuco.herokuapp.com/api/files/" + file._id
                          );
                          console.log(res);
                        }}
                      >
                        <i className="tim-icons icon-trash-simple" />
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        target="tooltip636901683"
                        placement="right"
                      >
                        Eliminar
                      </UncontrolledTooltip>
                    </td>
                  )}
                </tr>
              </tbody>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Files;
