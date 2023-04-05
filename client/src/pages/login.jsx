import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import AuthForm from "../components/AuthForm";
import axios from "axios";
import { Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const Login = () => {

  const theme = useTheme();

  return (
    <Container
      className="loginContainer"
      maxWidth={false}
      sx={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: theme.palette.customColor.bg,
      }}
      disableGutters
    >
      <LoginForm />
    </Container>
  );
};

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setCookies] = useCookies(["access_token"]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    // Using axios to make a post request to server
    try {
      console.log(username, password);
      const response = await axios.post("https://recipez-server.onrender.com:443/auth/login", {
        username,
        password,
      });
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
  };

  return (
    <AuthForm
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      onSubmit={onSubmit}
      error={error}
    />
  );
};
