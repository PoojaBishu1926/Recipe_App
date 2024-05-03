import axios from "axios";
import { useEffect, useState } from "react";

export const Home = () => {
  const [recipes, setRecipe] = useState([]);
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipe(response.data);
        console.log(`saved Recipes ${response.data}`);
      } catch (e) {
        console.log(`Error in fetching Recipe ${e}`);
      }
    };
    fetchRecipe();
  }, []);
  return (
    <div className="container text-center mt-5">
      <h1>Recipes</h1>
      <ul className="list-unstyled">
        {recipes.map((recipe) => (
          <li key={recipe._id} className="media mt-3">
            <div className="media-body">
              <h2 className="mt-0">{recipe.name}</h2>
              <p>{recipe.instructions}</p>
              <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} className="ml-3" style={{ maxWidth: '200px' }} />
          </li>
        ))}
      </ul>
    </div>
  );
};
