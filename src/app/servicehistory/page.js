"use client";
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, TextField, TableRow as MuiTableRow, TableCell as MuiTableCell } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { getServices, deleteService } from '../util/api'; // Adjust API function names accordingly

export default function ServiceTable() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchServices = async () => {
    try {
      const response = await getServices(); // Fetch service data
      setServices(response);
      setFilteredServices(response); // Initialize filteredServices
      console.log(response); // Debugging log
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    const response = await deleteService(id);
    if (response) {
      fetchServices(); // Refresh table after deletion
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query) {
      setFilteredServices(services); // Reset to full list when search is cleared
    } else {
      const filtered = services.filter((service) => {
        // Filter by serviceId, vehicle number, owner name, or service type
        return (
          service.serviceId.toString().includes(query) ||
          service.vehicleNumber.toLowerCase().includes(query.toLowerCase()) ||
          service.ownerName.toLowerCase().includes(query.toLowerCase()) ||
          service.serviceType.toLowerCase().includes(query.toLowerCase())
        );
      });
      setFilteredServices(filtered);
    }
  };

  return (
    <>
      <TextField
        label="Search by Service ID, Vehicle Number, Owner Name, etc."
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        sx={{
          marginBottom: 1,
          backgroundColor: "#f0f0f0", // Change background color
          color: "#333", // Change text color
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#4CAF50", // Border color
            },
            "&:hover fieldset": {
              borderColor: "#388E3C", // Border color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#2E7D32", // Border color when focused
            },
            "& input": {
              color: "#000", // Text color inside input
            },
          },
          "& .MuiInputLabel-root": {
            color: "#666", // Label color
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#2E7D32", // Label color when focused
          },
        }}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="service table">
          <TableHead>
            <TableRow>
              <TableCell align="right">serviceId</TableCell>
              <TableCell align="right">Vehicle Number</TableCell>
              <TableCell align="right">Owner Name</TableCell>
              <TableCell align="right">Service Type</TableCell>
              <TableCell align="right">Service Cost</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredServices.length > 0 ? (
              filteredServices.map((row) => (
                <TableRow key={row.serviceId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="right">{row.serviceId}</TableCell>
                  <TableCell align="right">{row.vehicleNumber}</TableCell>
                  <TableCell align="right">{row.ownerName}</TableCell>
                  <TableCell align="right">{row.serviceType}</TableCell>
                  <TableCell align="right">{row.serviceCost}</TableCell>
                  <TableCell align="right">
                    <IconButton><Edit /></IconButton>
                    <IconButton onClick={() => handleDelete(row.serviceId)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <MuiTableRow>
                <MuiTableCell colSpan={6} align="center">No matching services found.</MuiTableCell>
              </MuiTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
