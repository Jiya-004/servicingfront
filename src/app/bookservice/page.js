"use client";
import React, { useState } from 'react';

const VehicleServiceForm = () => {
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    model: '',
    ownerName: '',
    billBookNumber: '',
    fuelType: '',
    servicingDate: ''
  });

  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Service Request Submitted:', formData);
    alert('Vehicle servicing details submitted successfully!');
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
              Model:
              <input
                type="text"
                name="model"
                value={formData.model}
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
              Bill Book Number:
              <input
                type="text"
                name="billBookNumber"
                value={formData.billBookNumber}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </label>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Fuel Type:
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                required
                style={styles.select}
              >
                <option value="">-- Select Fuel Type --</option>
                {fuelTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Servicing Date:
              <input
                type="date"
                name="servicingDate"
                value={formData.servicingDate}
                onChange={handleChange}
                required
                style={styles.input}
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'linear-gradient(#2A00B7, #42006C)',
  },
  formContainer: {
    width: '500px',
    padding: '50px',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.10)',
  },
  heading: {
    textAlign: 'center',
    color: '#4A148C',
    marginBottom: '20px',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
    color: '#555',
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
    color: '#555',
  },
  submitButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#8e44ad',
    color: '#ffffff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '4px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default VehicleServiceForm;
