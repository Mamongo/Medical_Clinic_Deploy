import axios from "axios";
import React, { useState } from 'react';
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";  

const MessageForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const { t } = useTranslation();  

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/message/send",
        { firstName, lastName, phone, email, message },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response && response.data) {
        toast.success(response.data.message);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        toast.error(t("messageForm.unexpectedResponse"));
      }
    } catch (error) {
      console.error("Error response:", error.response);
      console.error("Error message:", error.message);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error(t("messageForm.noResponse"));
      } else {
        toast.error(t("messageForm.requestError"));
      }
    }
  };

  return (
    <div className="container form-component message-form">
      <h2>{t("messageForm.sendMessage")}</h2>
      <form onSubmit={handleMessage}>
        <div>
          <input
            type="text"
            placeholder={t("messageForm.firstName")}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder={t("messageForm.lastName")}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder={t("messageForm.email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder={t("messageForm.phone")}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <textarea
          rows={7}
          placeholder={t("messageForm.messagePlaceholder")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">{t("messageForm.sendMessageButton")}</button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;


/*import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const MessageForm = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMessage = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast.error(t("messageForm.validationError"));
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error(t("messageForm.invalidEmail"));
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/message/send",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data?.message) {
        toast.success(response.data.message);
        setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
      } else {
        toast.error(t("messageForm.unexpectedResponse"));
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error(t("messageForm.noResponse"));
      } else {
        toast.error(t("messageForm.requestError"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container form-component message-form">
      <h2>{t("messageForm.sendMessage")}</h2>
      <form onSubmit={handleMessage}>
        <div>
          <input
            type="text"
            name="firstName"
            placeholder={t("messageForm.firstName")}
            value={formData.firstName}
            onChange={handleChange}
            aria-label="First Name"
          />
          <input
            type="text"
            name="lastName"
            placeholder={t("messageForm.lastName")}
            value={formData.lastName}
            onChange={handleChange}
            aria-label="Last Name"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder={t("messageForm.email")}
            value={formData.email}
            onChange={handleChange}
            aria-label="Email"
          />
          <input
            type="tel"
            name="phone"
            placeholder={t("messageForm.phone")}
            value={formData.phone}
            onChange={handleChange}
            aria-label="Phone Number"
          />
        </div>
        <textarea
          rows={7}
          name="message"
          placeholder={t("messageForm.messagePlaceholder")}
          value={formData.message}
          onChange={handleChange}
          aria-label="Message"
        />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <button type="submit" disabled={loading}>
            {loading ? t("messageForm.sending") : t("messageForm.sendMessageButton")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;*/
