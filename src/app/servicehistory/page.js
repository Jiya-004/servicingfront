"use client";
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, TextField, TableRow as MuiTableRow, TableCell as MuiTableCell, Box, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { getServices, deleteService } from '../util/api';

export default function ServiceTable() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  const fetchServices = async () => {
    try {
      const response = await getServices();
      setServices(response);
      setFilteredServices(response);
      console.log(response);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = (id) => {
    setServiceToDelete(id);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteService(serviceToDelete);
      fetchServices();
      setDeleteConfirmationOpen(false);
      setServiceToDelete(null);
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
    setServiceToDelete(null);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query) {
      setFilteredServices(services);
    } else {
      const filtered = services.filter((service) => {
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

  const getStatusColor = (status) => {
    return status === 'Pending' ? 'red' : 'green';
  };

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <TextField
        label="Search by Service ID, Vehicle Number, Owner Name, etc."
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        sx={{
          marginBottom: 2,
          backgroundColor: "#f5f5f5",
          borderRadius: 1,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#bdbdbd",
            },
            "&:hover fieldset": {
              borderColor: "#9e9e9e",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#4285f4",
            },
            "& input": {
              color: "#333",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#757575",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#4285f4",
          },
        }}
      />

      <TableContainer component={Paper} sx={{ borderRadius: 1, boxShadow: 3, width: '90%' }}>
        <Table sx={{ minWidth: 650, tableLayout: "fixed" }} aria-label="service table">
          <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
            <TableRow>
              <TableCell align="right" sx={{ fontWeight: "bold", padding: "12px" }}>Service ID</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold", padding: "12px" }}>Vehicle Number</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold", padding: "12px" }}>Owner Name</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold", padding: "12px" }}>Service Type</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold", padding: "12px" }}>Service Cost</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold", padding: "12px" }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold", padding: "12px" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredServices.length > 0 ? (
              filteredServices.map((row) => (
                <TableRow key={row.serviceId} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                  <TableCell align="right" sx={{ padding: "12px" }}>{row.serviceId}</TableCell>
                  <TableCell align="right" sx={{ padding: "12px" }}>{row.vehicleNumber}</TableCell>
                  <TableCell align="right" sx={{ padding: "12px" }}>{row.ownerName}</TableCell>
                  <TableCell align="right" sx={{ padding: "12px" }}>{row.serviceType}</TableCell>
                  <TableCell align="right" sx={{ padding: "12px" }}>{row.serviceCost}</TableCell>
                  <TableCell align="right" sx={{ padding: "12px", color: getStatusColor(row.status) }}>{row.status}</TableCell>
                  <TableCell align="right" sx={{ padding: "12px" }}>
                    <IconButton onClick={() => handleDelete(row.serviceId)}><Delete sx={{ color: "#d32f2f" }} /></IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <MuiTableRow>
                <MuiTableCell colSpan={7} align="center" sx={{ padding: "12px" }}>No matching services found.</MuiTableCell>
              </MuiTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={deleteConfirmationOpen} onClose={closeDeleteConfirmation}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this service?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirmation}>Cancel</Button>
          <Button variant="contained" color="error" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
