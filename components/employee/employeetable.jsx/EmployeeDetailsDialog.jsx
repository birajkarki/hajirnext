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
import { useGetCandidateDetailQuery } from "@/services/api";
import { useParams } from "next/navigation";
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
      value: candidateDetail?.data?.departments
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
            width: 45,
            height: 42,
            cursor: "pointer",
            marginTop: "8px",
            marginLeft: "13px",
          }}
          alt="Profile Avatar"
        />
        <DialogTitle style={{ marginTop: "-16px" }}>
          {selectedRowCandidate && selectedRowCandidate.name} <br />
          <span
            style={{ fontWeight: "300", fontSize: "15px", marginTop: "0px" }}
          >
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
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {tableRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{ borderRight: "1px solid #ccc", padding: "8px" }}
                  >
                    {row.label}
                  </TableCell>
                  <TableCell>{row.value}</TableCell>
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
