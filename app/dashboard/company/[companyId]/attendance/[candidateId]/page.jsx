"use client";
import React from "react";
import { useParams } from "next/navigation";
import "react-date-range/dist/theme/default.css";
import HeaderPerformanceReport from "@/components/report/performancereport/HeaderPerformanceReport";
import CalenderPerformaceReport from "@/components/report/performancereport/CalenderPerformaceReport";
import { useGetCandidateDetailQuery } from "@/services/api";

function PerformaceReport() {

  const { candidateId, companyId } = useParams();

  const { data: candidateDetail } = useGetCandidateDetailQuery({
    candidate_id: candidateId,
    company_id: companyId,
  });

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
