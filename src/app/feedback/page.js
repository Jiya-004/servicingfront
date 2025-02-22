"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { addFeedback } from "../util/api";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!formData.name.trim() || !formData.message.trim()) {
      setError("Both fields are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      await addFeedback(formData); // Send feedback to API
      setSuccessDialog(true); // Show success dialog
      setError(""); // Clear any previous error

      // Reset form
      setFormData({ name: "", message: "" });
    } catch (error) {
      console.error("Error adding feedback:", error);
      setError("Error sending feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
            Send Feedback To Admin
          </Typography>

          {error && (
            <Typography color="error.main" align="center" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Your Name"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              sx={{ mb: 3 }}
              error={!formData.name.trim() && error !== ""}
              helperText={!formData.name.trim() && error !== "" ? "Name is required" : ""}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="message"
              label="Message"
              id="message"
              multiline
              rows={6}
              value={formData.message}
              onChange={handleChange}
              sx={{ mb: 3 }}
              error={!formData.message.trim() && error !== ""}
              helperText={!formData.message.trim() && error !== "" ? "Message is required" : ""}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                bgcolor: "success.main",
                "&:hover": {
                  bgcolor: "success.dark",
                },
              }}
              endIcon={!isSubmitting && <SendIcon />}
            >
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Send"}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Success Dialog */}
      <Dialog open={successDialog} onClose={() => setSuccessDialog(false)}>
        <DialogTitle>Feedback Sent</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your feedback has been successfully sent to the admin. Thank you!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessDialog(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FeedbackForm;
