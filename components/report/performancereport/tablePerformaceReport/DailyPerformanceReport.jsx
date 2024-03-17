import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useGetDailyCompanyCandidatePerformaceReportQuery } from "@/services/api";
import { useParams } from "next/navigation";
import NotifyComponent from "../tabNotificationPayment/NotifyComponent";
import { useEffect } from "react";

const DailyPerformanceReport = ({ startDateValue, startDate }) => {
  const { candidateId, companyId } = useParams();
  const dayandmonth = startDateValue.split("/").slice(0, 2).join("/");
  const year = startDate.getFullYear();

  const { data: getDailyCompanyCandidatePerformaceReport, refetch } = useGetDailyCompanyCandidatePerformaceReportQuery({
    company_id: companyId,
    candidate_id: candidateId,
    today_date: dayandmonth,
    year: year,
  });

  useEffect(() => {
    refetch();
  }, [startDate, startDateValue, refetch]);

  console.log("getDailyCompanyCandidatePerformaceReport", getDailyCompanyCandidatePerformaceReport);

  return (
    <Box>
      <h2>Daily Performance Report</h2>
      <h3>{startDateValue}</h3>
      <h4>{dayandmonth}</h4>
      <h4>{year}</h4>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Start Time</TableCell>
                  <TableCell>End Time</TableCell>
                  <TableCell>Break Time</TableCell>
                  <TableCell>Attendance Duration</TableCell>
                  <TableCell>Total Earnings</TableCell>
                  <TableCell>Overtime Earnings</TableCell>
                  <TableCell>Allowance</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{getDailyCompanyCandidatePerformaceReport?.data.start_time}</TableCell>
                  <TableCell>{getDailyCompanyCandidatePerformaceReport?.data.end_time}</TableCell>
                  <TableCell>{getDailyCompanyCandidatePerformaceReport?.data.break_time}</TableCell>
                  <TableCell>{getDailyCompanyCandidatePerformaceReport?.data.attendance_duration}</TableCell>
                  <TableCell>{getDailyCompanyCandidatePerformaceReport?.data.totalearning}</TableCell>
                  <TableCell>{getDailyCompanyCandidatePerformaceReport?.data.overtime_earning}</TableCell>
                  <TableCell>{getDailyCompanyCandidatePerformaceReport?.data.allowance}</TableCell>
                  <TableCell>{getDailyCompanyCandidatePerformaceReport?.data.status}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Box mt={2}></Box>
    </Box>
  );
};

export default DailyPerformanceReport;
