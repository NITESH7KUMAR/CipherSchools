import "./Navbar.scss";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const showBack = location.pathname.startsWith("/assignment/");

  return (
    <nav className="navbar">
        <span className="brand">CipherSQLStudio</span>
      <div className="nav-right">
        {showBack && (
          <button onClick={() => navigate(-1)}>
            ← Back
          </button>
        )}
        <span className="user">Hi, {user.username}</span>
        <button onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
