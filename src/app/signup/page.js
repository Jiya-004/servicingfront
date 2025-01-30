"use client"; // Marking this as a client-side component

import React, { useState } from "react";
import { addUser } from "../util/api"; // Importing addUser from your API file
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import styles from "./signup.module.css";
import { useRouter } from "next/navigation";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function SignUp() {
  // State to handle form data and validation errors
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    role:""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // For button disable/loading state
  const router = useRouter(); // Hook for navigation

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });

    // Reset errors for the current field
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = {};

    // Validate email
    if (!signUpData.email.endsWith("@gmail.com")) {
      newErrors.email = "Email must end with @gmail.com";
      valid = false;
    }

    // Validate password length
    if (signUpData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      valid = false;
    }

    // If validation fails, set errors and return
    if (!valid) {
      setErrors(newErrors);
      return;
    }

    // Call signup API after validation passes
    setLoading(true);
    try {
      await addUser(signUpData); // Send data to the database
      console.log("Signup successful");

      // After successful signup, navigate to the login page
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
            name="name"
            placeholder="Name"
            value={signUpData.name}
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
          < AdminPanelSettingsIcon style={{ fontSize: "20px", color: "#333" }} />
          <input
            type="role"
            name="role"
            placeholder="role"
            value={signUpData.role}
            onChange={handleChange}
            required
          />
            
        </div>
        <div className={styles.submitContainer}>
          <button
            type="submit"
            className={styles.submit}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
        
      </form>
    </div>
  );
}
