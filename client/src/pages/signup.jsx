import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useTheme } from "@emotion/react";
import AuthForm from "../components/AuthForm";
import axios from "axios";
import { Container } from "@mui/material";

export const Signup = () => {
  const theme = useTheme();
  
  return (
    <Container
      className="registerContainer"
      sx={{
        height: "94vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: theme.palette.customColor.bg,
        maxWidth: "none !important",
      }}
    >
      <RegisterForm />
    </Container>
  );
};

const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const onSubmit = async (event) => {
      event.preventDefault();
  
      // Using axios to make a post request to server
      try {
        // Register
        await axios.post("https://recipez-server.onrender.com:443/auth/register", {
          username,
          password,
        });
        // Login
        try {
          const response = await axios.post(
            "https://recipez-server.onrender.com:443/auth/login",
            {
              username,
              password,
            }
          );
          // Set accesstoken cookie and then set userID in localStorage
          setCookies("access_token", response.data.token);
          window.localStorage.setItem("userID", response.data.userID);
          navigate("/");
        } catch (err) {
          console.log(err);
          if (err.response.status === 401) {
            setError("Incorrect username or password");
          } else {
            console.log(err);
          }
        }
      } catch (err) {
        if (err.response.status === 400) setError("User already exists");
      }
    };
  
    return (
    <Container id="signupPage" component="section" sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <AuthForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label="Register"
        onSubmit={onSubmit}
        error={error}
      />
      </Container>
    );
  };