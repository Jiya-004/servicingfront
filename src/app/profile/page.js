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
import { Edit, Delete } from "@mui/icons-material";
import { getUserById, updateUser, deleteUser } from "../util/api";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editedData, setEditedData] = useState({});
  const router = useRouter();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/login");
      return;
    }

    try {
      const response = await getUserById(userId);
      if (!response) {
        throw new Error("No user data returned from the API");
      }
      setUser(response);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleEdit = () => {
    setEditedData({ ...user });
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleInputChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateUser(user.id, editedData);
      setUser(editedData);
      setOpenEdit(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteClick = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUser(user.id);
      localStorage.removeItem("userId");
      router.push("/login");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          boxShadow: 3,
          margin: "auto",
          maxWidth: "90%",
          marginTop: 4,
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="profile table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
                First Name
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
                Last Name
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
                Address
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
                Phone Number
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
                Email
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
                Username
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
                Password
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user ? (
              <TableRow
                key={user.userId}
                sx={{
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                <TableCell align="center" sx={{ fontSize: 14, padding: 2 }}>
                  {user.firstName}
                </TableCell>
                <TableCell align="center" sx={{ fontSize: 14, padding: 2 }}>
                  {user.lastName}
                </TableCell>
                <TableCell align="center" sx={{ fontSize: 14, padding: 2 }}>
                  {user.address}
                </TableCell>
                <TableCell align="center" sx={{ fontSize: 14, padding: 2 }}>
                  {user.phoneNumber}
                </TableCell>
                <TableCell align="center" sx={{ fontSize: 14, padding: 2 }}>
                  {user.email}
                </TableCell>
                <TableCell align="center" sx={{ fontSize: 14, padding: 2 }}>
                  {user.username}
                </TableCell>
                <TableCell align="center" sx={{ fontSize: 14, padding: 2 }}>
                  ******
                </TableCell>
                <TableCell align="center" sx={{ fontSize: 14, padding: 2 }}>
                  <IconButton onClick={handleEdit} sx={{ color: "#1976d2" }}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={handleDeleteClick} sx={{ color: "#d32f2f" }}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ fontSize: 16, padding: 3 }}>
                  Loading user data...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Profile Dialog */}
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle sx={{ fontWeight: "bold", color: "#1976d2" }}>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="First Name"
            fullWidth
            value={editedData.firstName || ""}
            onChange={(e) => handleInputChange(e, "firstName")}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            margin="dense"
            label="Last Name"
            fullWidth
            value={editedData.lastName || ""}
            onChange={(e) => handleInputChange(e, "lastName")}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            margin="dense"
            label="Address"
            fullWidth
            value={editedData.address || ""}
            onChange={(e) => handleInputChange(e, "address")}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            fullWidth
            value={editedData.phoneNumber || ""}
            onChange={(e) => handleInputChange(e, "phoneNumber")}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={editedData.email || ""}
            onChange={(e) => handleInputChange(e, "email")}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            margin="dense"
            label="Username"
            fullWidth
            value={editedData.username || ""}
            onChange={(e) => handleInputChange(e, "username")}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={editedData.password || ""}
            onChange={(e) => handleInputChange(e, "password")}
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} sx={{ color: "#1976d2" }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle sx={{ fontWeight: "bold", color: "#d32f2f" }}>Confirm Account Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete your account? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} sx={{ color: "#1976d2" }}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleConfirmDelete}>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}