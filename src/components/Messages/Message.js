import React, { useEffect, useState } from "react";
import axios from "axios";
import { size } from "lodash";

import { useAuth0 } from "@auth0/auth0-react";

import { Button, UncontrolledTooltip } from "reactstrap";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const email = window.localStorage.getItem("UserFound");
    if (email) {
      const userNutricionista = JSON.parse(email);
      setEmail(userNutricionista);
    }
  }, []);

  useEffect(() => {
    const emailNutricionista = window.localStorage.getItem("Nutricionista");
    if (emailNutricionista) {
      const email = JSON.parse(emailNutricionista);
      setEmail(email);
    }
  }, []);

  useEffect(() => {
    const email = window.localStorage.getItem("UserFound");
    if (email) {
      const user = JSON.parse(email);
      setUser(user);
    }
  }, []);

  useEffect(async () => {
    const res = await axios.get(
      `https://sanucobackend.herokuapp.com/api/messages/${user}`
    );
    setMessages(res.data);
  }, [messages]);

  useEffect(() => {
    const role = window.localStorage.getItem("Role");
    if (role) {
      const userRole = JSON.parse(role);
      setUserRole(userRole);
    }
  }, []);

  return (
    <>
      {size(messages) === 0 ? (
        <h5>No se han dejado mensajes para el paciente</h5>
      ) : (
        messages.map((message) => (
          <>
            <tr>
              <td>
                <p className="title">{message.title}</p>
                <p className="text-muted">{message.content}</p>
              </td>
              {userRole === "Nutricionista" && (
                <td className="td-actions text-right">
                  <Button
                    color="link"
                    id="tooltip636901683"
                    title=""
                    type="button"
                    onClick={async () => {
                      const res = await axios.delete(
                        "https://sanucobackend.herokuapp.com/api/messages/" +
                          message._id
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
          </>
        ))
      )}
    </>
  );
};

export default Message;
