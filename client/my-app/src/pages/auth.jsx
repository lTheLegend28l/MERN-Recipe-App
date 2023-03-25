import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Form from "../components/authform";
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
  const [error, setError] = useState("");
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    // Using axios to make a post request to server
    try {
      await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });
      // Successful login response
      setAuth(true);
      console.log("Set auth to true");
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

  const onSubmit = async (event) => {
    event.preventDefault();

    // Using axios to make a post request to server
    try {
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      alert("Registration Completed! Now login");
    } catch (err) {
      console.log(err);
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
    />
  );
};
