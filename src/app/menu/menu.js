"use client";
import {
  Dashboard,
  DirectionsCar,
  ExpandLess,
  ExpandMore,
  Group,
  Logout,
  Menu,
  Settings,
  Star,
  Add,
  Person,
  ListAlt
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
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Sidebar({ drawerOpen, toggleDrawer }) {
  const [openUsers, setOpenUsers] = useState(false); // State for Users menu
  const [openWorkers, setOpenWorkers] = useState(false); // State for Workers menu
  const [openServices, setOpenServices] = useState(false); // State for Services menu
  const router = useRouter();

  // Navigation handler
  const routeToPage = (url) => {
    router.push(url);
  };

  // Menu toggles
  const toggleUsersMenu = () => setOpenUsers(!openUsers);
  const toggleWorkersMenu = () => setOpenWorkers(!openWorkers);
  const toggleServicesMenu = () => setOpenServices(!openServices);

  const handleLogout = () => {
    // Implement token removal logic if required
    router.push("/");
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
        },
      }}
    >
      <Box>
        {/* Sidebar Header */}
        <IconButton onClick={toggleDrawer} sx={{ marginBottom: 2 }}>
          <Menu />
        </IconButton>
        {drawerOpen && (
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: 2 }}
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
            <Dashboard />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="Dashboard" />}
        </ListItem>

        <Divider />

        {/* Users Menu */}
        <ListItem button onClick={toggleUsersMenu}>
          <ListItemIcon>
            <Group />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="Users" />}
          {openUsers ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openUsers} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button onClick={() => routeToPage("/users/add")}>
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Add User" />}
            </ListItem>
            <ListItem button onClick={() => routeToPage("/table")}>
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="User List" />}
            </ListItem>
          </List>
        </Collapse>

        <Divider />

        {/* Workers Menu */}
        <ListItem button onClick={toggleWorkersMenu}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="Workers" />}
          {openWorkers ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openWorkers} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button onClick={() => routeToPage("/workers/add")}>
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Add Worker" />}
            </ListItem>
            <ListItem button onClick={() => routeToPage("/workers/list")}>
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Worker List" />}
            </ListItem>
          </List>
        </Collapse>

        <Divider />

        {/* Services Menu */}
        <ListItem button onClick={toggleServicesMenu}>
          <ListItemIcon>
            <DirectionsCar />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="Services" />}
          {openServices ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openServices} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button onClick={() => routeToPage("/services/book")}>
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Book Service" />}
            </ListItem>
            <ListItem button onClick={() => routeToPage("/services/history")}>
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Service History" />}
            </ListItem>
          </List>
        </Collapse>

        <Divider />

        {/* Admin Menu */}
        <ListItem button onClick={() => routeToPage("/admin/settings")}>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="Admin Settings" />}
        </ListItem>

        <Divider />

        {/* Logout */}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="Logout" />}
        </ListItem>
      </List>
    </Drawer>
  );
}
