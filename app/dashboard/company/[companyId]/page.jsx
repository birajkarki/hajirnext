"use client";
import React from "react";
import { useParams } from "next/navigation";
import FirstPageEmployee from "@/components/employee/FirstPageEmployee";
import EmployeeFormFirst from "@/components/employee/EmployeeFormFirst";
import { useGetCandidatesQuery } from "@/services/api";

export default function CompanyDashboard() {
  const { companyId } = useParams();
  // console.log("companyId:", companyId);

  const {
    data: candidateData,
    isLoading,
    refetch,
  } = useGetCandidatesQuery(companyId); // Pass companyId to the query
  // console.log("use client", candidateData, isLoading);
  // console.log(candidateData?.data?.active_candidates, "active_candidates");
  // console.log(candidateData?.data?.inactive_candidates, "inactive_candidates");

  const hasEmployees =
    (candidateData?.data?.active_candidates?.length || 0) +
      (candidateData?.data?.inactive_candidates?.length || 0) >
    0;
  return (
    <div>{hasEmployees ? <FirstPageEmployee /> : <EmployeeFormFirst />}</div>
  );
}
