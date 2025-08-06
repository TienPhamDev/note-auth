// Login screen component
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Dispatch login with correct object format
      const result = await dispatch(
        login({ email: email, password: password })
      ).unwrap();

      // Navigate only if login is successful
      if (result) {
        navigate("/notes");
      }
    } catch (error) {
      console.log("Login failed:", error);
      // Error is already handled by Redux state
    }
  };

  return (
    <div>
      <h1>Login</h1>

      {error && <div>Error: {error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
