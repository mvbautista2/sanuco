import React, { useState, useEffect } from "react";

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

import Habits from "../components/UserRecord/Habits";
import Anamnesis from "../components/UserRecord/Anamnesis";
import Behavior from "../components/UserRecord/Behavior";
import DemographicProfile from "../components/UserRecord/DemographicProfile";

function UserRecord() {
  const [userRole, setUserRole] = useState(null);
  const [sexo, setSexo] = useState();

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
        <DemographicProfile />
        <Anamnesis />
        <Habits />
        <Behavior />
      </div>
    </>
  );
}

export default UserRecord;
