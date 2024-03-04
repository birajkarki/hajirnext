"use client";
import React from "react";
import { Box, useMediaQuery } from "@mui/material";

import BasicTabs, { CustomTabPanel } from "@/components/plansTab/PlansTab";

const page = () => {

  return (
    <>
      <Box>
        <div style={{ marginTop: "5px", fontWeight: "200" }}>
          <h1 style={{ fontWeight: "500" }}> My Plans</h1>
          <h2 style={{ marginTop: "-20px", color: "gray", fontWeight: "300" }}>
            My Plans
          </h2>
        </div>
        <div
          style={{
            justifyContent: "center",
            textAlign: "center",
            marginTop: "-30px",
          }}
        >
          <h1 style={{ fontWeight: "500" }}>
            Choose the plan that is right for you
          </h1>
          <h2 style={{ color: "gray", fontWeight: "300", marginTop: "-15px" }}>
            Unlock your endless opportunities
          </h2>
        </div>
        <div>
          <BasicTabs></BasicTabs>
        </div>
        <div style={{ alignItems: "center", justifyContent: "center" }}>
          <CustomTabPanel></CustomTabPanel>
        </div>
      </Box>
    </>
  );
};

export default page;
