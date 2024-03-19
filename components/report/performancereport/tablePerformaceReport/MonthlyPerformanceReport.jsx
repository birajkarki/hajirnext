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
import {   useGetMonthlyCompanyCandidatePerformaceReportQuery} from "@/services/api";
import { useParams } from "next/navigation";
import NotifyComponent from "../tabNotificationPayment/NotifyComponent";

const MonthlyPerformanceReport = ({ startDate }) => {
  const { candidateId, companyId } = useParams();
const monthandyear = startDate.getMonth() + 1 + "/" + startDate.getFullYear();

  const { data: getMonthlyCompanyCandidatePerformaceReport } =
  useGetMonthlyCompanyCandidatePerformaceReportQuery({
      candidate_id: candidateId,
      company_id: companyId,
      monthandyear: monthandyear
      
    });
  console.log(getMonthlyCompanyCandidatePerformaceReport);
  return (
    <Box>
      <h2>Monthly Performance Report</h2>
      <p>
        {/* Displaying data from {startDate.getFullYear()} to{" "}
        {endDate.getFullYear()} */}
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
                
                 
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Right side with message box and submit button */}
        <Grid item xs={6}>
          <NotifyComponent />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MonthlyPerformanceReport;
