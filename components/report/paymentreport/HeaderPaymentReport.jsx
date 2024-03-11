"use client";
import { Grid, Typography } from "@mui/material";
import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/system";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "100vh", // Set the height to 100% of the viewport height
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const HeaderPaymentReport = () => {
  return (
    <>
    <div style={{fontWeight:"500", marginTop:"50px", fontSize:"24px"}}>Payment Reports</div>
    <div
          style={{
            display: "flex",
            fontWeight: "200",
            flexDirection: "row",
            fontSize: "20px",
            marginTop: "-10px",
            color: "gray",
          }}
        >
          <p style={{ fontWeight: "200", marginRight: "19px", color:'black' }}>Home</p>
          <p style={{ fontWeight: "200", marginRight: "19px", color:'black' }}>Reports</p>
          <p style={{ fontWeight: "200" }}>Payment Reports</p>
        </div>
      
    <Stack
      direction={{ xs: "column", sm: "row" }}
      sx={{ width: "96%"}}
      spacing={{ xs: 1, sm: 2, md: 12 }}
      mr={3}
    >
      <Item sx={{ backgroundColor: "#22408B0D ", width:'345px' }}>
        <Typography sx={{ color: "#FF5050" }} variant="h6">
          2,00,000
        </Typography>
        <Typography variant="body1">Total Amount</Typography>
      </Item>

      <Item sx={{ backgroundColor: "#0080000D", width:'345px'}}>
        <Typography sx={{ color: "#FF5050" }} variant="h6">
          150,000
        </Typography>
        <Typography variant="body1">Paid</Typography>
      </Item>

      <Item sx={{ backgroundColor: "#FF00000D ", width:'345px'}}>
        <Typography sx={{ color: "#FF5050" }} variant="h6">
          50,000
        </Typography>
        <Typography variant="body1">Unpaid</Typography>
      </Item>
    </Stack>
    </>
  );
};

export default HeaderPaymentReport;
