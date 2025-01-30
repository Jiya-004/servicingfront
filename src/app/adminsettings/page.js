"use client";
import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Snackbar,
} from "@mui/material";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    allowUserRegistration: true,
    enableEmailNotifications: false,
    maxConcurrentServices: 5,
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSave = () => {
    // Simulate saving settings to the server
    console.log("Saved settings:", settings);
    setSnackbarOpen(true); // Show success notification
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={{ margin: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Admin Settings
      </Typography>
      <Grid container spacing={3}>
        {/* Allow User Registration */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">User Settings</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.allowUserRegistration}
                    onChange={handleChange}
                    name="allowUserRegistration"
                  />
                }
                label="Allow User Registration"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Enable Email Notifications */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Notification Settings</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableEmailNotifications}
                    onChange={handleChange}
                    name="enableEmailNotifications"
                  />
                }
                label="Enable Email Notifications"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Max Concurrent Services */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Service Settings</Typography>
              <TextField
                label="Max Concurrent Services"
                type="number"
                name="maxConcurrentServices"
                value={settings.maxConcurrentServices}
                onChange={handleChange}
                fullWidth
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Save Button */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            fullWidth
          >
            Save Settings
          </Button>
        </Grid>
      </Grid>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Settings saved successfully!"
      />
    </div>
  );
};

export default AdminSettings;
