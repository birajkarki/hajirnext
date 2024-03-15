import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import React from "react";

const HeaderEmployeeSteps = ({companyId}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        borderBottom: "1px solid #e0e0e0",
        marginTop:'70px',
      }}
    >
      <Box>
        <Typography variant="h5">Add New Employee</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
        <Link href={"/dashboard"} style={{ textDecoration: "none" }}>

        <Typography
            variant="subtitle1"
           
            sx={{ marginRight: "14px", color:"black" }}
          >
            Home
          </Typography>
          </Link>
          <Link href={`/dashboard/company/${companyId}`} style={{ textDecoration: "none" }}>

          <Typography
            variant="subtitle1"
            color="textSecondary"
            sx={{ marginRight: "14px", color:"black" }}
          >
            Employee
          </Typography>
       </Link>
        <Link href={`/dashboard/company/${companyId}/employee/createemployee`} style={{ textDecoration: "none" }}>

          <Typography
            variant="subtitle1"
        
            sx={{ marginLeft: "8px", color:"#434345CC" }}
          >
            New Employee
          </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderEmployeeSteps;
