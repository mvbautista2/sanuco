import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

import { Button } from "reactstrap";

const FileForm = () => {
  const [file, setFile] = useState();
  const [title, setTitle] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth0();

  const history = useHistory();
  const notify = (place) => {
    const color = "primary";
    var type;
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
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("file", file);
    formData.append("title", title);
    formData.append("user", user.email);

    const res = await axios.post(
      "http://localhost:4000/api/files/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress(progressEvent) {
          const { loaded, total } = progressEvent;
          const percent = parseInt((loaded * 100) / total);
          setUploadPercentage(percent);
        },
      }
    );

    history.push("/admin/icons/");
    console.log(res);
    notify("tc");
  };

  return (
    <div className="col-md-4 offset-md-4">
      {loading && (
        <div className="progress rounded-0">
          <div
            className="progress-bar bg-info"
            role="progressbar"
            style={{ width: `${uploadPercentage}%` }}
          ></div>
        </div>
      )}
      <div className="card">
        <div className="card-body bg-secondary">
          <h3>Subir archivo</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control text-dark my-3"
              placeholder="Título del documento"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="file"
              className="form-control text-dark"
              onChange={handleChange}
            />
            <div className="my-3">
              <Button className="btn btn-fill w-100" color="primary">
                Subir
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FileForm;
