"use client";
import React, { useState } from "react";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import HomeIcon from "@mui/icons-material/Home";
import { addUser } from "../util/api";

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [error, setError] = useState(""); // Define error state
  const [success, setSuccess] = useState(""); // Define success state

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { firstname, lastname, email, phoneNumber, username, address } = formData;

    if (!firstname.trim() || !lastname.trim()) {
      setError("First name and last name are required.");
      return false;
    }

    if (!username.trim() || !address.trim()) {
      setError("Username and address are required.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      setError("Please enter a valid 10-digit phone number.");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => { // Marked as async
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      await addUser(formData); // Await the API call
      setSuccess("Customer added successfully!");
      setError(""); // Clear any previous error message

      setFormData({
        firstname: "",
        lastname: "",
        username: "",
        address: "",
        phoneNumber: "",
        email: "",
      });
    } catch (error) {
      console.error("Error adding user:", error);
      setError("Error adding customer. Please try again.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "40px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "purple",
          marginBottom: "20px",
          fontSize: "24px",
          fontWeight: "500",
        }}
      >
        Customer Information Form
      </h2>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #ddd",
            paddingBottom: "10px",
          }}
        >
          <PersonIcon style={{ fontSize: "24px", color: "#333", marginRight: "10px" }} />
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
              outline: "none",
            }}
            placeholder="Enter first name"
            required
          />
        </div>

        {/* Last Name */}
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #ddd",
            paddingBottom: "10px",
          }}
        >
          <PersonIcon style={{ fontSize: "24px", color: "#333", marginRight: "10px" }} />
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
              outline: "none",
            }}
            placeholder="Enter last name"
            required
          />
        </div>

        {/* Username */}
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #ddd",
            paddingBottom: "10px",
          }}
        >
          <PersonIcon style={{ fontSize: "24px", color: "#333", marginRight: "10px" }} />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
              outline: "none",
            }}
            placeholder="Enter username"
            required
          />
        </div>

        {/* Address */}
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #ddd",
            paddingBottom: "10px",
          }}
        >
          <HomeIcon style={{ fontSize: "24px", color: "#333", marginRight: "10px" }} />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
              outline: "none",
            }}
            placeholder="Enter address"
            required
          />
        </div>

        {/* Phone Number */}
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #ddd",
            paddingBottom: "10px",
          }}
        >
          <LocalPhoneIcon style={{ fontSize: "24px", color: "#333", marginRight: "10px" }} />
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
              outline: "none",
            }}
            placeholder="Enter phone number"
            required
          />
        </div>

        {/* Email */}
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #ddd",
            paddingBottom: "10px",
          }}
        >
          <MailIcon style={{ fontSize: "24px", color: "#333", marginRight: "10px" }} />
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
              outline: "none",
            }}
            placeholder="Enter email"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "15px",
            backgroundColor: "#8e44ad",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s ease",
          }}
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
