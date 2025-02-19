"use client";
import { Box, CssBaseline, IconButton } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./menu/page";  // Admin Sidebar
import UserSidebar from "./customer/page"; // User Sidebar
import { isTokenValid, removeToken } from "./util/authutil";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

// This layout will be used across all pages of the app
export default function Layout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // New state to track user role
  const router = useRouter();
  const pathname = usePathname();

  const validateToken = () => {
    const token = localStorage.getItem("authToken");
    if (isTokenValid(token)) {
      setIsAuthenticated(true);
      console.log("Authenticated");

      // Check user role from localStorage or API
      const role = localStorage.getItem("userRole"); // Assume "admin" or "user"
      setIsAdmin(role === "admin");
    } else {
      setIsAuthenticated(false);
      removeToken();
    }
  };

  useEffect(() => {
    validateToken();
  }, [pathname, router]);

  const [drawerOpen, setDrawerOpen] = useState(true);
  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  return (
    <html>
      <body>
        <Box sx={{ display: "flex", width: "100%", height: "102vh", background:'linear-gradient(#2A00B7, #42006C)' }}>
          <CssBaseline />

          {/* Sidebar (Admin or User) */}
          {isAuthenticated && (
            isAdmin ? (
              <Sidebar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
            ) : (
              <UserSidebar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
            )
          )}

          {/* Expand/Collapse Button */}
          <IconButton 
            onClick={toggleDrawer} 
            sx={{ position: "absolute", top: 20, left: drawerOpen ? 240 : 60, transition: "left 0.3s", color: "white" }}
          >
            {drawerOpen ? <ExpandLess /> : <ExpandMore />}
          </IconButton>

          {/* Main Content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              marginLeft: drawerOpen ? "240px" : "60px", // Matches Sidebar width
              transition: "margin-left 0.3s ease", // Smooth transition
              padding: 2, // Add padding for inner content
            }}
          >
            {children}
          </Box>
        </Box>
      </body>
    </html>
  );
}
