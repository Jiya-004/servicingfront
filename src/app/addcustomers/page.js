"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { addUser } from "../util/api"; // Assuming this handles the API call
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import HomeIcon from "@mui/icons-material/Home";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "", // Added password field
    role: "user",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); // State for dialog
  const router = useRouter();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { firstName, lastName, email, phoneNumber, username, address, password } = formData;

    if (!firstName.trim() || !lastName.trim()) {
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

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      await addUser(formData);
      setSuccess("Customer added successfully!");
      setError("");

      // Reset form data
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        address: "",
        phoneNumber: "",
        email: "",
        password: "", // Reset password after submission
        role: "user",
      });

      // Show success dialog
      setDialogOpen(true);
    } catch (error) {
      console.error("Error adding user:", error);
      setError("Error adding customer. Please try again.");
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    router.push("/login"); // Redirect to login page after closing dialog
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
        Sign Up
      </h2>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div style={inputContainerStyle}>
          <PersonIcon style={iconStyle} />
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Enter first name"
            required
          />
        </div>

        {/* Last Name */}
        <div style={inputContainerStyle}>
          <PersonIcon style={iconStyle} />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Enter last name"
            required
          />
        </div>

        {/* Username */}
        <div style={inputContainerStyle}>
          <PersonIcon style={iconStyle} />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Enter username"
            required
          />
        </div>

        {/* Address */}
        <div style={inputContainerStyle}>
          <HomeIcon style={iconStyle} />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Enter address"
            required
          />
        </div>

        {/* Phone Number */}
        <div style={inputContainerStyle}>
          <LocalPhoneIcon style={iconStyle} />
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Enter phone number"
            required
          />
        </div>

        {/* Email */}
        <div style={inputContainerStyle}>
          <MailIcon style={iconStyle} />
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Enter email"
            required
          />
        </div>

        {/* Password */}
        <div style={inputContainerStyle}>
          <LockIcon style={iconStyle} />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Enter password"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" style={buttonStyle}>Submit Request</button>
      </form>

      {/* Success Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <p> Added successfully!</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// Styles
const inputContainerStyle = {
  marginBottom: "20px",
  display: "flex",
  alignItems: "center",
  borderBottom: "1px solid #ddd",
  paddingBottom: "10px",
};

const iconStyle = {
  fontSize: "24px",
  color: "#333",
  marginRight: "10px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  fontSize: "16px",
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "15px",
  backgroundColor: "#8e44ad",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "16px",
  transition: "background-color 0.3s ease",
};

export default CustomerForm;

