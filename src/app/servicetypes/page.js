"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { Delete, Edit, Add } from "@mui/icons-material";
import { deleteServiceType, getServiceTypes, updateServiceType, addServiceType } from "../util/api"; // Assume these are API methods

export default function ServiceTypeTable() {
  const [serviceTypes, setServiceTypes] = useState([]);
  const [filteredServiceTypes, setFilteredServiceTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [newService, setNewService] = useState({ name: "", price: "" });
  const [editId, setEditId] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchServiceTypes();
  }, []);

  const fetchServiceTypes = async () => {
    try {
      const response = await getServiceTypes();
      setServiceTypes(response);
      setFilteredServiceTypes(response);
    } catch (error) {
      console.error("Error fetching service types:", error);
    }
  };

  const handleDeleteOpen = (id) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    const response = await deleteServiceType(deleteId);
    if (response) {
      fetchServiceTypes();
    }
    setDeleteOpen(false);
    setDeleteId(null);
  };

  const handleEdit = (row) => {
    setEditId(row.id);
    setEditedData({ ...row });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAddOpen(false);
    setDeleteOpen(false);
    setEditId(null);
    setNewService({ name: "", price: "" });
  };

  const handleInputChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateServiceType(editId, editedData);
      setOpen(false);
      fetchServiceTypes();
    } catch (error) {
      console.error("Error updating service type:", error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query) {
      setFilteredServiceTypes(serviceTypes); // Reset to full list when search is cleared
      return;
    }

    const filtered = serviceTypes.filter((service) => {
      return (
        service.name.toLowerCase().includes(query.toLowerCase()) ||
        service.price.toString().includes(query)
      );
    });

    setFilteredServiceTypes(filtered);
  };

  const handleAddOpen = () => {
    setAddOpen(true);
  };

  const handleAddService = async () => {
    try {
      await addServiceType(newService); // Assuming addServiceType API method
      setAddOpen(false);
      fetchServiceTypes();
    } catch (error) {
      console.error("Error adding service type:", error);
    }
  };

  const handleNewServiceChange = (e, field) => {
    setNewService({ ...newService, [field]: e.target.value });
  };

  return (
    <>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Search by Name or Price"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
          sx={{
            backgroundColor: "#f0f0f0",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#4CAF50",
              },
              "&:hover fieldset": {
                borderColor: "#388E3C",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#2E7D32",
              },
              "& input": {
                color: "#000",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#666",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#2E7D32",
            },
          }}
        />
      </Box>

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: "8px", overflow: "hidden" }}>
        <Table sx={{ minWidth: 650 }} aria-label="service type table">
          <TableHead>
            <TableRow>
              <TableCell align="right" sx={{ fontWeight: 'bold', backgroundColor: '#4CAF50', color: 'white' }}>Id</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', backgroundColor: '#4CAF50', color: 'white' }}>Service Name</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', backgroundColor: '#4CAF50', color: 'white' }}>Price</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', backgroundColor: '#4CAF50', color: 'white' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredServiceTypes.length > 0 ? (
              filteredServiceTypes.map((row) => (
                <TableRow key={row.id} sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">Rs.{row.price.toFixed(2)}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleEdit(row)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteOpen(row.id)} color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No matching services found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleAddOpen}
        >
          Add Service Type
        </Button>
      </Box>

      {/* Edit Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Service Type</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Service Name"
            fullWidth
            value={editedData.name || ""}
            onChange={(e) => handleInputChange(e, "name")}
          />
          <TextField
            margin="dense"
            label="Price"
            fullWidth
            value={editedData.price || ""}
            onChange={(e) => handleInputChange(e, "price")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Service Dialog */}
      <Dialog open={addOpen} onClose={handleClose}>
        <DialogTitle>Add Service Type</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Service Name"
            fullWidth
            value={newService.name}
            onChange={(e) => handleNewServiceChange(e, "name")}
          />
          <TextField
            margin="dense"
            label="Price"
            fullWidth
            value={newService.price}
            onChange={(e) => handleNewServiceChange(e, "price")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleAddService}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteOpen} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this service type?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
