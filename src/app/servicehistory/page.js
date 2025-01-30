"use client";
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

// Assuming getService and deleteService are defined elsewhere
// Example: 
// const getService = async () => { /* fetch service history */ };
// const deleteService = async (id) => { /* delete service by id */ };

const ServiceHistory = () => {
  const [serviceHistory, setServiceHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch service history data
  const fetchService = async () => {
    try {
      const response = await getService(); // Fetch service history
      setServiceHistory(response); // Set service data
      setLoading(false); // Set loading to false once data is fetched
      console.log(response); // Log the fetched response
    } catch (error) {
      console.error("Error fetching service history:", error);
      setLoading(false); // Set loading to false even if an error occurs
    }
  };

  useEffect(() => {
    fetchService(); // Fetch data when component mounts
  }, []);

  // Handle deleting a service entry
  const handleDelete = async (id) => {
    try {
      const response = await deleteService(id); // Delete the service by ID
      if (response) {
        fetchService(); // Re-fetch service history after deletion
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2>Vehicle Service History</h2>
      {loading ? (
        <p>Loading service history...</p>
      ) : serviceHistory.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="service history table">
            <TableHead>
              <TableRow>
                <TableCell align="right">#</TableCell>
                <TableCell align="right">Vehicle Number</TableCell>
                <TableCell align="right">Owner Name</TableCell>
                <TableCell align="right">Service Date</TableCell>
                <TableCell align="right">Service Type</TableCell>
                <TableCell align="right">Cost ($)</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {serviceHistory.map((service, index) => (
                <TableRow key={service.id}>
                  <TableCell align="right">{index + 1}</TableCell>
                  <TableCell align="right">{service.vehicleNumber}</TableCell>
                  <TableCell align="right">{service.ownerName}</TableCell>
                  <TableCell align="right">{service.serviceDate}</TableCell>
                  <TableCell align="right">{service.serviceType}</TableCell>
                  <TableCell align="right">{service.cost}</TableCell>
                  <TableCell align="right">
                    <IconButton><Edit /></IconButton>
                    <IconButton onClick={() => handleDelete(service.id)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No service history available.</p>
      )}
    </div>
  );
};

export default ServiceHistory;
