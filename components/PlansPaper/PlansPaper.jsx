
"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import { Grid, useMediaQuery } from '@mui/material';
export default function SimplePaper() {
  const isScreenSM = useMediaQuery("(max-width:1480px)");


  return (
    <>
  
      {/* <Box
        sx={{
          display: 'flex',
        flexDirection:'row',
       
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
              width: '90%', 
              height: 'auto',
             
            },}
        }}
      > */}
  
        <Paper >
          <div style={{
            backgroundColor: '#1E90FF',
            height: '80px',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            paddingTop: '10px',
            color: 'white',
          }}>
            Basic (Forever)
            <br />
            Free- <b style={{ color: 'white' }}>current plan</b>
          </div>
          <div style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            overflow:'hidden',
            flexWrap:'wrap',
            justifyContent: 'center',
            fontSize: '13px',
            height: '340px',
            gap: '5px',
      
            alignItems: 'flex-start',
            position: 'relative',
           
             }}
          
      
          >
            {basicFeatures.map((feature, index) => (
              <ListItemWithCheck key={index} text={feature} />
            ))}
          </div>
          <Button variant="outlined" style={{ borderColor: 'green',marginTop: isScreenSM?"7px":"auto" , marginBottom: isScreenSM? "10px":""}}>Get Started</Button>
        </Paper>

        <Paper sx={{
          height: '400px',
          width:"250px"
        }} >
          <div style={{
            backgroundColor: '#1E90FF',
            height: '80px',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            paddingTop: '10px',
            color: 'white',
          }}>
            Standard (Recommended)
            <br />
            2400/-<b>Yearly</b>
          </div>
          <div style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            fontSize: '13px',
            height: '340px',
            gap: '5px',
            alignItems: 'flex-start',
            position: 'relative',
            marginTop: '-120px',
            flexWrap: 'wrap', 
          
          }}>
            {standardFeatures.map((feature, index) => (
              <ListItemWithCheck key={index} text={feature} />
            ))}
          </div>

          <Button variant="outlined" style={{ borderColor: 'green', marginTop:'120px'   , marginBottom: isScreenSM? "15px":" "  }}>Upgrade to Standard</Button>
         
        </Paper>
     
        
        {/* Premium Paper */}
        <Paper sx={{
          height: '400px',
          width: '250px',
        }} >
          <div style={{
            backgroundColor: '#1E90FF',
            height: '80px',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            paddingTop: '10px',
            color: 'white',
          }}>
            Premium (Enterprise)
            <br />
            6000/-<b>Yearly</b>
          </div>
          <div style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            fontSize: '13px',
            height: '340px',
            gap: '5px',
            alignItems: 'flex-start',
            position: 'relative',
            marginTop: '-120px',
            flexWrap: 'wrap', // Apply flex wrap
          }}>
            {premiumFeatures.map((feature, index) => (
              <ListItemWithCheck key={index} text={feature} />
            ))}
          </div>
          <Button variant="outlined" style={{ borderColor: 'green', marginTop:'120px'   , marginBottom: isScreenSM? "15px":" "  }}>Upgrade to Premium</Button>
        </Paper>
      {/* </Box> */}
  
    </>
  );
}

const ListItemWithCheck = ({ text }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap'}}>
    <CheckIcon style={{ color: 'green', verticalAlign: 'middle' }} />
    {text}
  </div>
);

const basicFeatures = [
  "Track live attendance",
  "QR/all network setup",
  "Overtime setup",
  "Office timing setup",
  "Add candidates/company",
  "Custom leave setup",
  "Custom holiday setup",
  "Add missing attend/leave",
  "Allowance setup",
  "Setup weekly day off",
  "Setup allow late attend",
  "Salary calculation",
  "Payroll management",
  "Add approver",
  "Performance reports",
  "Activities reports",
  "Payment reports",
  "Attendance reports",
  "Can export reports",
  "Many features+",
  "Add 1 company",
  "Add 5 employees"
];

const standardFeatures = [
  "Everything from free plan",
  "Add 3 companies",
  "Add 33 employees"
];

const premiumFeatures = [
  "Everything from free plan+",
  "Add 9 companies",
  "Add 99 employees"
];