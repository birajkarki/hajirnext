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
import { useGetWeeklyCompanyCandidatePerformaceReportQuery } from "@/services/api";
import { useParams } from "next/navigation";
import NotifyComponent from "../tabNotificationPayment/NotifyComponent";
import { useEffect } from "react";

const WeeklyPerformanceReport = ({ startDateValue, endDateValue }) => {
  const { candidateId, companyId } = useParams();

  const { data: getweeklyCompanyCandidatePerformanceReport, refetch } =
  useGetWeeklyCompanyCandidatePerformaceReportQuery({
      candidate_id: candidateId,
      company_id: companyId,
      from_date: startDateValue,
      to_date: endDateValue,
    });

    useEffect(() => {
      refetch();
    }, [startDateValue, endDateValue, refetch]);
  console.log(getweeklyCompanyCandidatePerformanceReport);
  return (
    <Box>
      <h2>Weekly Performance Report</h2>
      <p>
    
      </p>
      <Grid container spacing={3}>
        {/* Left side with table */}
        <Grid item xs={6}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Salary</TableCell>
                  <TableCell>Overtime</TableCell>
                  <TableCell>Allowance</TableCell>
                  <TableCell>Total Salary</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
             
                    <TableRow >
                    <TableCell>{getweeklyCompanyCandidatePerformanceReport?.data.salary}</TableCell>
                  <TableCell>{getweeklyCompanyCandidatePerformanceReport?.data.overtime}</TableCell>
                  <TableCell>{getweeklyCompanyCandidatePerformanceReport?.data.allowance}</TableCell>
                  <TableCell>{getweeklyCompanyCandidatePerformanceReport?.data.total_salary}</TableCell>

                  </TableRow>

                <TableRow>
                  <TableCell colSpan={3}>Total Amount</TableCell>
                
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Right side with message box and submit button */}
        <Grid item xs={6}>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WeeklyPerformanceReport;
