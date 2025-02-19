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
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { deleteUser, getUsers, updateUser } from "../util/api";

export default function BasicTable() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [editId, setEditId] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      const filtered = response.filter(user => user.role !== "admin"); // Exclude admins
      setUsers(filtered);
      setFilteredUsers(filtered);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    const response = await deleteUser(deleteId);
    if (response) {
      fetchUsers();
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
    setEditId(null);
  };

  const handleInputChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateUser(editId, editedData);
      setOpen(false);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query) {
      setFilteredUsers(users); // Reset to full list when search is cleared
      return;
    }

    const filtered = users.filter((user) => {
      if (!isNaN(query)) {
        // Search is a number: Match ID exactly
        return user.id.toString() === query;
      } else {
        // Search is text: Match name, address, phone, email, username
        return (
          user.firstName.toLowerCase().includes(query.toLowerCase()) ||
          user.lastName.toLowerCase().includes(query.toLowerCase()) ||
          user.address.toLowerCase().includes(query.toLowerCase()) ||
          user.phoneNumber.includes(query) ||
          user.email.toLowerCase().includes(query.toLowerCase()) ||
          user.username.toLowerCase().includes(query.toLowerCase())
        );
      }
    });

    setFilteredUsers(filtered);
  };

  return (
    <>
      <TextField
        label="Search by ID, Name, Email, etc."
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        sx={{
          marginBottom: 2, // Increased margin for better spacing
          backgroundColor: "#ffffff", // Lighter background for contrast
          borderRadius: "4px", // Rounded corners
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
              color: "#333", // Text color inside input
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

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: "8px", overflow: "hidden" }}>
        <Table sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2", color: "white" }}>
              <TableCell align="right" sx={{ fontWeight: "bold", color: "white" }}>Id</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold", color: "white" }}>First Name</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold", color: "white" }}>Last Name</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold", color: "white" }}>Address</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold", color: "white" }}>Phone Number</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold", color: "white" }}>Email</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold", color: "white" }}>Username</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold", color: "white" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((row) => (
                <TableRow key={row.id} sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.firstName}</TableCell>
                  <TableCell align="right">{row.lastName}</TableCell>
                  <TableCell align="right">{row.address}</TableCell>
                  <TableCell align="right">{row.phoneNumber}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.username}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleEdit(row)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No matching users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="First Name"
            fullWidth
            value={editedData.firstName || ""}
            onChange={(e) => handleInputChange(e, "firstName")}
          />
          <TextField
            margin="dense"
            label="Last Name"
            fullWidth
            value={editedData.lastName || ""}
            onChange={(e) => handleInputChange(e, "lastName")}
          />
          <TextField
            margin="dense"
            label="Address"
            fullWidth
            value={editedData.address || ""}
            onChange={(e) => handleInputChange(e, "address")}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            fullWidth
            value={editedData.phoneNumber || ""}
            onChange={(e) => handleInputChange(e, "phoneNumber")}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={editedData.email || ""}
            onChange={(e) => handleInputChange(e, "email")}
          />
          <TextField
            margin="dense"
            label="Username"
            fullWidth
            value={editedData.username || ""}
            onChange={(e) => handleInputChange(e, "username")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
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
