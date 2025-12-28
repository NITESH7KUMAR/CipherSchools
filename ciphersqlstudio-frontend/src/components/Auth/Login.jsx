import { useState } from "react";
import { loginUser } from "../../api/auth";
import "./Login.scss";

function Login({ onClose, onSwitchToRegister, onLogin }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!identifier || !password) {
      setError("All fields are required");
      return;
    }

    const res = await loginUser(identifier, password);

    if (!res.success) {
      setError(res.message);
      return;
    }

    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));

    onLogin(res.user);
  };

  return (
    <div className="auth-overlay">
      <div className="auth-card">
        <h2>Login</h2>

        <input
          placeholder="Email or Username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button onClick={handleLogin}>Login</button>

        <p>
          Don’t have an account?
          <span onClick={onSwitchToRegister}> Register</span>
        </p>

        <span className="close" onClick={onClose}>
          ×
        </span>
      </div>
    </div>
  );
}

export default Login;
