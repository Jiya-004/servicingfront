"use client";
import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Card, CardContent, CardActions, Button, IconButton } from '@mui/material';
import { AccessTime, Assignment, CheckCircle, Person } from '@mui/icons-material';

// Simulate API calls for adding and deleting workers/services
const getDashboardData = async () => {
  // Fetch the latest dashboard data from the API
  return {
    totalServiceRequests: 120,
    totalWorkers: 10,
    totalCompletedServices: 95,
    pendingServices: 25,
  };
};

// Simulated functions for adding and deleting workers/services
const addWorker = async () => {
  // Simulate adding a worker
  console.log("Worker added");
};

const deleteWorker = async (workerId) => {
  // Simulate deleting a worker
  console.log(`Worker with ID ${workerId} deleted`);
};

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalServiceRequests: 0,
    totalWorkers: 0,
    totalCompletedServices: 0,
    pendingServices: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData(); // Initial fetch of dashboard data

  }, []); // Empty dependency array ensures this runs only once when the component is mounted

  // Function to handle worker addition
  const handleAddWorker = async () => {
    await addWorker();
    fetchDashboardData(); // Fetch updated data after adding a worker
  };

  // Function to handle worker deletion
  const handleDeleteWorker = async (workerId) => {
    await deleteWorker(workerId);
    fetchDashboardData(); // Fetch updated data after deleting a worker
  };

  return (
    <div style={{ margin: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Vehicle Service Management Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Total Service Requests Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Service Requests</Typography>
              <Typography variant="h4">{dashboardData.totalServiceRequests}</Typography>
            </CardContent>
            <CardActions>
              <IconButton color="primary">
                <Assignment />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>

        {/* Total Workers Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Workers</Typography>
              <Typography variant="h4">{dashboardData.totalWorkers}</Typography>
            </CardContent>
            <CardActions>
              <IconButton color="primary">
                <Person />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>

        {/* Completed Services Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Completed Services</Typography>
              <Typography variant="h4">{dashboardData.totalCompletedServices}</Typography>
            </CardContent>
            <CardActions>
              <IconButton color="primary">
                <CheckCircle />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>

        {/* Pending Services Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Pending Services</Typography>
              <Typography variant="h4">{dashboardData.pendingServices}</Typography>
            </CardContent>
            <CardActions>
              <IconButton color="primary">
                <AccessTime />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>

        {/* Admin Actions Section */}
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h5">Admin Actions</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Button fullWidth variant="contained" color="primary" onClick={handleAddWorker}>
                  Add Worker
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button fullWidth variant="contained" color="secondary">
                  View Service Requests
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button fullWidth variant="outlined" color="primary">
                  View Analytics
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
