import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import AssignmentList from "./pages/AssignmentList";
import AssignmentAttempt from "./pages/AssignmentAttempt";
import Home from "./pages/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <>
      {user && <Navbar user={user} onLogout={handleLogout} />}

      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <AssignmentList />
            ) : (
              <Home onLoginClick={() => setShowLogin(true)} />
            )
          }
        />

        <Route
          path="/assignment/:id"
          element={
            <ProtectedRoute user={user}>
              <AssignmentAttempt />
            </ProtectedRoute>
          }
        />
      </Routes>

      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onLogin={(userData) => {
            setUser(userData);
            setShowLogin(false);
          }}
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {showRegister && (
        <Register
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
    </>
  );
}

export default App;
