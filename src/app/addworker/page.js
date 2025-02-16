"use client";
import { Box, Button, Grid, TextField, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
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
  
    try {
      await handleAdd(workerData);
      console.log("Customer added successfully!");
      // Reset form after successful submission
      setWorkerData({
        firstName: "",
        lastName: "",
        address: "",
        expertise: "",
        contactInfo: "",
        email: ""

      });
    } catch (error) {
      
      setErrorDialogOpen(true);
    } 

    
  };
  const handleAdd = async (worker) => {
    try {
      await addWorker(worker);
    } catch (error) {
      throw error; // Propagate error to be handled by handleSubmit
    }
  };

  const handleDialogClose = () => {
    setErrorDialogOpen(false);
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

      {/* Error Dialog */}
      <Dialog open={errorDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Submission Failed</DialogTitle>
        <DialogContent>
          <DialogContentText>
            There was an error submitting your information. Please try again later.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}