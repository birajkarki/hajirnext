
"use client"
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
  const tableRows = [
    {
      label: "Mobile Number",
      value: selectedRowCandidate ? selectedRowCandidate.phone : "",
    },
    {
      label: "Department",
      value: selectedRowCandidate ? selectedRowCandidate.designation : "",
    },
    {
      label: "Marital Status",
      value: selectedRowCandidate ? selectedRowCandidate.marriage_status : "",
    },
    { label: "Salary", value: "" },
    { label: "Salary Type", value: "" },
    { label: "Probation Periods", value: "" },
    { label: "Working hours", value: "" },
    { label: "Weekly off", value: "" },
    { label: "Joining Date", value: "" },
    { label: "Allow late clock in", value: "" },
    { label: "Overtime", value: "" },
    { label: "Allowance", value: "" },
    { label: "Sick leave", value: "" },
    { label: "Casual Leave", value: "" },
    { label: "Network access", value: "" },
  ];

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "row", marginTop: "10px", marginBottom: "-20px" }}>
        <Avatar
          src={(selectedRowCandidate && selectedRowCandidate.profile_image) || "/default-avatar.png"}
          sx={{
            width: 53,
            height: 52,
            cursor: "pointer",
            marginTop: "10px",
            marginLeft: "22px"
          }}
          alt="Profile Avatar"
        />
        <DialogTitle style={{ display: "flex", flexDirection: "column", marginTop: "-6px" }}>
          <span style={{ marginBottom: "-2px", color: "#434345" }}>{selectedRowCandidate && selectedRowCandidate.name}</span>
          <span style={{ fontWeight: "300", fontSize: "16px" }}>{selectedRowCandidate && selectedRowCandidate.designation}</span>
        </DialogTitle>
        <DialogActions>
          <Button onClick={onClose} sx={{ marginTop: "-50px", marginLeft: "190px" }}>
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
                  <TableCell sx={{ borderRight: "1px solid #ccc", borderBottom: index === tableRows.length - 1 ? "none" : "1px solid #ccc", padding: "8px" }}>
                    {row.label}
                  </TableCell>
                  <TableCell sx={{ borderBottom: index === tableRows.length - 1 ? "none" : "1px solid #ccc", padding: "8px" }}>{row.value}</TableCell>
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

