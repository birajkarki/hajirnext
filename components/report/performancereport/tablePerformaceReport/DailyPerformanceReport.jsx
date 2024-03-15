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
import { useGetDailyCompanyCandidatePerformaceReportQuery } from "@/services/api";
import { useParams } from "next/navigation";
import NotifyComponent from "../tabNotificationPayment/NotifyComponent";

const DailyPerformanceReport = ({ startDate, endDate }) => {
  const { candidateId, companyId } = useParams();

  const { data: dailyCompanyCandidatePerformanceReport } =
    useGetDailyCompanyCandidatePerformaceReportQuery({
      candidate_id: candidateId,
      company_id: companyId,
    });
  console.log(dailyCompanyCandidatePerformanceReport);
  return (
    <Box>
      <h2>Yearly Performance Report</h2>
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
                {yearlyCompanyCandidatePerformanceReport?.data.map(
                  (item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.month}</TableCell>
                      <TableCell>
                        <span
                          style={{
                            backgroundColor:
                              item.status === "Paid"
                                ? "#00800033"
                                : "#FF505033",
                            color: item.status === "Paid" ? "green" : "red",
                            padding: "7px",
                            borderRadius: "4px",

                            textAlign: "center",
                            justifyContent: "center",
                            marginRight: "10px",
                            height: "34px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {item.status}
                        </span>
                      </TableCell>{" "}
                      <TableCell>
                        {typeof item.amount === "string"
                          ? parseFloat(item.amount).toFixed(2)
                          : item.amount.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  )
                )}
                {/* Total row */}
                <TableRow>
                  <TableCell colSpan={3}>Total Amount</TableCell>
                  <TableCell>
                    {/* Calculate total amount here */}
                    {yearlyCompanyCandidatePerformanceReport?.data
                      .reduce((total, item) => {
                        return (
                          total +
                          (typeof item.amount === "string"
                            ? parseFloat(item.amount)
                            : item.amount)
                        );
                      }, 0)
                      .toFixed(2)}
                  </TableCell>
                </TableRow>
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

export default DailyPerformanceReport;
