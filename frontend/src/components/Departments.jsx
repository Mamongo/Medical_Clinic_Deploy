import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useTranslation } from "react-i18next";  // Import useTranslation

const Departments = () => {
  const { t } = useTranslation();  // Access the t function for translations

  const departmentsArray = [
    {
      name: t("departments.pediatrics"),  // Use translation key
      imageUrl: "/departments/pedia.jpg",
    },
    {
      name: t("departments.orthopedics"),  // Use translation key
      imageUrl: "/departments/ortho.jpg",
    },
    {
      name: t("departments.cardiology"),  // Use translation key
      imageUrl: "/departments/cardio.jpg",
    },
    {
      name: t("departments.neurology"),  // Use translation key
      imageUrl: "/departments/neuro.jpg",
    },
    {
      name: t("departments.oncology"),  // Use translation key
      imageUrl: "/departments/onco.jpg",
    },
    {
      name: t("departments.radiology"),  // Use translation key
      imageUrl: "/departments/radio.jpg",
    },
    {
      name: t("departments.physicalTherapy"),  // Use translation key
      imageUrl: "/departments/therapy.jpg",
    },
    {
      name: t("departments.dermatology"),  // Use translation key
      imageUrl: "/departments/derma.jpg",
    },
    {
      name: t("departments.ent"),  // Use translation key
      imageUrl: "/departments/ent.jpg",
    },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1, 
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1, 
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1, 
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1, 
    },
  };

  return (
    <div className="container departments">
      <h2>{t("departments.title")}</h2>  {/* Translate "Departments" */}
      <Carousel
        responsive={responsive}
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {departmentsArray.map((depart, index) => {
          return (
            <div key={index} className="card">
              <div className="depart-name">{depart.name}</div>
              <img src={depart.imageUrl} alt="Department" />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Departments;
