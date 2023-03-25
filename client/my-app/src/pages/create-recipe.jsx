import { useState } from "react";
import axios from "axios";

export const CreateRecipe = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: 0
  });

  const handleChange = (event) => {
    const {name, value} = event.target;
    setRecipe({...recipe, [name]: value});
  }

  // Update the specific ingredient in the ingredients array of the recipe model
  const handleIngredientChange = (event, index) => {
    const {value} = event.target;
    const ingredients = recipe.ingredients;
    ingredients[index] = value;
    setRecipe({...recipe, ingredients})
  }

  // Add empty string to end of recipe.ingredients array
  const addIngredient = (event) => {
    setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]});
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/recipes", recipe);
      alert("Recipe created");
    } catch (err) {
      console.log(err);
    }
  }

  return <div className="create-recipe">
    <h2>CreateRecipe</h2>
    <form onSubmit={onSubmit}>
      <label htmlFor="name"> Name</label>
      <input type="text" id="name" name="name" onChange={handleChange}/>
      <label htmlFor="ingredients">Ingredients</label>
      <button onClick={addIngredient} type="button"> Add Ingredient</button>
      {recipe.ingredients.map((ingredient, index)=> (
        <input key={index} type="text" name="ingredients" value={ingredient} onChange={(event) => handleIngredientChange(event, index)}/>
      ))}
      <label htmlFor="instructions"></label>
      <textarea id="instructions" name="instructions" onChange={handleChange}>Instructions</textarea>
      <label htmlFor="imageUrl">Image URL</label>
      <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange}/>
      <label htmlFor="cookingTime">Cooking Time (minutes)</label>
      <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange}/>
      <button type="submit"> Create Recipe </button>
    </form>
    </div>;
};
