"use client";
import React, { useState, useEffect } from "react";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomeIcon from "@mui/icons-material/Home";

const CustomerFormWithDate = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    date: "", // Date field for customer
  });

  // Set the current date when the component mounts
  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
    setFormData((prev) => ({ ...prev, date: currentDate }));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Customer details submitted successfully!");
    console.log("Customer Data:", formData);
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
      <form onSubmit={handleSubmit}>
        {/* Name */}
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
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
              outline: "none",
            }}
            placeholder="Enter  name"
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
            placeholder="Enter  address"
            required
          />
        </div>

        {/* Phone */}
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
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
              outline: "none",
            }}
            placeholder="Enter  phone number"
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
            placeholder="Enter  email"
            required
          />
        </div>

        {/* Date */}
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #ddd",
            paddingBottom: "10px",
          }}
        >
          <CalendarMonthIcon style={{ fontSize: "24px", color: "#333", marginRight: "10px" }} />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
              backgroundColor: "#f0f0f0",
              outline: "none",
            }}
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
          onMouseOver={(e) => (e.target.style.backgroundColor = "#9b59b6")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#8e44ad")}
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default CustomerFormWithDate;
