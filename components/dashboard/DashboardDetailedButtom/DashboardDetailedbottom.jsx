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
        // flexGrow: 1,
        height: "100%",
        display: "flex",
        width: "100%",

        flexDirection: "column",
      }}
    >
      <Grid
        container
        direction="row"
        sx={{
          width: { lg: "95%", xl: "95%", md: "95%", sm: "100%", xs: "100%" },
        }}
        spacing={9}
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
              border: "1px solid #22408B", // Add border
              borderRadius: "5px",
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: "black", fontSize: "20px" }}
            >
              Total Company
            </Typography>
            <Typography
              sx={{ color: "#22408B", fontSize: "28px" }}
              variant="h6"
            >
              {totalCompany}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper
            sx={{
              backgroundColor: "rgba(98, 79, 181, 0.05) ",

              height: "120px",
              padding: (theme) => theme.spacing(4),
              textAlign: "center",
              color: (theme) => theme.palette.text.secondary,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid #624FB5", // Add border
              borderRadius: "5px",
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: "black", fontSize: "20px" }}
            >
              Total Employee
            </Typography>
            <Typography
              sx={{ color: "#22408B", fontSize: "28px" }}
              variant="h6"
            >
              0
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper
            sx={{
              backgroundColor: "rgba(0, 128, 0, 0.05)",
              height: "120px",
              padding: (theme) => theme.spacing(4),
              textAlign: "center",
              color: (theme) => theme.palette.text.secondary,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid #00800033", // Add border
              borderRadius: "5px",
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: "black", fontSize: "20px" }}
            >
              Active Employee
            </Typography>
            <Typography
              sx={{ color: "#22408B", fontSize: "28px" }}
              variant="h6"
            >
              0
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper
            sx={{
              backgroundColor: "#FF50500D",

              height: "120px",
              padding: (theme) => theme.spacing(4),
              textAlign: "center",
              color: (theme) => theme.palette.text.secondary,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid #FF505033",
              borderRadius: "5px",
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: "black", fontSize: "20px" }}
            >
              Inactive Employee
            </Typography>
            <Typography
              sx={{ color: "#22408B", fontSize: "28px" }}
              variant="h6"
            >
              0
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardDetailedbottom;
