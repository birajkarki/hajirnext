"use client";
import React from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

const EmployeeDetailsDialog = ({ isOpen, onClose, selectedRowCandidate }) => {
  const selectedEmployee = selectedRowCandidate?.candidate_id;
  const { companyId } = useParams();

  console.log(selectedEmployee, "selected row candidate ");
  const { data: candidateDetail, isLoading: isLoading } =
    useGetCandidateDetailQuery({
      company_id: companyId,
      candidate_id: selectedEmployee,
    });
  console.log(candidateDetail);
  const tableRows = [
    {
      label: "Mobile Number",
      value: candidateDetail ? candidateDetail?.data?.phone : "",
    },
    {
      label: "Department",
      value: candidateDetail
        ? candidateDetail.data.departments
            .map((department) => department.name)
            .join(", ")
        : "",
    },

    {
      label: "Marital Status",
      value: candidateDetail ? candidateDetail?.data?.marriage_status : "",
    },
    {
      label: "Salary",
      value: candidateDetail ? candidateDetail?.data?.salary_amount : "",
    },
    {
      label: "Salary Type",
      value: candidateDetail ? candidateDetail?.data?.salary_type : "",
    },
    {
      label: "Probation Periods",
      value: candidateDetail ? candidateDetail?.data?.probation_period : "",
    },
    {
      label: "Working hours",
      value: candidateDetail ? candidateDetail?.data?.working_hours : "",
    },
    {
      label: "Weekly off",
      value: candidateDetail ? candidateDetail?.data?.weekly_off : "",
    },
    {
      label: "Joining Date",
      value: candidateDetail ? candidateDetail?.data?.joining_date : "",
    },
    {
      label: "Allow late clock in",
      value: candidateDetail
        ? candidateDetail?.data?.allow_late_attendance
        : "",
    },
    {
      label: "Overtime",
      value: candidateDetail ? candidateDetail?.data?.overtime_hrs : "",
    },
    {
      label: "Allowance",
      value: candidateDetail ? candidateDetail?.data?.allowance_amount : "",
    },
    {
      label: "Sick leave",
      value: candidateDetail ? candidateDetail?.data?.sick_leave : "",
    },
    {
      label: "Casual Leave",
      value: candidateDetail ? candidateDetail?.data?.casual_leave : "",
    },
    {
      label: "Network access",
      value: candidateDetail ? candidateDetail?.data?.allow_network_access : "",
    },
  ];

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "10px",
          marginBottom: "-20px",
        }}
      >
        <Avatar
          src={
            (selectedRowCandidate && selectedRowCandidate.profile_image) ||
            "/default-avatar.png"
          }
          sx={{
            width: 53,
            height: 52,
            cursor: "pointer",
            marginTop: "10px",
            marginLeft: "22px",
          }}
          alt="Profile Avatar"
        />
        <DialogTitle
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "-6px",
          }}
        >
          <span style={{ marginBottom: "-2px", color: "#434345" }}>
            {selectedRowCandidate && selectedRowCandidate.name}
          </span>
          <span style={{ fontWeight: "300", fontSize: "16px" }}>
            {selectedRowCandidate && selectedRowCandidate.designation}
          </span>
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={onClose}
            sx={{ marginTop: "-50px", marginLeft: "190px" }}
          >
            <CloseOutlined style={{ color: "black" }} />
          </Button>
        </DialogActions>
      </div>
      <DialogContent>
        <TableContainer component={Paper} sx={{ border: "1px solid #ccc" }}>
          <Table>
            <TableBody>
              {tableRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      borderRight: "1px solid #ccc",
                      borderBottom:
                        index === tableRows.length - 1
                          ? "none"
                          : "1px solid #ccc",
                      padding: "8px",
                    }}
                  >
                    {row.label}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom:
                        index === tableRows.length - 1
                          ? "none"
                          : "1px solid #ccc",
                      padding: "8px",
                    }}
                  >
                    {row.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDetailsDialog;
