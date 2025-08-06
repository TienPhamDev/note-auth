import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home/Home.jsx";
import "./App.css";
import Login from "./screens/Login/Login.jsx";
import Register from "./screens/Register/Register.jsx";
import Notes from "./screens/Notes/Notes.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />;
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </Router>
  );
}

export default App;
