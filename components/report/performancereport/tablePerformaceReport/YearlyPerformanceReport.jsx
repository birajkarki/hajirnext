import React from "react";
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
} from "@mui/material";
import { useGetYearlyCompanyCandidatePerformaceReportQuery } from "@/services/api";

const YearlyPerformanceReport = ({ startDate, endDate }) => {
  console.log("this is start", startDate);
  console.log("this is end", endDate);
  const yearlyCompanyCandidatePerformanceReport =
    useGetYearlyCompanyCandidatePerformaceReportQuery();
  // console.log(yearlyCompanyCandidatePerformanceReport);
  return (
    <Box>
      <h2>Yearly Performance Report</h2>
      <p>
        Displaying data from {startDate.getFullYear()} to{" "}
        {endDate.getFullYear()}
      </p>
      <Grid container spacing={3}>
        {/* Left side with table */}
        <Grid item xs={6}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Payment Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Rows for data */}
                {/* Example row */}
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>2024-01-01</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Paid</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {/* Total row */}
          {/* You can calculate totals and display here */}
        </Grid>
        {/* Right side with message box and submit button */}
        <Grid item xs={6}>
          <Box>
            <TextField
              label="Send Message to Candidate"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
            />
            <Button variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default YearlyPerformanceReport;
