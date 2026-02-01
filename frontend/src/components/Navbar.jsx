import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { logout } from "../utils/auth";
export default function Navbar() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h3>Smart Reconciliation</h3>

      <div className="links">
        <Link to="/dashboard">Dashboard</Link>

        {(role === "Admin" || role === "Analyst") && (
          <Link to="/upload">Upload</Link>
        )}

        <Link to="/reconciliation">Results</Link>

        {role === "Admin" && <Link to="/audit">Audit</Link>}

        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}
