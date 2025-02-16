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

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response);
      setFilteredUsers(response);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id) => {
    const response = await deleteUser(id);
    if (response) {
      fetchUsers();
    }
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
          user.firstname.toLowerCase().includes(query.toLowerCase()) ||
          user.lastname.toLowerCase().includes(query.toLowerCase()) ||
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
        <Table sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Id</TableCell>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Phone Number</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Username</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.firstname}</TableCell>
                  <TableCell align="right">{row.lastname}</TableCell>
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
            value={editedData.firstname || ""}
            onChange={(e) => handleInputChange(e, "firstname")}
          />
          <TextField
            margin="dense"
            label="Last Name"
            fullWidth
            value={editedData.lastname || ""}
            onChange={(e) => handleInputChange(e, "lastname")}
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
    </>
  );
}
