import { useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [menuOpen, setMenuOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:640px)");

  // Handlelogout function
  const handleLogout = async () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
  };

  return (
    <Box sx={{height: "6vh"}}>
      {!isSmallScreen ? (
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
                  <Button
                    variant="customNavbar"
                    sx={{ marginRight: 0 }}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
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
      ) : (
        <>
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
              <IconButton onClick={() => setMenuOpen(true)}>
                <MenuIcon sx={{color: "white"}}/>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="right"
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        >
          <List> 
            <ListItemButton onClick={() => setMenuOpen(false)}>
            <Link to="/" style={{ textDecoration: "none", color: "#fb5607" }}>
                <Typography>Home</Typography>
            </Link>
            </ListItemButton>
            <ListItemButton onClick={() => setMenuOpen(false)}>
            <Link to="/create-recipe" style={{ textDecoration: "none", color: "#fb5607" }}>
                <Typography>Create Recipe</Typography>
            </Link>
            </ListItemButton>
            <ListItemButton onClick={() => setMenuOpen(false)}>
            <Link to="/saved-recipes" style={{ textDecoration: "none", color: "#fb5607" }}>
                <Typography variant="customNavbar">Saved Recipes</Typography>
              </Link>
            </ListItemButton>
            {cookies.access_token && (
              <ListItemButton onClick={handleLogout}>
                <Link
                  to="/auth/login"
                  onClick={handleLogout}
                  style={{ textDecoration: "none", color: "#fb5607" }}
                >
                  <Typography
                    variant="customNavbar"
                    sx={{ marginRight: 0 }}
                    onClick={handleLogout}
                  >
                    Logout
                  </Typography>
                </Link>
              </ListItemButton>
            )}
            {!cookies.access_token && (
              <ListItemButton onClick={() => setMenuOpen(false)}>
                <Link to="/auth/login" style={{ textDecoration: "none", color: "#fb5607" }}>
                  <Typography variant="customNavbar">Login</Typography>
                </Link>
              </ListItemButton>
            )}
          </List>
        </Drawer>
        </>
      )}
    </Box>
  );
};
