import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory, Route, Switch } from "react-router-dom";
import { Card, CardBody, Row, Col } from "reactstrap";

import RecipeDetail from "./RecipeDetail";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `https://sanucobackend.herokuapp.com/api/recipes/search/${params.ingredient}`
      );
      setRecipes(res.data);
    })();
  });

  return (
    <>
      <div className="content">
        <Row>
          {recipes.map((recipe) => (
            <div className="col-md-4 p-4">
              <div
                className="card bg-secondary"
                onClick={() =>
                  history.push(`/admin/recipes/recipes/${recipe._id}`)
                }
                key={recipe._id}
                type="submit"
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h3>{recipe.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </Row>
      </div>

      {/* <div className="card">
      <Row>
        {recipes.map((recipe) => (
          <Col lg="4">
            <Card className="card-chart">
              <CardBody>
                <div
                  className="chart-area"
                  onClick={() => history.push(`/admin/recipes/recipes/${recipe._id}`)}
                  key={recipe._id}
                  type="submit"
                >
                  <img src={recipe.image} className="img-fluid h-100 w-70" />
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </div> */}
    </>
  );
};

export default Recipes;
