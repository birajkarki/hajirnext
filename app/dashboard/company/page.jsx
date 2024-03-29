"use client";
import React from "react";
import { useGetEmployerCompaniesQuery } from "@/services/api";
import CreateCompanyCard from "@/components/company/CreateCompanyCard";
import CompanyList from "@/components/company/CompanyList";

export default function MainDashboard() {
  const {
    data: companiesData,
    isLoading,
    refetch,
  } = useGetEmployerCompaniesQuery();
  console.log(companiesData, isLoading);
  console.log(companiesData, "companiesData");
  // Check if the user has any companies
  const hasCompanies =
    (companiesData?.data?.active_companies?.length || 0) +
      (companiesData?.data?.inactive_companies?.length || 0) >
    0;

  return <div>{hasCompanies ? <CompanyList /> : <CreateCompanyCard />}</div>;
  // return <div>{hasCompanies ? <CreateCompanyCard /> : <CompanyList />}</div>;
}
