import React, { useEffect, useState } from "react";
import axios from "axios";
import { size } from "lodash";

import { useAuth0 } from "@auth0/auth0-react";

import {
  Button,
  UncontrolledTooltip,
  NavLink as ReactstrapNavLink,
} from "reactstrap";

const Files = () => {
  const [files, setFiles] = useState([]);
  const { user } = useAuth0();

  useEffect(async () => {
    const res = await axios.get(
      `http://localhost:4000/api/files/${user.email}`
    );
    setFiles(res.data);
  }, [files]);


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
                  <td>
                    <Button
                      color="link"
                      id="tooltip636901683"
                      title=""
                      type="button"
                      onClick={async () => {
                        const res = await axios.delete(
                          "http://localhost:4000/api/files/" + file._id
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
