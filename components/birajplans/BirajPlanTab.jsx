import React, { useState } from "react";
import { Tabs, Tab, Box, Container, Grid } from "@mui/material";
import MonthlyPlans from "./MonthlyPlans";
import YearlyPlans from "./YearlyPlans";

export function BirajPlanTab() {
  const [activeTab, setActiveTab] = useState("monthly");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const inactiveBackgroundColor = "#F0F0F0";

  return (
    <Container>
 
      <Box mt={3}>
        <Grid container spacing={3} justifyContent="space-around">
          <MonthlyPlans /> 
        </Grid>
      </Box>
    </Container>
  );
}
