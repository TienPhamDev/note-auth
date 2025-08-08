import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    // Clear token from local storage
    navigate("/"); // Redirect to login page after logout
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
