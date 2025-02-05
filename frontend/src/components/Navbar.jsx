import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useTranslation } from "react-i18next";  // Import useTranslation

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const { t, i18n } = useTranslation();  // Use t and i18n from useTranslation

  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/patient/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();

  const goToLogin = () => {
    navigateTo("/login");
  };

  // Change language handler
  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <>
      <nav className={"container"}>
        <div className="logo">
          <img src="/logo.png" alt="logo" className="logo-img" />
        </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            <Link to={"/"} onClick={() => setShow(!show)}>
              {t("navbar.home")}
            </Link>
            <Link to={"/appointment"} onClick={() => setShow(!show)}>
              {t("navbar.appointment")}
            </Link>
            <Link to={"/about"} onClick={() => setShow(!show)}>
              {t("navbar.aboutUs")}
            </Link>
          </div>
          
          {/* Language Selector */}
          <div className="Style">
            <select onChange={handleLanguageChange}>
              <option value="en">English</option>
              <option value="pl">Polski</option>
            </select>
          </div>

          {isAuthenticated ? (
            <button className="logoutBtn btn" onClick={handleLogout}>
              {t("navbar.logout")}
            </button>
          ) : (
            <button className="loginBtn btn" onClick={goToLogin}>
              {t("navbar.login")}
            </button>
          )}
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
