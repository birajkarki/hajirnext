import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import GetAppIcon from "@mui/icons-material/GetApp";
import ShareIcon from "@mui/icons-material/Share";
import Link from "next/link";
import Grid from "@mui/material/Grid";

const HeaderPerformanceReport = ({ name, designation }) => {
  return (
    <Box
      sx={{
        borderBottom: "1px solid #e0e0e0",
        padding: "16px",
      }}
    >
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={12} md={8}>
          <Typography variant="h5">Performance Report</Typography>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Link href="/dashboard" sx={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  marginTop: "10px",
                  color: "#434345",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "21px",
                  letterSpacing: "0.15px",
                }}
              >
                Home
              </Typography>
            </Link>
            <Link href="/dashboard" sx={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  marginTop: "10px",
                  color: "#434345",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "21px",
                  letterSpacing: "0.15px",
                }}
              >
                Attendance
              </Typography>
            </Link>
            <Link href="/dashboard" sx={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  marginTop: "10px",
                  color: "#434345",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "21px",
                  letterSpacing: "0.15px",
                }}
              >
                Performance Report
              </Typography>
            </Link>
          </Box>
          <Typography sx={{ marginTop: "30px", fontSize: "22px" }}>
            Name: {name}
          </Typography>
          <Typography sx={{ marginTop: "10px", fontSize: "18px" }}>
            Designation: {designation}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} sx={{ textAlign: "right" }}>
          <IconButton color="primary" aria-label="Download PDF">
            <GetAppIcon />
          </IconButton>
          <IconButton color="primary" aria-label="Share">
            <ShareIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeaderPerformanceReport;
