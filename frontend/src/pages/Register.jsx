import React, { useContext, useState } from 'react'
import axios from "axios"
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Register = () => {
  const { t } = useTranslation();  // Using the translation hook
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:4000/api/v1/user/patient/register",
          { firstName, lastName, email, phone, nic, dob, gender, password, role: "Patient" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setNic("");
          setDob("");
          setGender("");
          setPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="container form-component register-form">
      <h2>{t('register.signUp')}</h2>
      <p>{t('register.signUpToContinue')}</p>
      <form onSubmit={handleRegistration}>
        <div>
          <input
            type="text"
            placeholder={t('register.firstName')}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder={t('register.lastName')}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder={t('register.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder={t('register.mobileNumber')}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder={t('register.nic')}
            value={nic}
            onChange={(e) => setNic(e.target.value)}
          />
          <input
            type={"date"}
            placeholder={t('register.dob')}
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">{t('register.selectGender')}</option>
            <option value="Male">{t('register.male')}</option>
            <option value="Female">{t('register.female')}</option>
          </select>
          <input
            type="password"
            placeholder={t('register.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div style={{ gap: "10px", justifyContent: "flex-end", flexDirection: "row" }}>
          <p style={{ marginBottom: 0 }}>{t('register.alreadyRegistered')}</p>
          <Link
            to={"/signin"}
            style={{ textDecoration: "none", color: "#271776ca" }}
          >
            {t('register.loginNow')}
          </Link>
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">{t('register.register')}</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
