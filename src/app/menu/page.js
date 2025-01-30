"use client";
import {
  Dashboard,
  DirectionsCar,
  ExpandLess,
  ExpandMore,
  Group,
  Logout,
  Menu,
  Add,
  Person,
  ListAlt,
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

export default function Sidebar({ drawerOpen, toggleDrawer }) {
  const [openUsers, setOpenUsers] = useState(false);
  const [openWorkers, setOpenWorkers] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  
  const router = useRouter();

  const routeToPage = (url) => {
    router.push(url);
  };

  const toggleUsersMenu = () => setOpenUsers(!openUsers);
  const toggleWorkersMenu = () => setOpenWorkers(!openWorkers);
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
        <IconButton onClick={toggleDrawer} sx={{ marginBottom: 2,
         color: "black",
          

        }}>
          <Menu />
        </IconButton>
        {drawerOpen && (
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: 2, textShadow: "1px 1px 5px rgba(0, 0, 0, 0.7)" }}
          >
            Service Sync
          </Typography>
        )}
      </Box>

      {/* Menu List */}
      <List>
        {/* Dashboard */}
        <ListItem button onClick={() => routeToPage("/dashboard")}>
          <ListItemIcon>
            <Dashboard sx={{ color: "black" }} />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="Dashboard" />}
        </ListItem>

        <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }} />

        {/* Users Menu */}
        <ListItem button onClick={toggleUsersMenu}>
          <ListItemIcon>
            <Group sx={{ color: "black" }} />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="Customers" />}
          {openUsers ? <ExpandLess sx={{ color: "black" }} /> : <ExpandMore sx={{ color: "black" }} />}
        </ListItem>
        <Collapse in={openUsers} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button onClick={() => routeToPage("/addcustomers")}>
              <ListItemIcon>
                <Add sx={{ color: "black" }} />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Add customers" />}
            </ListItem>
            <ListItem button onClick={() => routeToPage("/customerlist")}>
              <ListItemIcon>
                <Group sx={{ color: "black" }} />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Customers List" />}
            </ListItem>
          </List>
        </Collapse>

        <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }} />

        {/* Workers Menu */}
        <ListItem button onClick={toggleWorkersMenu}>
          <ListItemIcon>
            <Person sx={{ color: "black" }} />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="Workers" />}
          {openWorkers ? <ExpandLess sx={{ color: "black" }} /> : <ExpandMore sx={{ color: "black" }} />}
        </ListItem>
        <Collapse in={openWorkers} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button onClick={() => routeToPage("/addworker")}>
              <ListItemIcon>
                <Add sx={{ color: "black" }} />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Add Worker" />}
            </ListItem>
            <ListItem button onClick={() => routeToPage("/workerlist")}>
              <ListItemIcon>
                <Group sx={{ color: "black" }} />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Worker List" />}
            </ListItem>
          </List>
        </Collapse>

        <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }} />

        {/* Services Menu */}
        <ListItem button onClick={toggleServicesMenu}>
          <ListItemIcon>
            <DirectionsCar sx={{ color: "black" }} />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="Services" />}
          {openServices ? <ExpandLess sx={{ color: "black" }} /> : <ExpandMore sx={{ color: "black" }} />}
        </ListItem>
        <Collapse in={openServices} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button onClick={() => routeToPage("/bookservice")}>
              <ListItemIcon>
                <Add sx={{ color: "black" }} />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Book Service" />}
            </ListItem>
            <ListItem button onClick={() => routeToPage("/servicehistory")}>
              <ListItemIcon>
                <ListAlt sx={{ color: "black" }} />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Service History" />}
            </ListItem>
          </List>
        </Collapse>

        <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }} />

        {/* Logout */}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <Logout sx={{ color: "black" }} />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="Logout" />}
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
