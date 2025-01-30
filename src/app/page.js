"use client";

import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false); // Move this inside the component
  const router = useRouter();
  const [username, setUsername] = useState("User");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
    } else {
      setUsername("Service Manager"); // Example placeholder
    }
  }, [router]);

  const handleLogout = () => {
    setLogoutDialogOpen(true);
  };

  const confirmLogout = () => {
    setLogoutDialogOpen(false);
    localStorage.removeItem("authToken"); // Ensure token is removed
    router.push("/login");
  };

  const cancelLogout = () => {
    setLogoutDialogOpen(false);
  };

  return (
    <div
      style={{
        backgroundImage: "url('/background.jpg')", // Add your background image here
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      {/* AppBar for Navigation */}
      <AppBar position="static" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Vehicle Servicing Center
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            style={{
              textTransform: "none",
              backgroundColor: "#BB86FC",
              padding: "5px 10px",
              margin: "0 10px",
            }}
          >
            Logout
          </Button>
          <Dialog open={logoutDialogOpen} onClose={cancelLogout}>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogContent>
              <DialogContentText>Are you sure you want to log out?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelLogout} color="primary">
                Cancel
              </Button>
              <Button onClick={confirmLogout} color="secondary">
                Logout
              </Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container
        maxWidth="lg"
        style={{ marginTop: "50px", textAlign: "center", color: "black" }}
      >
        <Typography variant="h3" align="center" gutterBottom>
          Welcome, {username}!
        </Typography>
        <Typography
          variant="body1"
          align="center"
          style={{ color: "black", marginBottom: "30px" }}
        >
          Manage vehicle services, bookings, and customer details effortlessly.
        </Typography>

        {/* Dashboard Features */}
        <Grid container spacing={4}>
          {/* Bookings */}
          <Grid item xs={12} sm={6} md={4}>
            <Card style={{ backgroundColor: "#212121", color: "#fff" }}>
              <CardContent>
                <Typography variant="h6">Manage Bookings</Typography>
                <Typography variant="body2" style={{ color: "#ccc" }}>
                  View and update customer service bookings.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => router.push("/bookings")}
                  style={{ margin: "auto" }}
                >
                  Explore
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Vehicle Management */}
          <Grid item xs={12} sm={6} md={4}>
            <Card style={{ backgroundColor: "#212121", color: "#fff" }}>
              <CardContent>
                <Typography variant="h6">Manage Vehicles</Typography>
                <Typography variant="body2" style={{ color: "#ccc" }}>
                  Add, update, or view vehicle records.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => router.push("/vehicles")}
                  style={{ margin: "auto" }}
                >
                  Explore
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Service Management */}
          <Grid item xs={12} sm={6} md={4}>
            <Card style={{ backgroundColor: "#212121", color: "#fff" }}>
              <CardContent>
                <Typography variant="h6">Manage Services</Typography>
                <Typography variant="body2" style={{ color: "#ccc" }}>
                  Define service types, pricing, and availability.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => router.push("/services")}
                  style={{ margin: "auto" }}
                >
                  Explore
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
