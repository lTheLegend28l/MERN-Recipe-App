import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";

export const Navbar = () => {
  const { auth, setAuth } = useAuth();

  // useEffect hook to make api call
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.post("http://localhost:3001/auth/check");
        console.log(response.data);
        if (response.data.authenticated) {
          setAuth(true);
          console.log("Set auth to true");
        } else {
          setAuth(false);
          console.log("Set auth to false");
        }
      } catch (err) {
        console.log(err);
      }
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  // Handlelogout function
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3001/auth/logout");
      console.log("Set auth to false");
      setAuth(false);
      navigate("/auth");
    } catch (err) {
      console.log("Error occured");
      console.log(err);
    }
  };

  return (
    <div className="navbar">
      <Link to="/"> Home</Link>
      <Link to="/create-recipe"> Create Recipe</Link>
      <Link to="/saved-recipes"> Saved Recipes</Link>
      {auth ? (
        <Link onClick={handleLogout}>Logout</Link>
      ) : (
        <Link to="/auth"> Login</Link>
      )}
    </div>
  );
};
