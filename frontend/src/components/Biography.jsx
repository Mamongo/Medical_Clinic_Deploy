import React from 'react';
import { useTranslation } from "react-i18next";  // Import useTranslation

const Biography = ({ imageUrl }) => {
  const { t } = useTranslation();  // Access the t function for translations

  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>{t("biography.title")}</p>  {/* Translate Biography */}
          <h3>{t("biography.description")}</h3>  {/* Translate description */}
        </div>
      </div>
    </>
  );
}

export default Biography;
