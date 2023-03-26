import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);

  // Handlelogout function
  const handleLogout = async () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
  };

  return (
    <div className="navbar">
      <Link to="/"> Home</Link>
      <Link to="/create-recipe"> Create Recipe</Link>
      <Link to="/saved-recipes"> Saved Recipes</Link>
      {cookies.access_token ? (
        <Link to="/auth" onClick={handleLogout}>
          Logout
        </Link>
      ) : (
        <Link to="/auth"> Login</Link>
      )}
    </div>
  );
};
