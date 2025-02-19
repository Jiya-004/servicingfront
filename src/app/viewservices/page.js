"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { getServiceTypes } from "../util/api";

export default function ServiceTypeTable() {
  const [serviceTypes, setServiceTypes] = useState([]);

  useEffect(() => {
    fetchServiceTypes();
  }, []);

  const fetchServiceTypes = async () => {
    try {
      const response = await getServiceTypes();
      setServiceTypes(response);
    } catch (error) {
      console.error("Error fetching service types:", error);
    }
  };

  return (
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "white" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "purple" }}>
        Our Services
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 400,
          overflow: "auto",
          boxShadow: 5,
          borderRadius: 2,
          width: "80%",
        }}
      >
        <Table sx={{ minWidth: 650, borderCollapse: 'collapse' }} aria-label="service type table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#555" }}>
              <TableCell align="left" sx={{ fontWeight: "bold", padding: '16px', color: "white" }}>
                Service Name
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold", padding: '16px', color: "white" }}>
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {serviceTypes.length > 0 ? (
              serviceTypes.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{
                    backgroundColor: "white", // Table body background white
                    color: "black", // Text color black for contrast
                    '&:hover': { backgroundColor: '#f0f0f0' } // Hover effect
                  }}
                >
                  <TableCell align="left" sx={{ padding: '16px' }}>{row.name}</TableCell>
                  <TableCell align="left" sx={{ padding: '16px' }}>Rs.{row.price}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} align="center" sx={{ padding: '16px' }}>
                  No services available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}