import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../main';
import { useTranslation } from "react-i18next";

const Messages = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/message/getall",
          { withCredentials: true }
        );
        setMessages(data.messages);
      } catch (error) {
        console.log(error.response?.data?.message || t("error.fetchFailed"));
      }
    };
    fetchMessages();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page messages">
      <h1>{t("messages.title")}</h1>
      <div className="banner">
        {messages && messages.length > 0 ? (
          messages.map((element) => {
            return (
              <div className="card" key={element._id}>
                <div className="details">
                  <p>
                    {t("messages.firstName")}: <span>{element.firstName}</span>
                  </p>
                  <p>
                    {t("messages.lastName")}: <span>{element.lastName}</span>
                  </p>
                  <p>
                    {t("messages.email")}: <span>{element.email}</span>
                  </p>
                  <p>
                    {t("messages.phone")}: <span>{element.phone}</span>
                  </p>
                  <p>
                    {t("messages.message")}: <span>{element.message}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>{t("messages.noMessages")}</h1>
        )}
      </div>
    </section>
  );
};

export default Messages;