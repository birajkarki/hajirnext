"use client";
import React from "react";
import { Box } from "@mui/material";
import styled from "styled-components";
import BasicTabs, { CustomTabPanel } from "@/components/plansTab/PlansTab";

const Top = styled.div`
  margin-top: -40px;
  font-weight: 200;
`;
const Mid = styled.div`
  justify-content: center;
  text-align: center;
`;
const Tabb = styled.div``;
const Planss = styled.div`
  align-items: center;
  justify-content: center;
`;
const page = () => {
  return (
    <div>
      <Box>
        <Top>
          {/* <h1 style={{ fontWeight: "500", marginTop: "10px" }}> My Plans</h1> */}
          <h2 style={{ marginTop: "-0px", color: "gray", fontWeight: "300" }}>
            My Plans
          </h2>
        </Top>
        <Mid>
          <h1 style={{ fontWeight: "500" }}>
            Choose the plan that is right for you
          </h1>
          <h2 style={{ color: "gray", fontWeight: "300", marginTop: "-15px" }}>
            Unlock your endless opportunities
          </h2>
        </Mid>
        <Tabb>
          <BasicTabs></BasicTabs>
        </Tabb>
        <Planss>
          <CustomTabPanel></CustomTabPanel>
        </Planss>
      </Box>
    </div>
  );
};

export default page;
