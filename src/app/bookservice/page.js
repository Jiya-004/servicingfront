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
  const [showDialog, setShowDialog] = useState(false); // State to show/hide dialog

  useEffect(() => {
    const savedUserId = localStorage.getItem("userId");
    if (savedUserId) {
      setFormData((prevData) => ({ ...prevData, userId: savedUserId }));
    }
    fetchServiceTypes();
  }, []);

  const fetchServiceTypes = async () => {
    try {
      const response = await getServiceTypes();
      setServiceTypes(response);
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

    const requestData = { ...formData, status: "Pending" };

    try {
      await addService(requestData);
      setShowDialog(true); // Show success dialog
      setFormData({
        vehicleNumber: "",
        ownerName: "",
        serviceType: "",
        serviceCost: "",
        userId: formData.userId, // Keep userId unchanged
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

      {/* Success Dialog Box */}
      {showDialog && (
        <div style={styles.dialogOverlay}>
          <div style={styles.dialogBox}>
            <h3 style={styles.dialogText}>Service request submitted successfully!</h3>
            <button style={styles.dialogButton} onClick={() => setShowDialog(false)}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(#2A00B7, #42006C)",
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
    color: "black",
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

  // Dialog Styles
  dialogOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dialogBox: {
    width: "300px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  dialogText: {
    marginBottom: "15px",
    color: "#333",
  },
  dialogButton: {
    padding: "10px 20px",
    backgroundColor: "#8e44ad",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default VehicleServiceForm;
