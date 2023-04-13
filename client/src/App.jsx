import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { CreateRecipe } from "./pages/create-recipe";
import { SavedRecipes } from "./pages/saved-recipes";
import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    components: {
      MuiButton: {
        variants: [
          {
            props: { variant: "customOutlined" },
            style: {
              outlined: true,
              color: "#fb5607",
              size: "large",
              "&:hover": {
                backgroundColor: "#fb5607",
                color: "white",
              },
            },
          },
          {
            props: { variant: "customNavbar" },
            style: {
              backgroundColor: "#fb5607",
              color: "white",
              borderRadius: "25px",
              marginRight: "20px",
              fontSize: "17px",
              "&:hover": {
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                backgroundColor: "white",
                color: "#fb5607",
              },
            },
          },
        ],
      },
    },
    typography: {
      fontFamily: "Bebas Neue, sans-serif",
    },
    palette: {
      customColor: {
        light: "#F9F7F7",
        lighter: "#DBE2EF",
        darker: "#3F72AF",
        dark: "#112D4E",
        // bg: "linear-gradient(to bottom, #0074D9, #B10DC9)"
        bg: "linear-gradient(to bottom, #fb5607, #ff006e)",
      },
    },
  });

  return (
    <>
      <div className="App">
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <Router>
              <Navbar />
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Signup />} />
                <Route
                  path="/create-recipe"
                  element={
                    <ProtectedRoute>
                      <CreateRecipe />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/saved-recipes"
                  element={
                    <ProtectedRoute>
                      <SavedRecipes />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Router>
          </CssBaseline>
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
