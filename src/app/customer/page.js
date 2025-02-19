"use client";
import {
  Dashboard,
  DirectionsCar,
  ExpandLess,
  ExpandMore,
  ListAlt,
  Logout,
  Person,
  Feedback, 
  AccountCircle,
} from "@mui/icons-material";
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { removeToken } from "../util/authutil";

export default function UserSidebar({ drawerOpen, toggleDrawer }) {
  const [openServices, setOpenServices] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const router = useRouter();

  const routeToPage = (url) => {
    router.push(url);
  };

  const toggleServicesMenu = () => setOpenServices(!openServices);

  const handleLogout = () => {
    setLogoutDialogOpen(true);
  };

  const confirmLogout = () => {
    setLogoutDialogOpen(false);
    removeToken();
    router.push("/login");
  };

  const cancelLogout = () => {
    setLogoutDialogOpen(false);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerOpen ? 240 : 60,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerOpen ? 240 : 60,
          boxSizing: "border-box",
          transition: "width 0.3s ease",
          backgroundImage: 'url("/background-image.jpg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          color: "black",
        },
      }}
    >
      <Box
        sx={{
          width: drawerOpen ? 240 : 60,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerOpen ? 240 : 60,
            boxSizing: "border-box",
            transition: "width 0.3s",
          },
        }}
      >
        {/* Sidebar Header */}
        <IconButton onClick={toggleDrawer} sx={{ marginBottom: 2, color: "white" }}>
          <Person />
        </IconButton>
        {drawerOpen && (
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: 2, textShadow: "1px 1px 5px rgba(0, 0, 0, 0.7)" }}
            style={{ color: "white" }}
          >
            User Menu
          </Typography>
        )}
      </Box>

      {/* Menu List */}
      <List>
        {/* Dashboard */}
        <ListItem button onClick={() => routeToPage("/Userdashboard")}>
          <ListItemIcon>
            <Dashboard sx={{ color: "white" }} />
          </ListItemIcon>
          {drawerOpen && <ListItemText style={{ color: "white" }} primary="Dashboard" />}
        </ListItem>

        <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }} />

        {/* Services Menu */}
        <ListItem button onClick={toggleServicesMenu}>
          <ListItemIcon>
            <DirectionsCar sx={{ color: "white" }} />
          </ListItemIcon>
          {drawerOpen && <ListItemText style={{ color: "white" }} primary="Services" />}
          {openServices ? <ExpandLess sx={{ color: "white" }} /> : <ExpandMore sx={{ color: "white" }} />}
        </ListItem>
        <Collapse in={openServices} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* Book Service */}
            <ListItem button onClick={() => routeToPage("/bookservice")}>
              <ListItemIcon>
                <DirectionsCar sx={{ color: "white" }} />
              </ListItemIcon>
              {drawerOpen && <ListItemText style={{ color: "white" }} primary="Book Service" />}
            </ListItem>
            {/* Service History */}
            <ListItem button onClick={() => routeToPage("/userservicehistory")}>
              <ListItemIcon>
                <ListAlt sx={{ color: "white" }} />
              </ListItemIcon>
              {drawerOpen && <ListItemText style={{ color: "white" }} primary="Service History" />}
            </ListItem>
            {/* View Our Services */}
            <ListItem button onClick={() => routeToPage("/viewservices")}>
              <ListItemIcon>
                <ListAlt sx={{ color: "white" }} />
              </ListItemIcon>
              {drawerOpen && <ListItemText style={{ color: "white" }} primary="View Our Services" />}
            </ListItem>
          </List>
        </Collapse>

        <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }} />

        {/* Profile */}
        <ListItem button onClick={() => routeToPage("/profile")}>
          <ListItemIcon>
            <AccountCircle sx={{ color: "white" }} />
          </ListItemIcon>
          {drawerOpen && <ListItemText style={{ color: "white" }} primary="Profile" />}
        </ListItem>

        {/* Feedback */}
        <ListItem button onClick={() => routeToPage("/feedback")}>
          <ListItemIcon>
            <Feedback sx={{ color: "white" }} />
          </ListItemIcon>
          {drawerOpen && <ListItemText style={{ color: "white" }} primary="Feedback" />}
        </ListItem>

        <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }} />

        {/* Logout */}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <Logout sx={{ color: "white" }} />
          </ListItemIcon>
          {drawerOpen && <ListItemText style={{ color: "white" }} primary="Logout" />}
        </ListItem>
      </List>

      {/* Logout Confirmation Dialog */}
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
    </Drawer>
  );
}
