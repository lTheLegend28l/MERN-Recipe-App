import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Form from "../components/AuthForm";
import axios from "axios";

export const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setCookies] = useCookies(["access_token"]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    // Using axios to make a post request to server
    try {
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
    <Form
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

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    // Using axios to make a post request to server
    try {
      await axios.post("https://recipez-server.onrender.com:443/auth/register", {
        username,
        password,
      });
      alert("Registration Completed! Now login");
    } catch (err) {
      if (err.response.status === 400) setError("User already exists");
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Register"
      onSubmit={onSubmit}
      error={error}
    />
  );
};
