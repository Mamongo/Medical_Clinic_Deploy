import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();
  const [appointments, setAppointments] = useState([]);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const { isAuthenticated, admin } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointmentRes = await axios.get(
          "https://medical-clinic-deploy-backend1.onrender.com/api/v1/appointment/getall",
          { withCredentials: true }
        );
        setAppointments(appointmentRes.data.appointments);

        const doctorRes = await axios.get(
          "http://localhost:4000/api/v1/doctor/getall",
          { withCredentials: true }
        );
        setTotalDoctors(doctorRes.data.doctors.length);
      } catch (error) {
        setAppointments([]);
        setTotalDoctors(0);
      }
    };
    fetchData();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        "https://medical-clinic-deploy-backend1.onrender.com/api/v1/appointment/update/${appointmentId}",
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId ? { ...appointment, status } : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || t("error.updateStatus"));
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="dashboard page">
      <div className="banner">
        <div className="firstBox">
          <img src="/dashboard.png" alt={t("dashboard.altText")} />
          <div className="content">
            <div>
              <p>{t("dashboard.welcome")},</p>
              <p>{admin?.firstName && admin?.lastName ? `${admin.firstName} ${admin.lastName}` : t("dashboard.admin")}</p>
            </div>
            <p>{t("dashboard.urgentMessages")}: 0</p>
          </div>
        </div>
        <div className="secondBox">
          <p>{t("dashboard.totalAppointments")}</p>
          <h3>{appointments.length}</h3>
        </div>
        <div className="thirdBox">
          <p>{t("dashboard.registeredDoctors")}</p>
          <h3>{totalDoctors}</h3>
        </div>
      </div>
      <div className="banner">
        <h5>{t("dashboard.appointments")}</h5>
        <table>
          <thead>
            <tr>
              <th>{t("dashboard.patient")}</th>
              <th>{t("dashboard.date")}</th>
              <th>{t("dashboard.doctor")}</th>
              <th>{t("dashboard.department")}</th>
              <th>{t("dashboard.status")}</th>
              <th>{t("dashboard.visitedBefore")}</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                  <td>{appointment.appointment_date.substring(0, 16)}</td>
                  <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                  <td>{appointment.department}</td>
                  <td>
                    <select
                      className={`value-${appointment.status.toLowerCase()}`}
                      value={appointment.status}
                      onChange={(e) => handleUpdateStatus(appointment._id, e.target.value)}
                    >
                      <option value="Pending">{t("status.pending")}</option>
                      <option value="Accepted">{t("status.accepted")}</option>
                      <option value="Rejected">{t("status.rejected")}</option>
                    </select>
                  </td>
                  <td>
                    {appointment.hasVisited ? (
                      <GoCheckCircleFill className="green" />
                    ) : (
                      <AiFillCloseCircle className="red" />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">{t("dashboard.noAppointments")}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Dashboard;
