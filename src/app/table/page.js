"use client";
import {useEffect,useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { deleteUser, getUsers } from '../util/api';
import { IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

export default function BasicTable() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await getUsers(); // Fetch data
      setUsers(response); // Update state
      console.log(response); // Log the fetched response directly
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
  

    fetchUsers(); // Call the async function inside useEffect
  }, []);

  const handleddelete=async(id)=>{
    const response =await deleteUser(id);
    if(response){
      fetchUsers();
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
             
            <TableCell align="right">Id</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align='"right'>action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
             
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.firstname}</TableCell>
              <TableCell align="right">{row.lastname}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">
                <IconButton><Edit></Edit></IconButton>
               <IconButton onClick={()=>handleddelete(row.id)}><Delete></Delete> </IconButton>
              </TableCell>
            </TableRow>
       
        

          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
