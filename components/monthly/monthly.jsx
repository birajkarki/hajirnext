"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';

export default function Monthly() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        marginLeft: '20px',
        marginTop: '10px',
        '& > :not(style)': {
          m: 1,
          width: '400px',
          height: '490px',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        },
        '@media (max-width: 990px)': {
          flexDirection: 'column',
          '& > :not(style)': {
            m: 1,
            width: '90%', // Adjust the width as needed
            height: 'auto',
       
           
          },
        },
      }}
    >
      <Paper sx={{ height: '500px', width: '250px' }}>
        <div style={{ height: '80px', backgroundColor: '#1E90FF', justifyContent: 'center', alignItems: 'center', textAlign: 'center', paddingTop: '10px', color: 'white' }}>
          Basic (Forever)<br />Free- <b>current plan</b>
        </div>
        <div style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', fontSize: '13px', gap: '5px', alignItems: 'flex-start', flexWrap: 'wrap', height: '340px', position: 'relative' }}>
          <ListItemWithCheck text="Track live attendance" />
          <ListItemWithCheck text="QR/all network setup" />
          <ListItemWithCheck text="Overtime setup" />
          <ListItemWithCheck text="Office timing setup" />
        </div>
        <Button variant="outlined" style={{ borderColor: 'green' }}>Get Started</Button>
      </Paper>

      <Paper sx={{ height: '400px', width: '250px' }}>
        <div style={{ height: '80px', backgroundColor: '#1E90FF', justifyContent: 'center', alignItems: 'center', textAlign: 'center', paddingTop: '10px', color: 'white' }}>
          Standard (Recommended)<br />200/-<b>Monthly</b>
        </div>
        <div style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', fontSize: '13px', gap: '5px', alignItems: 'flex-start', flexWrap: 'wrap', height: '340px', position: 'relative', marginTop: '20px' }}>
          <ListItemWithCheck text="Everything from free plan" />
          <ListItemWithCheck text="Add 3 companies" />
          {/* Add more list items here */}
        </div>
        <div style={{display:'flex', justifyContent:'center'}}>
        <Button variant="outlined" style={{ borderColor: 'green', position: 'absolute', marginTop: '-20px' }}>Upgrade to standard</Button>
        </div>
      </Paper>

      <Paper sx={{ height: '400px', width: '250px' }}>
        <div style={{ height: '80px', backgroundColor: '#1E90FF', justifyContent: 'center', alignItems: 'center', textAlign: 'center', paddingTop: '10px', color: 'white' }}>
          Premium (Enterprise)<br />500/-<b>Monthly</b>
        </div>
        <div style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', fontSize: '13px', gap: '5px', alignItems: 'flex-start', flexWrap: 'wrap', height: '340px', position: 'relative', marginTop: '20px' }}>
          <ListItemWithCheck text="Everything from free plan+" />
          <ListItemWithCheck text="Add 9 companies" />
        
        </div>
        <div style={{display:'flex', justifyContent:'center', }}>
        <Button variant="outlined" style={{ borderColor: 'green', position: 'absolute',
        
      

        marginTop: '-20px' }}>Upgrade to Premium</Button>
        </div>
      </Paper>
    </Box>
  );
}

const ListItemWithCheck = ({ text }) => (
  <div>
    <CheckIcon style={{ color: 'green', verticalAlign: 'middle' }} />
    {text}
  </div>
);
