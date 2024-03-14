
import { Grid, Typography } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/system";
import { useParams } from "next/navigation";
import { useGetEmployerCompaniesQuery } from "@/services/api";

const DashboardDetailedbottom = () => {
  const { companyId } = useParams();

  const {
    data: companyData,
    isLoading,
    refetch,
  } = useGetEmployerCompaniesQuery(companyId);

  const activeCompaniesLength =
    companyData?.data?.active_companies?.length || 0;
  const inactiveCompaniesLength =
    companyData?.data?.inactive_companies?.length || 0;

  const totalCompany = activeCompaniesLength + inactiveCompaniesLength;

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100%",
        display: "flex",
        width: "100%",
        flexDirection: "column",
     marginTop:'100px'
      }}
    >
      <Grid
        container
        direction={{ xs: "column", sm: "row" }}
        sx={{ width: "90%"}}
        spacing={2}
      >
        <Grid item xs={12} sm={6}>
          <Paper
            sx={{
              backgroundColor: "rgba(34, 64, 139, 0.08)",
              height: "120px",
              padding: (theme) => theme.spacing(4),
              textAlign: "center",
              color: (theme) => theme.palette.text.secondary,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" sx={{ color: "black", fontSize: "20px" }}>
              Total Company
            </Typography>
            <Typography sx={{ color: "#22408B", fontSize: "28px" }} variant="h6">
              {totalCompany}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper
            sx={{
              backgroundColor: "rgba(34, 64, 139, 0.09)",
              height: "120px",
              padding: (theme) => theme.spacing(4),
              textAlign: "center",
              color: (theme) => theme.palette.text.secondary,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" sx={{ color: "black", fontSize: "20px" }}>
              Total Employee
            </Typography>
            <Typography sx={{ color: "#22408B", fontSize: "28px" }} variant="h6">
              0
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper
            sx={{
              backgroundColor: "rgba(0, 128, 0, 0.08)",
              height: "120px",
              padding: (theme) => theme.spacing(4),
              textAlign: "center",
              color: (theme) => theme.palette.text.secondary,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" sx={{ color: "black", fontSize: "20px" }}>
              Active Employee
            </Typography>
            <Typography sx={{ color: "#22408B", fontSize: "28px" }} variant="h6">
              0
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper
            sx={{
              backgroundColor: "rgba(255, 80, 80, 0.08)",
              height: "120px",
              padding: (theme) => theme.spacing(4),
              textAlign: "center",
              color: (theme) => theme.palette.text.secondary,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" sx={{ color: "black", fontSize: "20px" }}>
              Inactive Employee
            </Typography>
            <Typography sx={{ color: "#22408B", fontSize: "28px" }} variant="h6">
              0
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardDetailedbottom;

