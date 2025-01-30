"use client";
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getWorkers, deleteWorker } from '../util/api'; // Replace with your worker API functions
import { IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

export default function WorkerTable() {
  const [workers, setWorkers] = useState([]);

  const fetchWorkers = async () => {
    try {
      const response = await getWorkers(); // Fetch worker data
      setWorkers(response); // Update state with the worker data
      console.log(response); // Log the fetched response
    } catch (error) {
      console.error("Error fetching workers:", error);
    }
  };

  useEffect(() => {
    fetchWorkers(); // Call the async function inside useEffect to fetch workers
  }, []);

  const handleDelete = async (id) => {
    const response = await deleteWorker(id); // Call delete function
    if (response) {
      fetchWorkers(); // Re-fetch workers after deletion
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="worker list table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Contact Info</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Expertise</TableCell>
            <TableCell align="right">Availability</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workers.map((worker) => (
            <TableRow
              key={worker.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{worker.name}</TableCell>
              <TableCell align="right">{worker.contactInfo}</TableCell>
              <TableCell align="right">{worker.location}</TableCell>
              <TableCell align="right">{worker.expertise}</TableCell>
              <TableCell align="right">{worker.availability}</TableCell>
              <TableCell align="right">
                <IconButton><Edit /></IconButton>
                <IconButton onClick={() => handleDelete(worker.id)}><Delete /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
