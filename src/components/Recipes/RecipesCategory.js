import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory} from "react-router-dom";
import { Row } from "reactstrap";

const RecipesCategory = () => {
  const [recipes, setRecipes] = useState([]);
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `http://localhost:4000/api/recipes/category/${params.category}`
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
    </>
  );
};

export default RecipesCategory;
