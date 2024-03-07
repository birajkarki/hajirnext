"use client";
import { Grid, Typography } from "@mui/material";
import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/system";
import {
  useGetAllCandidateTodayQuery,
  useGetAttendanceReportTodayQuery,
  useGetInactivecandidateTodayQuery,
  useGetActivecandidateTodayQuery,
} from "@/services/api";
import { useParams } from "next/navigation";
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

const HeaderAttendance = () => {
  const { companyId } = useParams();

  const {
    data: getAllCandidateToday,
    isLoading: isLoading1,
    refetch: refetch1,
  } = useGetAllCandidateTodayQuery(companyId);
  const {
    data: getAttendaceReportToday,
    isLoading: isLoading2,
    refetch: refetch2,
  } = useGetAttendanceReportTodayQuery(companyId);
  const {
    data: getInactiveCandidateToday,
    isLoading: isLoading3,
    refetch: refetch3,
  } = useGetInactivecandidateTodayQuery(companyId);
  const {
    data: getActiveCandidateToday,
    isLoading: isLoading4,
    refetch: refetch4,
  } = useGetActivecandidateTodayQuery(companyId);

  // console.log(getAllCandidateToday, "getAllCandidateToday");
  console.log(getAttendaceReportToday, "ccccccccccccccgetAttendaceReportToday");
  // console.log(getInactiveCandidateToday, "getInactiveCandidateToday");
  // console.log(
  //   getActiveCandidateToday,
  //   "checkinggggggggggggggg getActiveCandidateToday"
  // );
  const attende = getAttendaceReportToday?.data?.total_attendee;
  const present = getAttendaceReportToday?.data?.present;
  const late = getAttendaceReportToday?.data?.late;
  const absent = getAttendaceReportToday?.data?.absent;
  const early_checkout = getAttendaceReportToday?.data?.early_check_out;
  const leave = getAttendaceReportToday?.data?.Leave;
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      sx={{ marginTop: "20px", marginRight: "20px " }}
      spacing={{ xs: 1, sm: 2, md: 12 }}
    >
      <Item sx={{ backgroundColor: "#0080000D " }}>
        <Typography sx={{ color: "#FF5050" }} variant="h6">
          {attende}
        </Typography>
        <Typography variant="body1">Attende</Typography>
      </Item>

      <Item sx={{ backgroundColor: "#FF00000D " }}>
        <Typography sx={{ color: "#FF5050" }} variant="h6">
          {present}
        </Typography>
        <Typography variant="body1">Present</Typography>
      </Item>

      <Item sx={{ backgroundColor: "#FFA5000D " }}>
        <Typography sx={{ color: "#FF5050" }} variant="h6">
          {late}
        </Typography>
        <Typography variant="body1">Late</Typography>
      </Item>
      <Item sx={{ backgroundColor: "#FFA5000D " }}>
        <Typography sx={{ color: "#FF5050" }} variant="h6">
          {absent}
        </Typography>
        <Typography variant="body1">Absent</Typography>
      </Item>
      <Item sx={{ backgroundColor: "#FFA5000D " }}>
        <Typography sx={{ color: "#FF5050" }} variant="h6">
          {early_checkout}
        </Typography>
        <Typography variant="body1">Early Checkout</Typography>
      </Item>
      <Item sx={{ backgroundColor: "#FFA5000D " }}>
        <Typography sx={{ color: "#FF5050" }} variant="h6">
          {leave}
        </Typography>
        <Typography variant="body1">Leave</Typography>
      </Item>
    </Stack>
  );
};

export default HeaderAttendance;
