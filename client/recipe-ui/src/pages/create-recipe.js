import { useState } from "react";
import axios from "axios";
import { useGetUserId } from "../Hooks/useGetUserId";
import {  useNavigate } from "react-router-dom";

export const CreateRecipe = () => {
  const userID = useGetUserId();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    console.log("userOwner value:", recipe.userOwner); // Log the value of userOwner
    setRecipe({ ...recipe, [name]: value });
  };

  const addIngredients = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/recipes", recipe);
      alert("Recipe Created");
      navigate("/")
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <h2 className="card-header text-center bg-primary text-white">
              Create Recipe
            </h2>
            <div className="card-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ingredients" className="form-label">
                    Ingredients
                  </label>
                  {recipe.ingredients.map((ingredient, index) => (
                    <input
                      key={index}
                      type="text"
                      name="Ingredients"
                      value={ingredient}
                      onChange={(event) => handleIngredientChange(event, index)}
                      className="form-control mb-2"
                      placeholder={`Ingredient ${index + 1}`}
                    />
                  ))}
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={addIngredients}
                  >
                    Add Ingredient
                  </button>
                </div>
                <div className="mb-3">
                  <label htmlFor="instructions" className="form-label">
                    Instructions
                  </label>
                  <textarea
                    id="instructions"
                    name="instructions"
                    className="form-control"
                    rows="3"
                    onChange={handleOnChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="imageUrl" className="form-label">
                    Image URL
                  </label>
                  <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    className="form-control"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="cookingTime" className="form-label">
                    Cooking Time (minutes)
                  </label>
                  <input
                    type="number"
                    id="cookingTime"
                    name="cookingTime"
                    className="form-control"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Create Recipe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
