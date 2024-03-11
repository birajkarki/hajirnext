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
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="pricing tabs"
        centered
      >
        <Tab
          value="monthly"
          label="Monthly"
          style={{
            color:"black",
            backgroundColor: activeTab === "monthly" ? "#FFF" : inactiveBackgroundColor,
            width: '50%',
            border: `1px solid ${inactiveBackgroundColor}`, // Border color matches the background color of inactive tab
            borderRadius: activeTab === "monthly" ? "10px 0px 0px 10px" : "10px 0px 0px 10px",
         
          }}
        />
        <Tab
       
          value="yearly"
          label="Yearly, Save 30%"
          style={{
            color:"black",
            backgroundColor: activeTab === "yearly" ? "#FFF" : inactiveBackgroundColor,
            width: '50%',
            marginRight:'50px',
            border: `1px solid ${inactiveBackgroundColor}`, // Border color matches the background color of inactive tab
            borderRadius: activeTab === "yearly" ? "0px 10px 10px 0px" : "0px 10px 10px 0px",
          }}
        />
      </Tabs>
      <Box mt={3}>
        <Grid container spacing={2} justifyContent="space-around">
          {activeTab === "monthly" ? <MonthlyPlans /> : <YearlyPlans />}
        </Grid>
      </Box>
    </Container>
  );
}
