// Register screen component
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/slices/authSlice";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Registering with", { email, password });
    // Dispatch register action here if you have one
    // For now, just navigate to notes
    try {
      await dispatch(register({ email, password })).unwrap();
      // Navigate to notes after successful registration
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle error appropriately, e.g., show a message to the user
    }
  };
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
