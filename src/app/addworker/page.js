"use client";
import { Box, Button, Grid, TextField, Typography, MenuItem, Select, InputLabel, FormControl, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WorkerInformationForm() {
  const [workerData, setWorkerData] = useState({
    name: "",
    contactInfo: "",
    location: "",
    expertise: "",
    availability: "",
  });

  const [errorDialogOpen, setErrorDialogOpen] = useState(false); // Track error dialog visibility
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
    console.log("Submitted Data: ", workerData);

    // Simulate the API call
    try {
      // Add your logic to submit the data to the API here
      console.log("API Request to save worker data");

      // If successful, navigate to a success page or show success message
      router.push("/worker-dashboard");  // Or handle based on response

    } catch (error) {
      console.error("Submission Error: ", error);
      setErrorDialogOpen(true); // Show error dialog if submission fails
    }
  };

  const handleDialogClose = () => {
    setErrorDialogOpen(false); // Close the dialog
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
          {/* Name */}
          <Grid item>
            <TextField
              label="Name"
              variant="outlined"
              name="name"
              fullWidth
              value={workerData.name}
              onChange={handleChange}
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
            />
          </Grid>

          {/* Location */}
          <Grid item>
            <TextField
              label="Location"
              variant="outlined"
              name="location"
              fullWidth
              value={workerData.location}
              onChange={handleChange}
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
            />
          </Grid>

          {/* Availability */}
          <Grid item>
            <FormControl fullWidth>
              <InputLabel id="availability-label">Availability</InputLabel>
              <Select
                labelId="availability-label"
                id="availability"
                name="availability"
                value={workerData.availability}
                onChange={handleChange}
                label="Availability"
              >
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Unavailable">Unavailable</MenuItem>
              </Select>
            </FormControl>
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
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDialogClose} color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
