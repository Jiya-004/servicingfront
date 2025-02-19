"use client";

import { useState } from "react";
import { login } from "../util/api";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { MenuItem, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(#2A00B7, #42006C);
  font-family: 'Arial', sans-serif;
`;

const Footer = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 14px;

  a {
    color: #3498db;
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  width: 450px;
  height: 600px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const FormSection = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  color: purple;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #6c6c6c;
  margin-bottom: 20px;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;

  &:focus {
    border-color: #8e44ad;
  }
`;

const StyledButton = styled.button`
  padding: 9px;
  font-size: 16px;
  color: white;
  background: #8e44ad;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #732d91;
  }
`;

export default function Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [errorDialogOpen, setErrorDialogOpen] = useState(false); // State for error dialog
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(loginData);

      if (response.token && response.userId) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.userId);
        localStorage.setItem("userRole", response.userRole);

        // Redirect based on the role
        if (loginData.role === "user") {
          router.push("/Userdashboard");
        } else if (loginData.role === "admin") {
          router.push("/");
        }
      } else {
        // If login fails, show the error dialog
        setErrorMessage("Invalid username, password, or role.");
        setErrorDialogOpen(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred during login. Please try again.");
      setErrorDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setErrorDialogOpen(false);
  };

  return (
    <Container>
      <Card>
        <FormSection>
          <Title>Welcome to AJS Auto Service</Title>
          <Subtitle>Login to your account</Subtitle>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={loginData.username}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
          />
          <TextField
            label="Role"
            name="role"
            value={loginData.role}
            onChange={handleChange}
            fullWidth
            margin="normal"
            select
            variant="outlined"
            required
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
          <StyledButton onClick={handleSubmit}>Login</StyledButton>
        </FormSection>

        {/* Register Link */}
        <Footer>
          <p>Don't have an account? <a onClick={() => router.push("/addcustomers")}>Register</a></p>
        </Footer>
      </Card>

      {/* Error Dialog */}
      <Dialog open={errorDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <p>{errorMessage}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
