"use client";
import { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography, Modal, Button } from "@mui/material";
import { Group, Person, Build, Feedback, Delete } from "@mui/icons-material";
import { 
  getTotalCustomers, 
  getTotalWorkers, 
  getTotalServiceTypes, 
  getTotalServicesMade, 
  getFeedbacks, 
  getFeedback,
  deleteFeedback,
  getPendingRequests,
  approveRequest // New import for approving requests
} from "../util/api";

export default function AdminDashboard() {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalWorkers, setTotalWorkers] = useState(0);
  const [totalServiceTypes, setTotalServiceTypes] = useState(0);
  const [totalServicesMade, setTotalServicesMade] = useState(0);
  const [feedbacks, setFeedbacks] = useState(0);
  const [pendingRequests, setPendingRequests] = useState([]); // State for pending requests
  const [openModal, setOpenModal] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchDashboardData = () => {
    getTotalCustomers()
      .then((data) => setTotalCustomers(data.count))
      .catch((err) => console.error("Error fetching customers:", err));

    getTotalWorkers()
      .then((data) => setTotalWorkers(data.count))
      .catch((err) => console.error("Error fetching workers:", err));

    getTotalServiceTypes()
      .then((data) => setTotalServiceTypes(data.count))
      .catch((err) => console.error("Error fetching service types:", err));

    getTotalServicesMade()
      .then((data) => setTotalServicesMade(data.count))
      .catch((err) => console.error("Error fetching services made:", err));

    getFeedbacks()
      .then((data) => setFeedbacks(data.count))
      .catch((err) => console.error("Error fetching feedbacks:", err));
      
    fetchPendingRequests(); // Fetch pending requests on load
  };

  const fetchPendingRequests = async () => {
    try {
      const data = await getPendingRequests();
      setPendingRequests(data); // Assuming data is an array of pending requests
    } catch (err) {
      console.error("Error fetching pending requests:", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleOpenModal = async () => {
    setOpenModal(true);
    try {
      const data = await getFeedback();
      if (Array.isArray(data)) {
        setFeedbackList(data);
      } else {
        console.error("Unexpected data format:", data);
        setFeedbackList([]);
      }
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
      setFeedbackList([]);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDeleteFeedback = async (feedbackId) => {
    if (isDeleting) return; // Prevent multiple clicks while deleting

    try {
      setIsDeleting(true);
      await deleteFeedback(feedbackId);
      
      // Update the feedback list
      const updatedFeedbacks = feedbackList.filter(
        (feedback) => feedback.feedback_id !== feedbackId
      );
      setFeedbackList(updatedFeedbacks);
      
      // Update the total feedback count
      setFeedbacks(prev => prev - 1);
      
    } catch (err) {
      console.error("Error deleting feedback:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleApproveRequest = async (serviceId) => {
    try {
      await approveRequest(serviceId); // API call to approve the request
      // Update pending requests state by filtering out the approved request
      setPendingRequests(pendingRequests.filter(request => request.serviceId !== serviceId));
    } catch (err) {
      console.error("Error approving request:", err);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Total Customers */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Group sx={{ fontSize: 40 }} color="primary" />
              <Typography variant="h5">Total Customers</Typography>
              <Typography variant="h4">{totalCustomers}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Workers */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Person sx={{ fontSize: 40 }} color="primary" />
              <Typography variant="h5">Total Workers</Typography>
              <Typography variant="h4">{totalWorkers}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Service Types */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Build sx={{ fontSize: 40 }} color="primary" />
              <Typography variant="h5">Total Service Types</Typography>
              <Typography variant="h4">{totalServiceTypes}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Services Made */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Build sx={{ fontSize: 40 }} color="primary" />
              <Typography variant="h5">Services Made</Typography>
              <Typography variant="h4">{totalServicesMade}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* View Feedbacks */}
        <Grid item xs={12} md={4}>
          <Card onClick={handleOpenModal} sx={{ cursor: "pointer" }}>
            <CardContent>
              <Feedback sx={{ fontSize: 40 }} color="primary" />
              <Typography variant="h5">View Feedbacks</Typography>
              <Typography variant="h4">{feedbacks}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Requests */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5">Pending Service Requests</Typography>
              {pendingRequests.length > 0 ? (
                pendingRequests.map((request) => (
                  <Box 
                    key={request.serviceId} 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      padding: 1, 
                      borderBottom: '1px solid #eee',
                      color: 'red' // Change color for pending requests
                    }}
                  >
                    <Typography variant="body1">
                      {request.ownerName} - {request.serviceType} (Pending)
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="success" 
                      onClick={() => handleApproveRequest(request.serviceId)}
                    >
                      Approve
                    </Button>
                  </Box>
                ))
              ) : (
                <Typography variant="body1">No pending requests available.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Modal to Display Feedbacks */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="feedbacks-modal-title"
        aria-describedby="feedbacks-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: 3,
            borderRadius: 2,
            width: 400,
          }}
        >
          <Typography variant="h6" id="feedbacks-modal-title">
            Feedbacks
          </Typography>
          <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
            {feedbackList.length > 0 ? (
              feedbackList.map((feedback) => (
                <Box 
                  key={feedback.feedback_id} 
                  sx={{ 
                    marginBottom: 2,
                    padding: 2,
                    border: '1px solid #eee',
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                  }}
                >
                  <Box>
                    <Typography variant="body1">
                      <strong>Customer:</strong> {feedback.name}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Message:</strong> {feedback.message}
                    </Typography>
                  </Box>
                  <Button
                    onClick={() => handleDeleteFeedback(feedback.feedback_id)}
                    disabled={isDeleting}
                    color="error"
                    sx={{ minWidth: 40, height: 40 }}
                  >
                    <Delete />
                  </Button>
                </Box>
              ))
            ) : (
              <Typography variant="body1">No feedbacks available.</Typography>
            )}
          </Box>
          <Button 
            onClick={handleCloseModal} 
            sx={{ mt: 2 }} 
            variant="contained" 
            color="primary"
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
