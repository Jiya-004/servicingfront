"use client";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getWorkers, deleteWorker, updateWorker } from "../util/api";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { Delete, Edit, Search } from "@mui/icons-material";

export default function WorkerTable() {
  const [workers, setWorkers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const response = await getWorkers();
      setWorkers(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Error fetching workers:", error);
      setWorkers([]);
    }
  };

  const handleEdit = (row) => {
    setEditId(row.id);
    setEditedData({ ...row });
    setDialogOpen(true);
  };

  const handleInputChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateWorker(editId, editedData);
      setDialogOpen(false);
      fetchWorkers();
    } catch (error) {
      console.error("Error updating worker:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteWorker(id);
      fetchWorkers();
    } catch (error) {
      console.error("Error deleting worker:", error);
    }
  };

  const filteredWorkers = workers.filter((worker) => {
    if (!searchQuery) return true; // Show all when search is empty

    // If searchQuery is a number, filter by exact ID match
    if (!isNaN(searchQuery)) {
      return worker.id.toString() === searchQuery;
    }

    // Otherwise, check for partial matches in other fields
    return (
      worker.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.expertise.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <>
      {/* Search Bar */}
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        sx={{
          marginBottom: 2,
          backgroundColor: "#f0f0f0", // Light gray background
          borderRadius: "8px",
          "& .MuiOutlinedInput-root": {
            color: "#333", // Text color
          },
          "& .MuiInputLabel-root": {
            color: "#666", // Label color
          },
        }}
        InputProps={{
          startAdornment: <Search sx={{ color: "#666", marginRight: 1 }} />,
        }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Expertise</TableCell>
              <TableCell>Contact Info</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredWorkers.length > 0 ? (
              filteredWorkers.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.expertise}</TableCell>
                  <TableCell>{row.contactInfo}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleEdit(row)}>
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(row.id)}
                      sx={{ color: "#f44336" }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No matching workers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Edit Worker</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            fullWidth
            value={editedData.firstName || ""}
            onChange={(e) => handleInputChange(e, "firstName")}
            margin="dense"
          />
          <TextField
            label="Last Name"
            fullWidth
            value={editedData.lastName || ""}
            onChange={(e) => handleInputChange(e, "lastName")}
            margin="dense"
          />
          <TextField
            label="Address"
            fullWidth
            value={editedData.address || ""}
            onChange={(e) => handleInputChange(e, "address")}
            margin="dense"
          />
          <TextField
            label="Expertise"
            fullWidth
            value={editedData.expertise || ""}
            onChange={(e) => handleInputChange(e, "expertise")}
            margin="dense"
          />
          <TextField
            label="Contact Info"
            fullWidth
            value={editedData.contactInfo || ""}
            onChange={(e) => handleInputChange(e, "contactInfo")}
            margin="dense"
          />
          <TextField
            label="Email"
            fullWidth
            value={editedData.email || ""}
            onChange={(e) => handleInputChange(e, "email")}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
