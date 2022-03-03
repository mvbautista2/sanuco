import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line } from "react-chartjs-2";
import axios from "axios";
import LastAntros from "../components/Dashboard/LastAntros";
import LastSigns from "../components/Dashboard/LastSigns";
import Message from "../components/Messages/Message";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

function Dashboard(props) {
  const [bigChartData, setbigChartData] = React.useState("data1");
  const setBgChartData = (name) => {
    setbigChartData(name);
  };
  const [showText, setShowText] = useState(false);
  const handleMouseOver = () => {
    setShowText(true);
  };
  const handleMouseLeave = () => {
    setShowText(false);
  };

  const [signs, setSigns] = useState([]);
  const [antros, setAntros] = useState([]);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(async () => {
    let abortController = new AbortController();
    const res = await axios.get(
      `https://sanuco-back-end-uxuex.ondigitalocean.app/api/antropometric/${user}`
    );

    setAntros(res.data);
    return () => {
      abortController.abort();
    };
  }, [antros]);

  useEffect(async () => {
    let abortController = new AbortController();
    const res1 = await axios.get(
      `https://sanuco-back-end-uxuex.ondigitalocean.app/api/vitalSigns/${user}`
    );

    setSigns(res1.data);
    return () => {
      abortController.abort();
    };
  }, [signs]);

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

  const createdAtA = [];
  const masa = [];
  const pes = [];
  const est = [];
  const cintu = [];
  const cade = [];
  const cinturaCade = [];
  const feel = [];

  antros.forEach((element) => {
    createdAtA.push(element.createdAt);
    masa.push(element.masaCorporal);
    pes.push(element.peso);
    est.push(element.estatura);
    cintu.push(element.cintura);
    cade.push(element.cadera);
    cinturaCade.push(element.cinturaCadera);
    feel.push(element.sentimiento);
  });

  const chart1_2_options = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.0)",
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9a9a9a",
          },
        },
      ],
      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.1)",
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a",
          },
        },
      ],
    },
  };

  const chartExample1 = {
    data1: (canvas) => {
      let ctx = canvas.getContext("2d");

      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
      gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
      gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

      return {
        labels: createdAtA,
        datasets: [
          {
            label: "Masa Corporal",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: masa,
          },
        ],
      };
    },
    data2: (canvas) => {
      let ctx = canvas.getContext("2d");

      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
      gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
      gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

      return {
        labels: createdAtA,
        datasets: [
          {
            label: "Peso",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: pes,
          },
        ],
      };
    },
    data3: (canvas) => {
      let ctx = canvas.getContext("2d");

      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
      gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
      gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

      return {
        labels: createdAtA,
        datasets: [
          {
            label: "ICC",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: cinturaCade,
          },
        ],
      };
    },
    options: chart1_2_options,
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Gráfica</h5>
                    <CardTitle tag="h2">Últimos cambios</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data1",
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => setBgChartData("data1")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Masa Corporal
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="1"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data2",
                        })}
                        onClick={() => setBgChartData("data2")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Peso
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-gift-2" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="2"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data3",
                        })}
                        onClick={() => setBgChartData("data3")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          ICC
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample1[bigChartData]}
                    options={chart1_2_options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Sentimientos</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      {antros.map((fecha) => (
                        <>
                          <th>
                            {new Date(fecha.createdAt).toLocaleDateString()}
                          </th>
                        </>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {antros.map((sentimiento) => (
                      <>
                        <td
                          onMouseOver={handleMouseOver}
                          onMouseLeave={handleMouseLeave}
                        >
                          {sentimiento.sentimiento === "Feliz" ? (
                            <img
                              alt="..."
                              src={require("assets/img/smile.png").default}
                              className="avatar"
                            />
                          ) : sentimiento.sentimiento === "Triste" ? (
                            <img
                              alt="..."
                              src={require("assets/img/triste.png").default}
                              className="avatar"
                            />
                          ) : sentimiento.sentimiento === "Normal" ? (
                            <img
                              alt="..."
                              src={require("assets/img/neutral.png").default}
                              className="avatar"
                            />
                          ) : sentimiento.sentimiento === "Tranquil@" ? (
                            <img
                              alt="..."
                              src={require("assets/img/tranquilo.png").default}
                              className="avatar"
                            />
                          ) : sentimiento.sentimiento === "Preocupad@" ? (
                            <img
                              alt="..."
                              src={require("assets/img/preocupado.png").default}
                              className="avatar"
                            />
                          ) : (
                            "No registrado"
                          )}
                          {showText && <> {sentimiento.sentimiento}</>}
                        </td>
                      </>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <LastSigns />
          <LastAntros />
          {userRole === "Paciente" && (
            <Col lg="6" md="12">
              <Card className="card-tasks">
                <CardHeader>
                  <h6 className="title d-inline">Mensajes</h6>
                </CardHeader>
                <CardBody>
                  <div className="table-full-width table-responsive">
                    <Table>
                      <tbody>
                        <Message />
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          )}
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
