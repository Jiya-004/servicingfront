"use client";
import { Box, CssBaseline } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./menu/page";
import { isTokenValid, removeToken } from "./util/authutil";

// This layout will be used across all pages of the app
export default function Layout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const validateToken = () => {
    const token = localStorage.getItem("authToken");
    if (isTokenValid(token)) {
      setIsAuthenticated(true);
      console.log("Authenticated");
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


          {isAuthenticated && (
            <Sidebar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
          )}


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