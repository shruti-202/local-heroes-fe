import "./App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import MainLayout from "./layout/MainLayout";
import Category from "./pages/Category";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/category/:categoryName" element={<Category />} />
      </Route>
    </Routes>
  );
};

export default App;
