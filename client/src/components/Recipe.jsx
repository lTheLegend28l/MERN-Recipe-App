import { Typography, Box, Button } from "@mui/material";

export const Recipe = ({
  name,
  ingredients,
  instructions,
  imageUrl,
  cookingTime,
  saveRecipe = () => {},
  isRecipeSaved = false,
  id,
  button
}) => {

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "white",
        color: "black",
        maxWidth: "600px",
        width: "100%",
        borderRadius: "20px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        p: "24px",
        mb: "16px",
        // "@media (max-width: 640px)": {
        //   maxWidth: "50%",
        // },
      }}
    >
      <Typography variant="h4" sx={{ mb: "16px" }}>
        {name}
      </Typography>
      <Box
        component="img"
        src={imageUrl}
        alt={name}
        sx={{
          maxWidth: "80%",
          height: "auto",
          objectFit: "cover",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "20px",
          mb: "16px",
        }}
      />
      <Typography variant="h5" sx={{ mb: "8px" }}>
        Ingredients
      </Typography>
      {ingredients.map(ingredient => 
      (
      <Typography variant="h7" sx={{ mb: "8px" }}>
        {ingredient}
      </Typography>)
      )}
      <Typography variant="h5" sx={{ mb: "8px" }}>
        Instructions
      </Typography>
      <Typography paragraph sx={{ mb: "8px" }}>
        {instructions}
      </Typography>
      <Typography variant="h5" sx={{ mb: "8px" }}>
        Cooking time (minutes): {cookingTime}
      </Typography>
      {button && (isRecipeSaved ? (
        <Button variant="customOutlined" disabled>
          Recipe Saved
        </Button>
      ) : (
        <Button variant="customOutlined" onClick={() => saveRecipe(id)}>
          Save Recipe
        </Button>
      ))}
    </Box>
  );
};
