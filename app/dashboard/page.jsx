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
      <Box
        sx={{
          flexGrow: 1,     
          display: "flex",
          flexDirection: "row"
        }}
      >
        <Grid container spacing={2} mr={8}>
          <div style={{display:'flex', flexDirection:'column'}}>
          <Typography sx={{marginTop:'40px', marginLeft:'20px'}} >Dashboard</Typography>
          <Typography  sx={{marginLeft:'20px'}}>Dashboard</Typography>
          </div>
          <Box pt={4}>
            <DashboardFirstComponent />
          </Box>
        </Grid>

        <DashboardDetailedbottom />
      </Box>
    </>
  );
}
