import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);

  // Handlelogout function
  const handleLogout = async () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
  };

  // MUI
  // const theme = useTheme();

  return (
    <Box>
      <AppBar sx={{ backgroundColor: "#fb5607" }} position="static">
        <Toolbar>
          <Typography variant="h5" fontSize="40px">
            Recipez
          </Typography>
          <Box
            component="div"
            sx={{
              textAlign: "right",
              width: "100%",
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            {cookies.access_token ? (
              <Link
                to="/auth/login"
                onClick={handleLogout}
                style={{ textDecoration: "none" }}
              >
                <Button variant="customNavbar" sx={{marginRight: 0}} onClick={handleLogout}>Logout</Button>
              </Link>
            ) : (
              <Link to="/auth/login" style={{ textDecoration: "none" }}>
                <Button variant="customNavbar">Login</Button>
              </Link>
            )}
            <Link to="/saved-recipes" style={{ textDecoration: "none" }}>
              <Button variant="customNavbar">Saved Recipes</Button>
            </Link>
            <Link
              to="/create-recipe"
              style={{ textDecoration: "none", alignSelf: "right" }}
            >
              <Button variant="customNavbar">Create Recipe</Button>
            </Link>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button variant="customNavbar">Home</Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
