// src/App.js

"use client";
import React from 'react';
import styled from 'styled-components';
import Image from "next/image";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #8e44ad, #3498db);
  font-family: 'Arial', sans-serif;
`;

const Card = styled.div`npm install @mui/icons-material
  display: flex;
  flex-direction: row;
  background: white;
  width: 900px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const ImageSection = styled.div`
  flex: 1;
  background: url('https://via.placeholder.com/450') no-repeat center/cover;
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

const Button = styled.button`
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

const SocialIcons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
`;

const SocialIcon = styled.a`
  text-decoration: none;
  color: #8e44ad;
  font-size: 20px;
`;

const LoginPage = () => {
  return (
    <Container>
      <Card>
       <Image
         // src="/images/image.jpg" // Path inside the public folder
         // alt="Login Background"
         // width={450}
          //height={250}
          //style={{ borderRadius: "1px" }}
        />
        <FormSection>
          <Title>Welcome to ServiceSync!</Title>
          <Subtitle>Register your account</Subtitle>
          <Input type="text" placeholder="Name" />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button>Login</Button>
           
        </FormSection>
      </Card>
    </Container>
  );
};

export default LoginPage;
