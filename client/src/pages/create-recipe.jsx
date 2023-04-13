import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Container, Typography, Box, Grid, Button } from "@mui/material";
import { CustomTextField } from "../components/CustomTextField";
import { useTheme } from "@mui/material/styles";

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const navigate = useNavigate();
  const [cookies] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [""],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
    console.log(recipe.ingredients);
  };

  // Update the specific ingredient in the ingredients array of the recipe model
  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  // Add empty string to end of recipe.ingredients array
  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
    console.log(recipe);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("https://recipez-server.onrender.com:443/recipes", recipe, {
        headers: { Authorization: "Bearer " + cookies.access_token },
      });
      alert("Recipe created");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const theme = useTheme();

  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: "94vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: theme.palette.customColor.bg,
        color: "white",
      }}
      disableGutters
    >
      <Box>
        <Typography variant="h3" sx={{ mb: "16px" }}>
          Create Recipe
        </Typography>
      </Box>
      <Box
        mb={2}
        mx={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme.palette.customColor.light,
          boxShadow: "10",
          borderRadius: "20px",
          padding: "4 0",
          "@media (min-width: 640px)": {
            maxWidth: "45vw",
          },
        }}
      >
        <Box
          textAlign="center"
          component="form"
          noValidate
          onSubmit={onSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing="2">
            <Grid xs={12} mb={2}>
              <CustomTextField
                label="Recipe Name"
                name="name"
                onChange={handleChange}
                required
                autoFocus
              />
            </Grid>
            <Grid xs="12" mb={1}>
              <Button variant="customOutlined" onClick={addIngredient}>
                Add Ingredient
              </Button>
            </Grid>
            {recipe.ingredients.map((ingredient, index) => (
              <Grid xs="12" mb={2}>
                <CustomTextField
                  key={index}
                  label="Ingredient"
                  name="ingredients"
                  value={ingredient}
                  onChange={(event) => handleIngredientChange(event, index)}
                />
              </Grid>
            ))}
            <Grid xs="12" mb={2}>
              <CustomTextField
                label="Instructions"
                name="instructions"
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid xs="12" mb={2}>
              <CustomTextField
                label="Image URL"
                name="imageUrl"
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid xs="12" mb={2}>
              <CustomTextField
                label="Cooking Time"
                name="cookingTime"
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid xs="12" mb={2}>
              <Button variant="customOutlined" type="submit">
                Create Recipe
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
