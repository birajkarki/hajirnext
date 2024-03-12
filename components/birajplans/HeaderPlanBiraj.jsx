import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const HeaderPlanBiraj = () => {
  return (
    <Box
     
    >
      <Box>
        <Typography variant="h4" sx={{marginTop:'70px'}}>My Plans</Typography>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
          <Typography variant="subtitle1" color="black">
            Home
          </Typography>
          <Typography variant="subtitle1" color="gray">
            My Plans
          </Typography>
        </div>
      </Box>
      <Box sx={{ display:'flex', flexDirection:'column',justifyContent:'center',textAlign: 'center', margin: 'auto',marginBottom:"10px", marginTop:'5px', alignItems:'center'}}>
        <Typography variant="subtitle1" color="#434345" sx={{fontSize:'25px', fontWeight:'500', marginBottom:'12px'}}>
          Choose the plan that is right for you
        </Typography>
        <Typography variant="subtitle1" color="#434345" sx={{fontSize:'18px', marginBottom:'34px', fontWeight:'400'}}>
     Unlock your endless opportunities
        </Typography>
      </Box>
    </Box>
  );
};

export default HeaderPlanBiraj;
