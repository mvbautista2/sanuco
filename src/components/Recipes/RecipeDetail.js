import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import { useParams } from "react-router-dom";

import {
  Alert,
  UncontrolledAlert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

export const RecipeDetail = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    image: "",
    _id: "",
    amount: "",
    info: "",
    ingredient: "",
    ingredients: "",
    instructions: "",
    video: "",
    time: "",
  });

  const [informacion, setInformacion] = useState({
    calorias: "",
    carbohidratos: "",
    fibra: "",
    proteinas: "",
    grasa: "",
  });

  const params = useParams();

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `https://sanucobackend.herokuapp.com/api/recipes/${params.id}`
      );
      //console.log(res.data.info[0]);
      setRecipe(res.data);
      setInformacion(res.data.info[0]);
    })();
  });
  return (
    <>
      <div className="row p-5">
        <div className="col-md-3   offset-md-3">
          <ReactPlayer
            width="800px"
            height="400px"
            controls
            url={recipe.video}
          />
        </div>
      </div>

      <div className="row p-5">
        <div className="col-md-4 offset-md-3">
          <div className="card bg-secondary">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="card-img-top"
            />

            <div className="card-body">
              <h1>{recipe.title}</h1>
              <Alert color="danger">
                <span>
                  <b>Cantidad final:</b> {recipe.amount}
                </span>
              </Alert>
              <Alert color="warning">
                <span>
                  <b>Tiempo de preparación:</b> {recipe.time}
                </span>
              </Alert>
              <Alert color="danger">
                <span>
                  <b>Información nutricional/ 1 porción</b>
                </span>
                <br />
                <span>
                  <b>Calorías:</b> {informacion.calorias}
                </span>
                <br />
                <span>
                  <b>Carbohidratos:</b> {informacion.carbohidratos}
                </span>
                <br />
                <span>
                  <b>Fibra:</b> {informacion.fibra}
                </span>
                <br />
                <span>
                  <b>Proteínas:</b> {informacion.proteinas}
                </span>
                <br />
                <span>
                  <b>Grasa:</b> {informacion.grasa}
                </span>
              </Alert>
            </div>
          </div>
        </div>
        <div className="col-md-4 ">
          <div className="card bg-secondary">
            <div className="card-body">
              <Alert color="warning">
                <h3 style={{ color: "white" }}>Ingredientes</h3>
                <span style={{ whiteSpace: "pre-wrap" }}>
                  {recipe.ingredients}
                </span>
              </Alert>
              <Alert color="warning">
                <h3 style={{ color: "white" }}>Instrucciones</h3>
                <span style={{ whiteSpace: "pre-wrap" }}>
                  {recipe.instructions}
                </span>
              </Alert>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;
