import { useState } from "react";
import { registerUser } from "../../api/auth";
import "./Register.scss";

function Register({ onClose, onSwitchToLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    const res = await registerUser(username, email, password);

    if (!res.success) {
      setError(res.message || "Registration failed");
      return;
    }

    setSuccess("Account created successfully");
    setTimeout(onSwitchToLogin, 1000);
  };

  return (
    <div className="auth-overlay">
      <div className="auth-card">
        <h2>Register</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button onClick={handleRegister}>Create Account</button>

        <p>
          Already have an account?
          <span onClick={onSwitchToLogin}> Login</span>
        </p>

        <span className="close" onClick={onClose}>×</span>
      </div>
    </div>
  );
}

export default Register;
