import React, { useContext, useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useTranslation } from "react-i18next";  

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const { t } = useTranslation();  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:4000/api/v1/user/login",
          { email, password, confirmPassword, role: "Patient" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="container form-component login-form">
        <h2>{t('login.signIn')}</h2>  
        <p>{t('login.pleaseLogin')}</p>  
        <p>{t('login.description')}</p>  
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder={t('login.email')}  
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder={t('login.password')}  
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder={t('login.confirmPassword')}  
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>{t('login.notRegistered')}</p>  
            <Link
              to={"/register"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              {t('login.registerNow')}  
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">{t('login.loginButton')}</button>  
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
