import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const HeaderPlanBiraj = () => {
  return (
    <Box
     
    >
      <Box>
      <Link href="/dashboard/myplansbiraj" style={{textDecoration:"none", color:"black"}}>
        <Typography variant="h4" sx={{marginTop:'70px'}}>My Plans</Typography>
        </Link>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
          <Link href="/dashboard" style={{textDecoration:"none"}}>
          {/* <Typography variant="subtitle1" color="black">
            Home <span style={{marginLeft:"20px"}}>/</span>
          </Typography> */}
          </Link>
       
      
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
