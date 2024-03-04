'use client'
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TabPanel } from '@mui/lab';
import styled from 'styled-components';
import SimplePaper from '../PlansPaper/PlansPaper';
import Monthly from '../monthly/monthly';
export function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
         <div
      style={{
        display: value === index ? 'block' : 'none'
      }}
      {...other}
    >
    {value === index && (
      <Box sx={{ p: 3 }}>
        <Typography>{children}</Typography>
      </Box>
    )}
  </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          borderColor: 'divider',
          display:'flex',
          justifyContent: 'center',
          alignItems: 'center',
   
          textAlign: 'center',

          maxWidth: '600px',
          margin:'auto',
        }}
      >
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ width: '100%' , display:'flex', justifyContent:'center'}}>
          <Tab label="Monthly" {...a11yProps(0)} sx={{ width: '50%', borderColor: 'gray',  color: 'black' }} />
          <Tab
            label="Yearly, Save 30%."
            {...a11yProps(1)}
            sx={{ width: '50%', borderRadius: '5%', borderColor: 'gray', backgroundColor: 'white', color: 'black' }}
          />
        </Tabs>
      </Box>

      {/* CustomTabPanel for Monthly content, only rendered when the value is 0 */}
      <CustomTabPanel value={value} index={0}>
        <Monthly />
      </CustomTabPanel>

      {/* CustomTabPanel for Yearly content, only rendered when the value is 1 */}
      <CustomTabPanel value={value} index={1}>
        <SimplePaper />
      </CustomTabPanel>
    </Box>
  );
}
