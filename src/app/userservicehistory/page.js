"use client";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getServicesByUserId } from "../util/api";

export default function ServiceTable() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userId");
      setLoggedInUserId(userId || "");
    }
  }, []);

  useEffect(() => {
    if (loggedInUserId) {
      fetchServices();
    }
  }, [loggedInUserId]);

  const fetchServices = async () => {
    try {
      const response = await getServicesByUserId(loggedInUserId);
      setServices(response);
      setFilteredServices(response);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "white" }}>
        Service Management
      </h1>
      <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Table sx={{ minWidth: 650 }} aria-label="service table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell align="right" sx={{ color: "white", fontWeight: "bold" }}>Service ID</TableCell>
              <TableCell align="right" sx={{ color: "white", fontWeight: "bold" }}>Vehicle Number</TableCell>
              <TableCell align="right" sx={{ color: "white", fontWeight: "bold" }}>Service Type</TableCell>
              <TableCell align="right" sx={{ color: "white", fontWeight: "bold" }}>Service Cost</TableCell>
              <TableCell align="right" sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredServices.length > 0 ? (
              filteredServices.map((row, index) => (
                <TableRow
                  key={row.serviceId}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                  }}
                >
                  <TableCell align="right">{row.serviceId}</TableCell>
                  <TableCell align="right">{row.vehicleNumber}</TableCell>
                  <TableCell align="right">{row.serviceType}</TableCell>
                  <TableCell align="right">{row.serviceCost}</TableCell>
                  <TableCell align="right">
                    <span
                      style={{
                        color: row.status === "Pending" ? "red" : row.status === "Approved" ? "green" : "black",
                      }}
                    >
                      {row.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No services found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}