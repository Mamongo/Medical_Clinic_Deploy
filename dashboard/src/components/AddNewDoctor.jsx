import React, { useContext, useState } from 'react';
import { Context } from '../main';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const AddNewDoctor = () => {
  const { t } = useTranslation(); // Initialize useTranslation
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");

  const navigateTo = useNavigate();

  const departmentsArray = [
    t("doctor.pediatrics"),
    t("doctor.orthopedics"),
    t("doctor.cardiology"),
    t("doctor.neurology"),
    t("doctor.oncology"),
    t("doctor.radiology"),
    t("doctor.physicalTherapy"),
    t("doctor.dermatology"),
    t("doctor.ent"),
  ];

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };
  };

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("nic", nic);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("doctorDepartment", doctorDepartment);
      formData.append("docAvatar", docAvatar);
      await axios
        .post("https://medical-clinic-deploy-backend1.onrender.com/api/v1/user/doctor/addnew", formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
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
      toast.error(error.response?.data?.message || t("error.fetchFailed"));
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className="page">
        <section className="container add-doctor-form">
          <img src="/logo.png" alt="logo" className="logo" />
          <h1 className="form-title">{t("doctor.title")}</h1>
          <form onSubmit={handleAddNewDoctor}>
            <div className="first-wrapper">
              <div>
                <img
                  src={docAvatarPreview ? `${docAvatarPreview}` : "/docHolder.jpg"}
                  alt="Doctor Avatar"
                />
                <input type="file" onChange={handleAvatar} />
              </div>
              <div>
                <input
                  type="text"
                  placeholder={t("doctor.firstName")}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder={t("doctor.lastName")}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder={t("doctor.email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="number"
                  placeholder={t("doctor.phone")}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  type="number"
                  placeholder={t("doctor.nic")}
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
                />
                <input
                  type={"date"}
                  placeholder={t("doctor.dob")}
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">{t("doctor.selectGender")}</option>
                  <option value="Male">{t("doctor.male")}</option>
                  <option value="Female">{t("doctor.female")}</option>
                </select>
                <input
                  type="password"
                  placeholder={t("doctor.password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <select
                  value={doctorDepartment}
                  onChange={(e) => {
                    setDoctorDepartment(e.target.value);
                  }}
                >
                  <option value="">{t("doctor.selectDepartment")}</option>
                  {departmentsArray.map((depart, index) => {
                    return (
                      <option value={depart} key={index}>
                        {depart}
                      </option>
                    );
                  })}
                </select>
                <button type="submit">{t("doctor.submit")}</button>
              </div>
            </div>
          </form>
        </section>
      </section>
    </>
  );
};

export default AddNewDoctor;
