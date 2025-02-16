"use client";
import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { VisibilityOutlined, AddCircleOutline, CheckCircleOutline, Receipt } from '@mui/icons-material';
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js
export default function RequestPage() {
  const router = useRouter();
  const requestCards = [
    {
      title: 'View Pending Request',
      icon: <VisibilityOutlined sx={{ fontSize: 40, color: 'white' }} />,
      bgColor: '#4A9DFF', // blue
      onClick: () => console.log('View Pending Request clicked')
    },
    {
      title: 'Make Request',
      icon: <AddCircleOutline sx={{ fontSize: 40, color: 'white' }} />,
      bgColor: '#2ECC71', // green
      onClick: () => router.push('/makerequest') // Use router.push() to navigate
    },
    {
      title: 'Approved Request',
      icon: <CheckCircleOutline sx={{ fontSize: 40, color: 'white' }} />,
      bgColor: '#F4D03F', // yellow/orange
      onClick: () => console.log('Approved Request clicked')
    },
    {
      title: 'Approved Request Bill',
      icon: <Receipt sx={{ fontSize: 40, color: 'white' }} />,
      bgColor: '#FF5E7D', // pink
      onClick: () => console.log('Approved Request Bill clicked')
    }
  ];

  return (
    <Box sx={{ p: 3, width: '100%' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 3,
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        {requestCards.map((card, index) => (
          <Card
            key={index}
            sx={{
              bgcolor: card.bgColor,
              borderRadius: 2,
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)',
              },
              minHeight: '150px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
            onClick={card.onClick}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                p: 3,
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  color: 'white',
                  fontWeight: 500,
                  mb: 2
                }}
              >
                {card.title}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  mt: 'auto'
                }}
              >
                {card.icon}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}