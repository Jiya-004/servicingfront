"use client";
import { 
  Box, Button, Grid, TextField, Typography, Dialog, 
  DialogActions, DialogContent, DialogContentText, DialogTitle 
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addWorker } from "../util/api";

export default function WorkerInformationForm() {
  const [workerData, setWorkerData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    expertise: "",
    contactInfo: "",
    email: ""
  });

  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkerData({
      ...workerData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation to check if any field is empty
    if (Object.values(workerData).some((value) => value.trim() === "")) {
      setError("All fields are required.");
      setErrorDialogOpen(true);
      return;
    }

    try {
      await addWorker(workerData);
      setSuccessDialogOpen(true); // Show success dialog

      // Reset form after successful submission
      setWorkerData({
        firstName: "",
        lastName: "",
        address: "",
        expertise: "",
        contactInfo: "",
        email: ""
      });

      setError(""); // Clear any previous error
    } catch (error) {
      setError("There was an error submitting your information. Please try again.");
      setErrorDialogOpen(true);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        imageRendering: "auto",
      }}
    >
      <Box
        sx={{
          width: 450,
          padding: 4,
          borderRadius: 4,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
        }}
      >
        <Typography variant="h4" gutterBottom textAlign="center" color="purple">
          Worker Information
        </Typography>
        <Typography
          variant="body2"
          textAlign="center"
          gutterBottom
          sx={{ color: "#636e50" }}
        >
          Please fill out the form below with your details.
        </Typography>
        {error && (
          <Typography color="error" textAlign="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Grid container direction="column" spacing={3}>
          {/* First Name */}
          <Grid item>
            <TextField
              label="First Name"
              variant="outlined"
              name="firstName"
              fullWidth
              value={workerData.firstName}
              onChange={handleChange}
              required
              error={!workerData.firstName.trim() && error !== ""}
              helperText={!workerData.firstName.trim() && error !== "" ? "First name is required" : ""}
            />
          </Grid>

          {/* Last Name */}
          <Grid item>
            <TextField
              label="Last Name"
              variant="outlined"
              name="lastName"
              fullWidth
              value={workerData.lastName}
              onChange={handleChange}
              required
              error={!workerData.lastName.trim() && error !== ""}
              helperText={!workerData.lastName.trim() && error !== "" ? "Last name is required" : ""}
            />
          </Grid>

          {/* Address */}
          <Grid item>
            <TextField
              label="Address"
              variant="outlined"
              name="address"
              fullWidth
              value={workerData.address}
              onChange={handleChange}
              required
              error={!workerData.address.trim() && error !== ""}
              helperText={!workerData.address.trim() && error !== "" ? "Address is required" : ""}
            />
          </Grid>

          {/* Expertise */}
          <Grid item>
            <TextField
              label="Expertise"
              variant="outlined"
              name="expertise"
              fullWidth
              value={workerData.expertise}
              onChange={handleChange}
              required
              error={!workerData.expertise.trim() && error !== ""}
              helperText={!workerData.expertise.trim() && error !== "" ? "Expertise is required" : ""}
            />
          </Grid>

          {/* Contact Info */}
          <Grid item>
            <TextField
              label="Contact Info"
              variant="outlined"
              name="contactInfo"
              fullWidth
              value={workerData.contactInfo}
              onChange={handleChange}
              required
              error={!workerData.contactInfo.trim() && error !== ""}
              helperText={!workerData.contactInfo.trim() && error !== "" ? "Contact info is required" : ""}
            />
          </Grid>

          {/* Email */}
          <Grid item>
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              type="email"
              fullWidth
              value={workerData.email}
              onChange={handleChange}
              required
              error={!workerData.email.trim() && error !== ""}
              helperText={!workerData.email.trim() && error !== "" ? "Valid email is required" : ""}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              sx={{
                backgroundColor: "#8e44ad",
                color: "#fff",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#5a4dcb",
                },
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onClose={() => setSuccessDialogOpen(false)}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Worker has been successfully added!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessDialogOpen(false)} color="primary" variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error Dialog */}
      <Dialog open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)}>
        <DialogTitle>Submission Failed</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {error || "There was an error submitting your information. Please try again."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setErrorDialogOpen(false)} color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
