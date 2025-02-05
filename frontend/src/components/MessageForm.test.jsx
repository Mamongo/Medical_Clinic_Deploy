import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MessageForm from "./MessageForm";
import axios from "axios";
import { toast } from "react-toastify";

// Mock axios and toast notifications
jest.mock("axios");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

// Helper function to fill the form
const fillForm = () => {
  fireEvent.change(screen.getByPlaceholderText("messageForm.firstName"), { target: { value: "Yerkhan" } });
  fireEvent.change(screen.getByPlaceholderText("messageForm.lastName"), { target: { value: "Bayanov" } });
  fireEvent.change(screen.getByPlaceholderText("messageForm.email"), { target: { value: "er@gmail.com" } });
  fireEvent.change(screen.getByPlaceholderText("messageForm.phone"), { target: { value: "12345678912" } });
  fireEvent.change(screen.getByPlaceholderText("messageForm.messagePlaceholder"), { target: { value: "Message 12 12" } });
};

describe("MessageForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form elements correctly", () => {
    render(<MessageForm />);

    expect(screen.getByPlaceholderText("messageForm.firstName")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("messageForm.lastName")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("messageForm.email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("messageForm.phone")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("messageForm.messagePlaceholder")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "messageForm.sendMessageButton" })).toBeInTheDocument();
  });

  it("submits the form successfully and resets inputs", async () => {
    axios.post.mockResolvedValueOnce({ data: { message: "Message sent successfully!" } });

    render(<MessageForm />);
    fillForm();
    fireEvent.click(screen.getByRole("button", { name: "messageForm.sendMessageButton" }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:4000/api/v1/message/send",
        {
          firstName: "Yerkhan",
          lastName: "Bayanov",
          email: "er@gmail.com",
          phone: "12345678912",
          message: "Message 12 12",
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      expect(toast.success).toHaveBeenCalledWith("Message sent successfully!");
    });

    // Ensure form fields are cleared after successful submission
    expect(screen.getByPlaceholderText("messageForm.firstName").value).toBe("");
    expect(screen.getByPlaceholderText("messageForm.lastName").value).toBe("");
    expect(screen.getByPlaceholderText("messageForm.email").value).toBe("");
    expect(screen.getByPlaceholderText("messageForm.phone").value).toBe("");
    expect(screen.getByPlaceholderText("messageForm.messagePlaceholder").value).toBe("");
  });

  it("displays an error message on form submission failure", async () => {
    axios.post.mockRejectedValueOnce({ response: { data: { message: "Error sending message." } } });

    render(<MessageForm />);
    fillForm();
    fireEvent.click(screen.getByRole("button", { name: "messageForm.sendMessageButton" }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Error sending message.");
    });
  });

  it("handles unexpected response", async () => {
    axios.post.mockResolvedValueOnce({ data: null });

    render(<MessageForm />);
    fireEvent.click(screen.getByRole("button", { name: "messageForm.sendMessageButton" }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("messageForm.unexpectedResponse");
    });
  });

  it("handles no response from server", async () => {
    axios.post.mockRejectedValueOnce({ request: {} });

    render(<MessageForm />);
    fireEvent.click(screen.getByRole("button", { name: "messageForm.sendMessageButton" }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("messageForm.noResponse");
    });
  });

  it("handles request error (e.g., network failure)", async () => {
    axios.post.mockRejectedValueOnce(new Error("Network Error"));

    render(<MessageForm />);
    fireEvent.click(screen.getByRole("button", { name: "messageForm.sendMessageButton" }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("messageForm.requestError");
    });
  });
});



/*
// MessageForm.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MessageForm from "./MessageForm";
import axios from "axios";
import { toast } from "react-toastify";

// Mock axios and toast notifications
jest.mock("axios");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key, // Mock translation function
  }),
}));

// Helper function to fill the form
const fillForm = () => {
  fireEvent.change(screen.getByPlaceholderText("messageForm.firstName"), { target: { value: "Yerkhan" } });
  fireEvent.change(screen.getByPlaceholderText("messageForm.lastName"), { target: { value: "Bayanov" } });
  fireEvent.change(screen.getByPlaceholderText("messageForm.email"), { target: { value: "er@gmail.com" } });
  fireEvent.change(screen.getByPlaceholderText("messageForm.phone"), { target: { value: "12345678912" } });
  fireEvent.change(screen.getByPlaceholderText("messageForm.messagePlaceholder"), { target: { value: "Message 12 12" } });
};

describe("MessageForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form elements correctly", () => {
    render(<MessageForm />);

    expect(screen.getByPlaceholderText("messageForm.firstName")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("messageForm.lastName")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("messageForm.email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("messageForm.phone")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("messageForm.messagePlaceholder")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "messageForm.sendMessageButton" })).toBeInTheDocument();
  });

  it("submits the form successfully and resets inputs", async () => {
    axios.post.mockResolvedValueOnce({ data: { message: "Message sent successfully!" } });

    render(<MessageForm />);
    fillForm();
    fireEvent.click(screen.getByRole("button", { name: "messageForm.sendMessageButton" }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:4000/api/v1/message/send",
        {
          firstName: "Yerkhan",
          lastName: "Bayanov",
          email: "er@gmail.com",
          phone: "12345678912",
          message: "Message 12 12",
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      expect(toast.success).toHaveBeenCalledWith("Message sent successfully!");
    });

    // Ensure form fields are cleared after successful submission
    expect(screen.getByPlaceholderText("messageForm.firstName").value).toBe("");
    expect(screen.getByPlaceholderText("messageForm.lastName").value).toBe("");
    expect(screen.getByPlaceholderText("messageForm.email").value).toBe("");
    expect(screen.getByPlaceholderText("messageForm.phone").value).toBe("");
    expect(screen.getByPlaceholderText("messageForm.messagePlaceholder").value).toBe("");
  });

  it("displays an error message on form submission failure", async () => {
    axios.post.mockRejectedValueOnce({ response: { data: { message: "Error sending message." } } });

    render(<MessageForm />);
    fillForm();
    fireEvent.click(screen.getByRole("button", { name: "messageForm.sendMessageButton" }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Error sending message.");
    });
  });

  it("handles unexpected response", async () => {
    axios.post.mockResolvedValueOnce({ data: null });

    render(<MessageForm />);
    fireEvent.click(screen.getByRole("button", { name: "messageForm.sendMessageButton" }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("messageForm.unexpectedResponse");
    });
  });

  it("handles no response from server", async () => {
    axios.post.mockRejectedValueOnce({ request: {} });

    render(<MessageForm />);
    fireEvent.click(screen.getByRole("button", { name: "messageForm.sendMessageButton" }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("messageForm.noResponse");
    });
  });

  it("handles request error (e.g., network failure)", async () => {
    axios.post.mockRejectedValueOnce(new Error("Network Error"));

    render(<MessageForm />);
    fireEvent.click(screen.getByRole("button", { name: "messageForm.sendMessageButton" }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("messageForm.requestError");
    });
  });
});*/