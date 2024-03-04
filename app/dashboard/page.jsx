import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DashboardDetailedbottom from "@/components/dashboard/DashboardDetailedButtom/DashboardDetailedbottom";
import DashboardFirstComponent from "@/components/dashboard/MainDashboard/DashboardFirstComponent";

export default function Dashboard() {
  const token =
    typeof window !== "undefined" && JSON.parse(localStorage.getItem("token"));
  console.log(token);
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          // height: "100%",
          display: "flex",
          // width: "100%",
          flexDirection: "column",
          // backgroundColor: "green",
        }}
      >
        <Grid container spacing={2}>
          <Box pt={4}>
            <DashboardFirstComponent />
          </Box>
        </Grid>

        <DashboardDetailedbottom />
      </Box>
    </>
  );
}
