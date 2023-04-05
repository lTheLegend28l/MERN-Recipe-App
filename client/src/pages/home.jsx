import { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import { Recipe } from "../components/Recipe";
import { Container, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies] = useCookies(["access_token"]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("https://recipez-server.onrender.com:443/recipes", {
          headers: { Authorization: "Bearer " + cookies.access_token },
        });
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `https://recipez-server.onrender.com:443/recipes/savedRecipes/ids/${userID}`,
          { headers: { Authorization: "Bearer " + cookies.access_token } }
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipe();
    fetchRecipe();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "https://recipez-server.onrender.com:443/recipes",
        {
          recipeID: recipeID,
          userID: userID
        },
        { headers: { Authorization: "Bearer " + cookies.access_token } }
      );
      console.log(response);
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes && savedRecipes.includes(id);

  const theme = useTheme();
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: theme.palette.customColor.bg,
        color: "white",
      }}
      disableGutters
    >
      <Box>
        <Typography variant="h3" sx={{ mb: "16px" }}>
          Recipes
        </Typography>
      </Box>
      {recipes.map((recipe) => (
        <Recipe
          id={recipe._id}
          key={recipe._id}
          name={recipe.name}
          saveRecipe={saveRecipe}
          isRecipeSaved={isRecipeSaved(recipe._id)}
          imageUrl={recipe.imageUrl}
          cookingTime={recipe.cookingTime}
          instructions={recipe.instructions}
        />
      ))}
    </Container>
  );
};
