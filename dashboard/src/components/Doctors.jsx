import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../main';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Doctors = () => {
  const { t } = useTranslation();
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response?.data?.message || t("error.fetchFailed"));
      }
    };
    fetchDoctors();
  }, [t]);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page doctors">
      <h1>{t("doctors.title")}</h1>
      <div className="banner">
        {doctors && doctors.length > 0 ? (
          doctors.map((element) => (
            <div className="card" key={element._id}>
              <img
                src={element.docAvatar?.url}
                alt={t("doctors.avatarAlt")}
              />
              <h4>{`${element.firstName} ${element.lastName}`}</h4>
              <div className="details">
                <p>
                  {t("doctors.email")}: <span>{element.email}</span>
                </p>
                <p>
                  {t("doctors.phone")}: <span>{element.phone}</span>
                </p>
                <p>
                  {t("doctors.dob")}: <span>{element.dob.substring(0, 10)}</span>
                </p>
                <p>
                  {t("doctors.department")}: <span>{element.doctorDepartment}</span>
                </p>
                <p>
                  {t("doctors.nic")}: <span>{element.nic}</span>
                </p>
                <p>
                  {t("doctors.gender")}: <span>{element.gender}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <h1>{t("doctors.noDoctors")}</h1>
        )}
      </div>
    </section>
  );
};

export default Doctors;