import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookie, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID"); // Fix typo here
    navigate("/auth");
  };
  return (
    <div
      className="navbar bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <Link to="/">Home</Link>
      <Link to="/auth">Login/Register</Link>
      <Link to="/create-recipe">Create Recipe</Link>
      {!cookie.access_token ? (
        <Link to="/save-recipe">SaveRecipe</Link>
      ) : (
        <button onClick={logout}>LogOut</button>
      )}
    </div>
  );
};
