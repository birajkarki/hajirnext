"use client";
import { BirajPlanTab } from "@/components/birajplans/BirajPlanTab";
import HeaderPlanBiraj from "@/components/birajplans/HeaderPlanBiraj";
import React from "react";

const page = () => {
  return (
    <>
      <HeaderPlanBiraj />

      <BirajPlanTab />
    </>
  );
};

export default page;
