import React from 'react';
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { useTranslation } from "react-i18next";  // Import useTranslation

const Footer = () => {
  const { t } = useTranslation();  // Access the t function for translations

  const hours = [
    {
      id: 1,
      day: t("footer.monday"),
      time: t("footer.mondayTime"),
    },
    {
      id: 2,
      day: t("footer.tuesday"),
      time: t("footer.tuesdayTime"),
    },
    {
      id: 3,
      day: t("footer.wednesday"),
      time: t("footer.wednesdayTime"),
    },
    {
      id: 4,
      day: t("footer.thursday"),
      time: t("footer.thursdayTime"),
    },
    {
      id: 5,
      day: t("footer.friday"),
      time: t("footer.fridayTime"),
    },
    {
      id: 6,
      day: t("footer.saturday"),
      time: t("footer.closed"),
    },
    {
      id: 7,
      day: t("footer.sunday"),
      time: t("footer.closed"),
    },
  ];

  return (
    <>
      <footer className={"container"}>
        <hr />
        <div className="content">
          <div>
            <img src="/logo.png" alt="logo" className="logo-img"/>
          </div>
          <div>
            <h4>{t("footer.quickLinks")}</h4>
            <ul>
              <Link to={"/"}>{t("footer.home")}</Link>
              <Link to={"/appointment"}>{t("footer.appointment")}</Link>
              <Link to={"/about"}>{t("footer.about")}</Link>
            </ul>
          </div>
          <div>
            <h4>{t("footer.hours")}</h4>
            <ul>
              {hours.map((element) => (
                <li key={element.id}>
                  <span>{element.day}</span>
                  <span>{element.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>{t("footer.contact")}</h4>
            <div>
              <FaPhone />
              <span>777-777-7777</span>
            </div>
            <div>
              <MdEmail />
              <span>medicalapp@gmail.com</span>
            </div>
            <div>
              <FaLocationArrow />
              <span>{t("footer.location")}</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
