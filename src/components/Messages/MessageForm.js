import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { Button, Input } from "reactstrap";

const MessageForm = () => {
  const [message, setMessage] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [nutricionista, setNutricionista] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const email = window.localStorage.getItem("UserFound");
    if (email) {
      const user = JSON.parse(email);
      setUser(user);
    }
  }, []);

  useEffect(() => {
    const emailNutricionista = window.localStorage.getItem("Nutricionista");
    if (emailNutricionista) {
      const email = JSON.parse(emailNutricionista);
      setNutricionista(email);
    }
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("content", content);
    formData.append("title", title);
    formData.append("user", user);
    formData.append("nutricionista", nutricionista);

    const res = await axios.post(
      "http://localhost:4000/api/messages/createnew",
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

    history.push("/admin/messages/");
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
          <h3>Nuevo Mensaje</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control text-dark my-3"
              placeholder="Título del mensaje"
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              type="textarea"
              placeholder="Escribe tu mensaje aquí"
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="my-3">
              <Button className="btn btn-fill w-100" color="primary">
                Enviar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessageForm;