"use client";
import React, { useState, useEffect } from "react";
import { addService, getServiceTypes } from "../util/api"; // Assuming these are API methods

const VehicleServiceForm = () => {
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    ownerName: "",
    serviceType: "",
    serviceCost: "",
    userId: "",
  });
  const [serviceTypes, setServiceTypes] = useState([]);

  useEffect(() => {
    const savedUserId = localStorage.getItem("userId"); // Assuming the userId is saved during login

    if (savedUserId) {
      setFormData({ ...formData, userId: savedUserId });
    }

    fetchServiceTypes();
  }, []);

  const fetchServiceTypes = async () => {
    try {
      const response = await getServiceTypes(); // API call to fetch service types
      setServiceTypes(response); // Assuming response contains an array of service types with price
    } catch (error) {
      console.error("Error fetching service types:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "serviceType") {
      const selectedService = serviceTypes.find((service) => service.name === value);
      setFormData((prevData) => ({
        ...prevData,
        serviceCost: selectedService ? selectedService.price : "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set the status to "Pending" before sending the request
    const requestData = {
      ...formData,
      status: "Pending", // Set status to "Pending"
    };

    try {
      const response = await addService(requestData); // Send request to add service
      console.log("Service request submitted successfully:", response);
      setFormData({
        vehicleNumber: "",
        ownerName: "",
        serviceType: "",
        serviceCost: "",
        userId: "",
      });
    } catch (error) {
      console.error("Failed to submit service request:", error.response ? error.response.data : error);
      alert("Failed to submit the service request. Please try again later.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h3 style={styles.heading}>Vehicle Service Request Form</h3>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Vehicle Number:
              <input
                type="text"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </label>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Owner Name:
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </label>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Service Type:
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                required
                style={styles.select}
              >
                <option value="">-- Select Service Type --</option>
                {serviceTypes.map((type, index) => (
                  <option key={index} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Service Cost:
              <input
                type="number"
                name="serviceCost"
                value={formData.serviceCost}
                onChange={handleChange}
                required
                style={styles.input}
                readOnly
              />
            </label>
          </div>
          <button type="submit" style={styles.submitButton}>
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "linear-gradient(#2A00B7, #42006C)",
  },
  formContainer: {
    width: "500px",
    padding: "50px",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.10)",
  },
  heading: {
    textAlign: "center",
    color: "#4A148C",
    marginBottom: "20px",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "16px",
    color: "#555",
  },
  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "16px",
    color: "#555",
  },
  submitButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#8e44ad",
    color: "#ffffff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "4px",
    fontSize: "18px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default VehicleServiceForm;
