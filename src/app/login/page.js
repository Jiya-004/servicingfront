"use client";

import { useState } from "react";
import { login } from "../util/api";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #8e44ad, #3498db);
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
  width: 400px; /* Adjusted width */
  height: 500px; /* Adjusted height */
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
  color: #4a4a4a;
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
  padding: 10px;
  font-size: 16px;
  color: white;
  background: #8e44ad;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #732d91;
  }
`;

export default function Login() {
  const [loginData, setLoginData] = useState({
     name: "",
    password: "",
  });

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
      console.log("My data:", loginData);
      const response = await login(loginData);
      console.log(response);

      if (response?.Token) {
        router.push("/");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred while logging in.");
    }
  };

  return (
    <Container>
      <Card>
        <FormSection>
          <Title>Welcome to ServiceSync!</Title>
          <Subtitle>Login to your account</Subtitle>
          <Input
            type="text"
            name="name"
            placeholder="name"
            value={loginData.name}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
          />
          <StyledButton onClick={handleSubmit}>Login</StyledButton>
        </FormSection>
        <Footer>
          Are you new? <a onClick={() => router.push("/signup")}>Sign Up</a>
        </Footer>
      </Card>
    </Container>
  );
}
