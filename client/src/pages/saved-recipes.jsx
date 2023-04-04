import { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import { Container, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Recipe } from "../components/Recipe";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies] = useCookies();
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `https://recipez-server.onrender.com/recipes/savedRecipes/${userID}`,
          {
            headers: { Authorization: "Bearer " + cookies.access_token },
          }
        );
        setSavedRecipes(response.data.savedRecipes);
        console.log(savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipe();
  }, [userID, cookies.access_token]);

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
          Saved Recipes
        </Typography>
      </Box>
      {savedRecipes.map((recipe) => (
        <Recipe
          _id={recipe._id}
          name={recipe.name}
          imageUrl={recipe.imageUrl}
          cookingTime={recipe.cookingTime}
          instructions={recipe.instructions}
        />
      ))}
    </Container>
  );
};
