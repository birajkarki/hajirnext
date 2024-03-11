"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import {
  useGetDailyCompanyCandidatePerformaceReportQuery,
  useGetDailyCompanyCandidateReportQuery,
} from "@/services/api";
import "react-date-range/dist/theme/default.css";
import { addDays, format, isWeekend } from "date-fns";
import HeaderPerformanceReport from "@/components/report/performancereport/HeaderPerformanceReport";
import CalenderPerformaceReport from "@/components/report/performancereport/CalenderPerformaceReport";

function PerformaceReport({ name, designation }) {
  const { candidateId, companyId } = useParams();

  return (
    <div>
      <HeaderPerformanceReport name={name} designation={designation} />
      <CalenderPerformaceReport />
    </div>
  );
}

export default PerformaceReport;
