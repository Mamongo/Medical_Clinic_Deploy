import React from 'react';
import { useTranslation } from "react-i18next";  // Import useTranslation

const Hero = ({ title, imageUrl }) => {
  const { t } = useTranslation();  // Access the t function for translations

  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
            {t("hero.description")}
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero"/>
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;
