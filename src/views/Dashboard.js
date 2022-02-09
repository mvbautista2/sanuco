import React, { useState, useEffect, useRef } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import { size } from "lodash";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

function Dashboard(props) {
  const [bigChartData, setbigChartData] = React.useState("data1");
  const setBgChartData = (name) => {
    setbigChartData(name);
  };

  const [signs, setSigns] = useState([]);
  const [antros, setAntros] = useState([]);
  const [user, setUser] = useState(null);
  const [abierto, setAbierto] = useState(false);
  const [abiertoSigns, setAbiertoSigns] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const openModal = () => {
    setAbierto(true);
  };
  const closeModal = () => {
    setAbierto(false);
  };
  const openModalSigns = () => {
    setAbiertoSigns(true);
  };
  const closeModalSigns = () => {
    setAbiertoSigns(false);
  };

  useEffect(async () => {
    let abortController = new AbortController();
    const res = await axios.get(
      `http://localhost:4000/api/antropometric/${user}`
    );

    setAntros(res.data);
    return () => {
      abortController.abort();
    };
  }, [antros]);

  useEffect(async () => {
    let abortController = new AbortController();
    const res1 = await axios.get(
      `http://localhost:4000/api/vitalSigns/${user}`
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
  const [lastSigns, setLastSigns] = useState();
  const [lastAntro, setLastAntro] = useState();

  useEffect(async () => {
    let abortController = new AbortController();
    const res = await axios.get(
      `http://localhost:4000/api/vitalSigns/lastDate/${user}`
    );
    setLastSigns(res.data[0]);
    return () => {
      abortController.abort();
    };
  }, [lastSigns]);

  useEffect(async () => {
    let abortController = new AbortController();
    const res1 = await axios.get(
      `http://localhost:4000/api/antropometric/lastDate/${user}`
    );

    setLastAntro(res1.data[0]);
    return () => {
      abortController.abort();
    };
  }, [lastAntro]);

  const [estatura, setEstatura] = useState("");
  const [peso, setPeso] = useState("");
  const [sentimiento, setSentimiento] = useState("");
  const [temperatura, setTemperatura] = useState("");
  const [frecuenciaCardiaca, setFrecuenciaCardiaca] = useState("");
  const [frecuenciaRespiratoria, setFrecuenciaRespiratoria] = useState("");
  const [sistolica, setSistolica] = useState("");
  const [diastolica, setDiastolica] = useState("");
  const [cadera, setCadera] = useState("");
  const [cintura, setCintura] = useState("");
  const [saturacionOxigeno, setSaturacionOxigeno] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("estatura", estatura);
    formData.append("peso", peso);
    formData.append("cadera", cadera);
    formData.append("cintura", cintura);
    formData.append("sentimiento", sentimiento);
    formData.append("user", user);

    const res = await axios.post(
      "http://localhost:4000/api/antropometric/createnew",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(res);
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("temperatura", temperatura);
    formData.append("frecuenciaCardiaca", frecuenciaCardiaca);
    formData.append("frecuenciaRespiratoria", frecuenciaRespiratoria);
    formData.append("sistolica", sistolica);
    formData.append("diastolica", diastolica);
    formData.append("saturacionOxigeno", saturacionOxigeno);
    formData.append("user", user);

    const res = await axios.post(
      "http://localhost:4000/api/vitalSigns/createnew",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(res);
  };

  const createdAtA = [];
  const masa = [];
  const pes = [];
  const est = [];
  const cintu = [];
  const cade = [];
  const cinturaCade = [];

  antros.forEach((element) => {
    createdAtA.push(element.createdAt);
    masa.push(element.masaCorporal);
    pes.push(element.peso);
    est.push(element.estatura);
    cintu.push(element.cintura);
    cade.push(element.cadera);
    cinturaCade.push(element.cinturaCadera);
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

  const chartExample2 = {
    data: (canvas) => {
      let ctx = canvas.getContext("2d");

      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
      gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
      gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

      return {
        labels: createdAtA,
        datasets: [
          {
            label: "Cadera",
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
            data: cade,
          },
        ],
      };
    },
    options: chart1_2_options,
  };

  let chartExample3 = {
    data: (canvas) => {
      let ctx = canvas.getContext("2d");

      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
      gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
      gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

      return {
        labels: createdAtA,
        datasets: [
          {
            label: "Cintura",
            fill: true,
            backgroundColor: gradientStroke,
            hoverBackgroundColor: gradientStroke,
            borderColor: "#d048b6",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: cintu,
          },
        ],
      };
    },
    options: {
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
            gridLines: {
              drawBorder: false,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 120,
              padding: 20,
              fontColor: "#9e9e9e",
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e",
            },
          },
        ],
      },
    },
  };
  const chartExample4 = {
    data: (canvas) => {
      let ctx = canvas.getContext("2d");

      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, "rgba(66,134,121,0.15)");
      gradientStroke.addColorStop(0.4, "rgba(66,134,121,0.0)"); //green colors
      gradientStroke.addColorStop(0, "rgba(66,134,121,0)"); //green colors

      return {
        labels: createdAtA,
        datasets: [
          {
            label: "Estatura",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#00d6b4",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#00d6b4",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#00d6b4",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: est,
          },
        ],
      };
    },
    options: {
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
              suggestedMin: 50,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9e9e9e",
            },
          },
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(0,242,195,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e",
            },
          },
        ],
      },
    },
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
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Cadera</h5>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Cintura</h5>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={chartExample3.data}
                    options={chartExample3.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Estatura</h5>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample4.data}
                    options={chartExample4.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Últimos signos antropométricos</CardTitle>
              </CardHeader>
              {/* <form onSubmit={handleSubmit}> */}
              <CardBody>
                <Row>
                  <Col className="pr-md-1" md="3">
                    <FormGroup>
                      <label>Estatura</label>
                      <Input
                        // defaultValue={
                        //   size(antros) === 0 ? 0 : lastAntro.estatura
                        // }
                        // defaultValue={lastAntro.estatura}

                        placeholder="m"
                        type="number"
                        step="0.01"
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="3">
                    <FormGroup>
                      <label>Peso</label>
                      <Input
                        placeholder="kg"
                        type="number"
                        step="0.01"
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Índice de Masa Corporal</label>
                      <Input
                        disabled
                        type="number"
                        placeholder="kg/m2"
                        step="0.01"
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="3">
                    <FormGroup>
                      <label>Cintura</label>
                      <Input
                        placeholder="cm"
                        type="number"
                        step="0.01"
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="3">
                    <FormGroup>
                      <label>Cadera</label>
                      <Input placeholder="cm" type="number" disabled />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Índice Cintura Cadera</label>
                      <Input disabled type="number" disabled />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Con estas medidas me siento</label>
                      <Input type="text" disabled></Input>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                {userRole === "Paciente" && (
                  <Button
                    className="btn-fill"
                    color="primary"
                    type="submit"
                    onClick={openModal}
                  >
                    Actualizar
                  </Button>
                )}
              </CardFooter>
              {/* </form> */}
            </Card>
          </Col>

          <Modal isOpen={abierto}>
            <Col lg="12" md="12">
              <Card>
                <ModalHeader>
                  <CardHeader>
                    <CardTitle tag="h4">
                      Actualizar últimos signos antropométricos
                    </CardTitle>
                    <button
                      aria-label="Close"
                      className="close"
                      onClick={closeModal}
                    >
                      <i className="tim-icons icon-simple-remove" />
                    </button>
                  </CardHeader>
                </ModalHeader>
                <ModalBody>
                  <form onSubmit={handleSubmit}>
                    <CardBody>
                      <Row>
                        <Col className="pr-md-1" md="3">
                          <FormGroup>
                            <label>Estatura</label>
                            <Input
                              // defaultValue={
                              //   size(antros) === 0 ? 0 : lastAntro.estatura
                              // }
                              // defaultValue={lastAntro.estatura}
                              placeholder="m"
                              type="number"
                              step="0.01"
                              onChange={(e) => setEstatura(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pr-md-1" md="3">
                          <FormGroup>
                            <label>Peso</label>
                            <Input
                              placeholder="kg"
                              type="number"
                              step="0.01"
                              onChange={(e) => setPeso(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pr-md-1" md="6">
                          <FormGroup>
                            <label>Índice de Masa Corporal</label>
                            <Input
                              disabled
                              type="number"
                              placeholder="kg/m2"
                              step="0.01"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pr-md-1" md="3">
                          <FormGroup>
                            <label>Cintura</label>
                            <Input
                              placeholder="cm"
                              type="number"
                              step="0.01"
                              onChange={(e) => setCintura(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pr-md-1" md="3">
                          <FormGroup>
                            <label>Cadera</label>
                            <Input
                              placeholder="cm"
                              type="number"
                              onChange={(e) => setCadera(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pr-md-1" md="6">
                          <FormGroup>
                            <label>Índice Cintura Cadera</label>
                            <Input disabled type="number" />
                          </FormGroup>
                        </Col>
                        <Col className="pr-md-1" md="6">
                          <FormGroup>
                            <label>Con estas medidas me siento</label>
                            <Input
                              type="select"
                              value={sentimiento}
                              onChange={(e) =>
                                setSentimiento(e.currentTarget.value)
                              }
                            >
                              <option>Feliz</option>
                              <option>Triste</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
                    <ModalFooter>
                      <CardFooter>
                        <Button
                          className="btn-fill"
                          color="primary"
                          type="submit"
                        >
                          Guardar
                        </Button>
                      </CardFooter>
                    </ModalFooter>
                  </form>
                </ModalBody>
              </Card>
            </Col>
          </Modal>

          <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Últimos signos vitales</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col className="pr-md-1" md="3">
                    <FormGroup>
                      <label>Temperatura</label>
                      <Input
                        placeholder="ºC"
                        type="number"
                        step="0.01"
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="4">
                    <FormGroup>
                      <label>Frecuencia Cardiaca</label>
                      <Input
                        placeholder="Latidos por minuto"
                        type="number"
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="4">
                    <FormGroup>
                      <label>Frecuencia Respiratoria</label>
                      <Input
                        placeholder="Respiraciones por minuto"
                        type="number"
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="3">
                    <FormGroup>
                      <label>Sistólica</label>
                      <Input placeholder="mmHg" type="number" disabled />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="3">
                    <FormGroup>
                      <label>Diastólica</label>
                      <Input placeholder="mmHg" type="number" disabled />
                    </FormGroup>
                  </Col>

                  <Col className="pr-md-1" md="5">
                    <FormGroup>
                      <label>Saturación de oxígeno</label>
                      <Input placeholder="00" type="number  " disabled />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>

              <CardFooter>
              {userRole === "Paciente" && (
                  <Button
                    className="btn-fill"
                    color="primary"
                    type="submit"
                    onClick={openModalSigns}
                  >
                    Actualizar
                  </Button>
                )}
              </CardFooter>
            </Card>
            <Modal isOpen={abiertoSigns}>
              <Card>
                <ModalHeader>
                  <CardHeader>
                    <CardTitle tag="h4">
                      Actualiza últimos signos vitales
                    </CardTitle>
                  </CardHeader>
                  <button
                    aria-label="Close"
                    className="close"
                    onClick={closeModalSigns}
                  >
                    <i className="tim-icons icon-simple-remove" />
                  </button>
                </ModalHeader>
                <ModalBody>
                  <form onSubmit={handleSubmit1}>
                    <CardBody>
                      <Row>
                        <Col className="pr-md-1" md="3">
                          <FormGroup>
                            <label>Temperatura</label>
                            <Input
                              placeholder="ºC"
                              type="number"
                              step="0.01"
                              onChange={(e) => setTemperatura(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pr-md-1" md="4">
                          <FormGroup>
                            <label>Frecuencia Cardiaca</label>
                            <Input
                              placeholder="Latidos por minuto"
                              type="number"
                              onChange={(e) =>
                                setFrecuenciaCardiaca(e.target.value)
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pr-md-1" md="4">
                          <FormGroup>
                            <label>Frecuencia Respiratoria</label>
                            <Input
                              placeholder="Respiraciones por minuto"
                              type="number"
                              onChange={(e) =>
                                setFrecuenciaRespiratoria(e.target.value)
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pr-md-1" md="3">
                          <FormGroup>
                            <label>Sistólica</label>
                            <Input
                              placeholder="mmHg"
                              type="number"
                              onChange={(e) => setSistolica(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pr-md-1" md="3">
                          <FormGroup>
                            <label>Diastólica</label>
                            <Input
                              placeholder="mmHg"
                              type="number"
                              onChange={(e) => setDiastolica(e.target.value)}
                            />
                          </FormGroup>
                        </Col>

                        <Col className="pr-md-1" md="5">
                          <FormGroup>
                            <label>Saturación de oxígeno</label>
                            <Input
                              placeholder="00"
                              type="number  "
                              onChange={(e) =>
                                setSaturacionOxigeno(e.target.value)
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
                    <ModalFooter>
                      <CardFooter>
                        <Button
                          className="btn-fill"
                          color="primary"
                          type="submit"
                        >
                          Guardar
                        </Button>
                      </CardFooter>
                    </ModalFooter>
                  </form>
                </ModalBody>
              </Card>
            </Modal>
          </Col>
          {userRole === "Paciente" && (
                  <Col lg="6" md="12">
                  <Card className="card-tasks">
                    <CardHeader>
                      <h6 className="title d-inline">Mensajes(#)</h6>
                      <UncontrolledDropdown>
                        <DropdownToggle
                          caret
                          className="btn-icon"
                          color="link"
                          data-toggle="dropdown"
                          type="button"
                        >
                          <i className="tim-icons icon-settings-gear-63" />
                        </DropdownToggle>
                        <DropdownMenu aria-labelledby="dropdownMenuLink" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Something else
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </CardHeader>
                    <CardBody>
                      <div className="table-full-width table-responsive">
                        <Table>
                          <tbody>
                            <tr>
                              <td>
                                <FormGroup check>
                                  <Label check>
                                    <Input defaultValue="" type="checkbox" />
                                    <span className="form-check-sign">
                                      <span className="check" />
                                    </span>
                                  </Label>
                                </FormGroup>
                              </td>
                              <td>
                                <p className="title">Update the Documentation</p>
                                <p className="text-muted">
                                  Dwuamish Head, Seattle, WA 8:47 AM
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <FormGroup check>
                                  <Label check>
                                    <Input
                                      defaultChecked
                                      defaultValue=""
                                      type="checkbox"
                                    />
                                    <span className="form-check-sign">
                                      <span className="check" />
                                    </span>
                                  </Label>
                                </FormGroup>
                              </td>
                              <td>
                                <p className="title">GDPR Compliance</p>
                                <p className="text-muted">
                                  The GDPR is a regulation that requires businesses to
                                  protect the personal data and privacy of Europe
                                  citizens for transactions that occur within EU
                                  member states.
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <FormGroup check>
                                  <Label check>
                                    <Input defaultValue="" type="checkbox" />
                                    <span className="form-check-sign">
                                      <span className="check" />
                                    </span>
                                  </Label>
                                </FormGroup>
                              </td>
                              <td>
                                <p className="title">Solve the issues</p>
                                <p className="text-muted">
                                  Fifty percent of all respondents said they would be
                                  more likely to shop at a company
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <FormGroup check>
                                  <Label check>
                                    <Input defaultValue="" type="checkbox" />
                                    <span className="form-check-sign">
                                      <span className="check" />
                                    </span>
                                  </Label>
                                </FormGroup>
                              </td>
                              <td>
                                <p className="title">Release v2.0.0</p>
                                <p className="text-muted">
                                  Ra Ave SW, Seattle, WA 98116, SUA 11:19 AM
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <FormGroup check>
                                  <Label check>
                                    <Input defaultValue="" type="checkbox" />
                                    <span className="form-check-sign">
                                      <span className="check" />
                                    </span>
                                  </Label>
                                </FormGroup>
                              </td>
                              <td>
                                <p className="title">Export the processed files</p>
                                <p className="text-muted">
                                  The report also shows that consumers will not easily
                                  forgive a company once a breach exposing their
                                  personal data occurs.
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <FormGroup check>
                                  <Label check>
                                    <Input defaultValue="" type="checkbox" />
                                    <span className="form-check-sign">
                                      <span className="check" />
                                    </span>
                                  </Label>
                                </FormGroup>
                              </td>
                              <td>
                                <p className="title">Arival at export process</p>
                                <p className="text-muted">
                                  Capitol Hill, Seattle, WA 12:34 AM
                                </p>
                              </td>
                            </tr>
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
