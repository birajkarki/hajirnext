// CompanyList.js

import React, { useState } from "react";
import { Box, Grid, useMediaQuery } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useGetEmployerCompaniesQuery } from "@/services/api";
import TabsActiveInactive from "@/components/dashboard/MainDashboard/TabsActiveInactive";
import CompanyTable from "../dashboard/MainDashboard/CompanyTable";

const CompanyList = () => {
  const router = useRouter();
  const {
    data: companiesData,
    isLoading,
    refetch,
  } = useGetEmployerCompaniesQuery();

  const [selectedTab, setSelectedTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    refetch();

    setSelectedTab(newValue);
  };

  const activeCompany = companiesData?.data?.active_companies || [];
  const inactiveCompanies = activeCompany.filter(
    (company) => company.status === "Suspended"
  );

  const activeCompanies = activeCompany.filter(
    (company) => company.status === "Active"
  );
  const allCompanies = [...activeCompanies, ...inactiveCompanies];

  console.log("Active Companies:", activeCompanies);
  console.log("Active Companies:", inactiveCompanies);

  const totalCount = allCompanies.length;
  const activeCount = activeCompanies.length;
  const inactiveCount = inactiveCompanies.length;
  const isScreenBelow1270px = useMediaQuery("(max-width:1270px)");
  const isScreenBelow1120px = useMediaQuery("(max-width:1120px)");

  return (
    <>
      <Box>
        <Grid
          container
          spacing={5}
          columns={1}
          sx={{ width: "100%", height: "100%" }}
        >
          <Grid item xs={8}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <h2>Company</h2>
              </Box>
         
              <Box sx={{marginRight: isScreenBelow1120px?"80px": isScreenBelow1270px?"30px":'20px'}} >
           
                <Button
                  variant="contained"
                  onClick={() =>
                    router.push("/dashboard/company/createcompany")
                  }
                  startIcon={<AddIcon />}
                >
                  Create Company
                </Button>
              </Box>
            </Box>
            <h4>
              <span>Dashboard</span> / <span>Company</span>
            </h4>
            <Box sx={{ flexGrow: 1 }}>
              <TabsActiveInactive
                value={selectedTab}
                handleChange={handleChangeTab}
                totalCount={totalCount}
                activeCount={activeCount}
                inactiveCount={inactiveCount}
              />
              <Box
                sx={{
                  display: selectedTab === 0 ? "block" : "none",
                  height: "100%",
                }}
              >
                <CompanyTable companies={allCompanies} statusFilter="all" />
              </Box>
              <Box
                sx={{
                  display: selectedTab === 1 ? "block" : "none",
                  height: "100%",
                }}
              >
                <CompanyTable
                  companies={activeCompanies}
                  statusFilter="active"
                />
              </Box>
              <Box
                sx={{
                  display: selectedTab === 2 ? "block" : "none",
                  height: "100%",
                }}
              >
                <CompanyTable
                  companies={inactiveCompanies}
                  statusFilter="inactive"
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CompanyList;
