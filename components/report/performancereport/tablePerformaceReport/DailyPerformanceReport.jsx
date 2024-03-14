import React from "react";
import { Button, Box } from "@mui/material";

const DailyPerformanceReport = ({ startDate, endDate }) => {
  // Fetch and display daily performance data based on startDate and endDate
  return (
    <Box
      style={{
        width: "100%", // Corrected width value
      }}
    >
      <h2>Daily Performance Report</h2>
      <p>Displaying data for {startDate.toLocaleDateString()}</p>
    

    </Box>
  );
};

export default DailyPerformanceReport;
