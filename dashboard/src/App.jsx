import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AddNewAdmin from "./components/AddNewAdmin";
import AddNewDoctor from "./components/AddNewDoctor";
import Messages from "./components/Messages";
import Doctors from "./components/Doctors";
import Sidebar from "./components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "./main";
import axios from "axios";
import "./App.css";
import { useTranslation } from "react-i18next";
import "./i18n";

const App = () => {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/admin/me",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, []); 

  return (
    <div>
      {/* Language Selector */}
      <div className="Style">
        <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="pl">Polish</option>
        </select>
      </div>

      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/addnew" element={isAuthenticated ? <AddNewAdmin /> : <Navigate to="/login" />} />
          <Route path="/doctor/addnew" element={isAuthenticated ? <AddNewDoctor /> : <Navigate to="/login" />} />
          <Route path="/doctors" element={isAuthenticated ? <Doctors /> : <Navigate to="/login" />} />
          <Route path="/messages" element={isAuthenticated ? <Messages /> : <Navigate to="/login" />} />
        </Routes>

        <ToastContainer position="top-center" />
      </Router>
    </div>
  );
};

export default App;
