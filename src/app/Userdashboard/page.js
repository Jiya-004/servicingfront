import React from "react";
import { Container, Card, CardContent, Typography, Box } from "@mui/material";

function AdminDashboard() {
  return (
    <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
      <Card elevation={4} sx={{ bgcolor: "#1e1e2f", color: "white", p: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 3 }}>
            Welcome AJS Auto Service
          </Typography>

          <Box display="flex" justifyContent="center">
            <img
              src="/image3.png"
              alt="Vehicle Service"
              width={900}
              height={400}
              style={{ borderRadius: "12px", maxWidth: "100%" }}
            />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default AdminDashboard;
