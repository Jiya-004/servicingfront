"use client";

import React, { useState } from "react";
import { addUser } from "../util/api";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import styles from "./signup.module.css";
import { useRouter } from "next/navigation";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function SignUp() {
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
    username: "",
    password: "",
    role: "user", // Default role
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = {};

    if (!signUpData.email.endsWith("@gmail.com")) {
      newErrors.email = "Email must end with @gmail.com";
      valid = false;
    }

    if (signUpData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      valid = false;
    }

    if (signUpData.phoneNumber && !/^\d{10}$/.test(signUpData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await addUser(signUpData);
      console.log("Signup successful");
      router.push("/login");
    } catch (error) {
      console.error("Signup failed:", error);
      setErrors({ ...errors, email: "Error during signup. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.text}>Sign up</div>
        <div className={styles.underline}></div>
      </div>
      <form onSubmit={handleSubmit} className={styles.inputs}>
        <div className={styles.input}>
          <PersonIcon style={{ fontSize: "20px", color: "#333" }} />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={signUpData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.input}>
          <PersonIcon style={{ fontSize: "20px", color: "#333" }} />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={signUpData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.input}>
          <MailIcon style={{ fontSize: "20px", color: "#333" }} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signUpData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        <div className={styles.input}>
          <HomeIcon style={{ fontSize: "20px", color: "#333" }} />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={signUpData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.input}>
          <PhoneIcon style={{ fontSize: "20px", color: "#333" }} />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={signUpData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && <p className={styles.error}>{errors.phoneNumber}</p>}
        </div>
        <div className={styles.input}>
          <PersonIcon style={{ fontSize: "20px", color: "#333" }} />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={signUpData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.input}>
          <LockIcon style={{ fontSize: "20px", color: "#333" }} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signUpData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>
        <div className={styles.input}>
  <AdminPanelSettingsIcon style={{ fontSize: "20px", color: "#333" }} />
  <select
    name="role"
    value={signUpData.role}
    onChange={handleChange}
    required
    className={styles.select} // Apply custom styling
  >
    <option value="" disabled>-- Select Role --</option>
    <option value="user">User</option>
    <option value="admin">Admin</option>
  </select>
</div>

        <div className={styles.submitContainer}>
          <button
            type="submit"
            className={styles.submit}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
}
