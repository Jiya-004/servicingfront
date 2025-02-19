"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { addUser } from "../util/api"; // Assuming this handles the API call
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import HomeIcon from "@mui/icons-material/Home";
import styles from "./signup.module.css"; // Assuming you still want to keep styles

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: "user", // Default role is user
  });

  const [error, setError] = useState(""); // Define error state
  const [success, setSuccess] = useState(""); // Define success state
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate the form
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

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
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

    setLoading(true);
    try {
      await addUser(formData); // Await the API call to add user
      setSuccess("User registered successfully!");
      setError(""); // Clear any previous error message

      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        address: "",
        phoneNumber: "",
        email: "",
        password: "",
        role: "user", // Reset role to user
      });

      router.push("/login"); // Redirect after successful sign-up
    } catch (error) {
      console.error("Error adding user:", error);
      setError("Error during registration. Please try again.");
    } finally {
      setLoading(false);
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
        Sign Up
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
            name="firstName"
            value={formData.firstName}
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
            name="lastName"
            value={formData.lastName}
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
            type="email"
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

        {/* Password */}
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #ddd",
            paddingBottom: "10px",
          }}
        >
          <LockIcon style={{ fontSize: "24px", color: "#333", marginRight: "10px" }} />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
              outline: "none",
            }}
            placeholder="Enter password"
            required
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "15px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
