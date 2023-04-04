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
        height: "90vh",
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
  
    const onSubmit = async (event) => {
      event.preventDefault();
  
      // Using axios to make a post request to server
      try {
        await axios.post("https://recipez-server.onrender.com/auth/register", {
          username,
          password,
        });
        alert("Registration Completed! Now login");
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