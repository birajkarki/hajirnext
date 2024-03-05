import React, { useState } from "react";
import { Tabs, Tab, Box, Container, Grid } from "@mui/material";
import MonthlyPlans from "./MonthlyPlans";
import YearlyPlans from "./YearlyPlans";

export function BirajPlanTab() {
  const [activeTab, setActiveTab] = useState("monthly");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="pricing tabs"
        centered
      >
        <Tab value="monthly" label="Monthly" />
        <Tab value="yearly" label="Yearly" />
      </Tabs>
      <Box mt={3}>
        <Grid container spacing={2} justifyContent="space-around">
          {activeTab === "monthly" ? <MonthlyPlans /> : <YearlyPlans />}
        </Grid>
      </Box>
    </Container>
  );
}
