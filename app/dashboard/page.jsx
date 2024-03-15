'use client'
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DashboardDetailedbottom from "@/components/dashboard/DashboardDetailedButtom/DashboardDetailedbottom";
import DashboardFirstComponent from "@/components/dashboard/MainDashboard/DashboardFirstComponent";
import { Typography } from "@mui/material";

export default function Dashboard() {
  const token =
    typeof window !== "undefined" && JSON.parse(localStorage.getItem("token"));
  console.log(token);

  return (
    <>
    <Box >
    <div style={{display:'flex', flexDirection:'column'}}>
          <Typography sx={{ color:"#434345", fontWeight:"500", fontSize:"24px"}} >Dashboard</Typography>
          <Typography sx={{ marginBottom:'26px'}} >Dashboard</Typography>
          </div>
    </Box>
      <Box
        sx={{
          flexGrow: 1,     
          display: "flex",
          flexDirection: "row",
       
        }}
      >
        <Grid container spacing={2}>
      <Grid item xs={12}  md={12} lg={6} xl={6}>
        <DashboardFirstComponent />
      </Grid>
      <Grid item xs={12} md={12} lg={6} xl={6}>
        <DashboardDetailedbottom  />
      </Grid>
    </Grid>
      </Box>
    </>
  );
}