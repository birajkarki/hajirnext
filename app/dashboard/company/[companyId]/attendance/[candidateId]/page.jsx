"use client";
import React from "react";
import { useParams } from "next/navigation";
import {
  useGetDailyCompanyCandidatePerformaceReportQuery,
  getWeeklyCompanyCandidatePerformaceReport,
  getMonthlyCompanyCandidatePerformaceReport,
  getYearlyCompanyCandidatePerformaceReport,
  useGetCandidateDetailQuery,
} from "@/services/api";
import "react-date-range/dist/theme/default.css";
import HeaderPerformanceReport from "@/components/report/performancereport/HeaderPerformanceReport";
import CalenderPerformaceReport from "@/components/report/performancereport/CalenderPerformaceReport";

function PerformaceReport() {
  // Define today's date
  const today_date = new Date().toISOString().split("T")[0];

  // Extract params
  const { candidateId, companyId } = useParams();

  // Fetch performance report daily data
  const { data: report } = useGetDailyCompanyCandidatePerformaceReportQuery({
    company_id: companyId,
    candidate_id: candidateId,
    today_date: today_date,
  });

  const { data: candidateDetail } = useGetCandidateDetailQuery({
    candidate_id: candidateId,
    company_id: companyId,
  });
  // const name = candidateDetail.data.name;
  // const designation = candidateDetail.data.designation;

  // const { data: yearlyReport } = getYearlyCompanyCandidatePerformaceReport({
  //   company_id: companyId,
  // });
  // console.log("yearly report data", yearlyReport);

  // Display the report
  const name = candidateDetail?.data?.name;
  const designation = candidateDetail?.data?.designation;

  return (
    <div>
      <HeaderPerformanceReport name={name} designation={designation} />
      <CalenderPerformaceReport />
    </div>
  );
}

export default PerformaceReport;
