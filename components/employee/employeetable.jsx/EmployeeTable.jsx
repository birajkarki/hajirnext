"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
  TablePagination,
  TextField,
  FormControl,
  Select,
  Menu,
  MenuItem,
  InputLabel,
  Avatar,
} from "@mui/material";
import {
  useDeleteCandidateQuery,
  useInviteCandidateMutation,
} from "@/services/api";
import { useParams, useRouter } from "next/navigation";
import { Delete, Edit, Update } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import EmployeeDetailsDialog from "./EmployeeDetailsDialog";

const EmployeeTable = ({ candidates, statusFilter }) => {
  console.log(candidates, "coming from active inactive filet");
  const { companyId } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isStatusChangeDialogOpen, setIsStatusChangeDialogOpen] =
    useState(false);

  const openInviteDialog = (candidate) => {
    setSelectedCandidate(candidate);
    setOpenDialog(true);
  };
  const [filteredData, setFilteredData] = useState(candidates);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedTab, setSelectedTab] = useState(0);
  const [inviteCandidate] = useInviteCandidateMutation();
  const deleteCandidate = useDeleteCandidateQuery();

  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [isRowDialogOpen, setIsRowDialogOpen] = useState(false);
  const [selectedRowCandidate, setSelectedRowCandidate] = useState(null);

  const handleSearchTextChange = (event) => {
    const text = event.target.value.toLowerCase();
    setSearchText(text);
    filterData(text, selectedTab);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    filterData(searchText, newValue);
  };

  const filterData = (searchText, department) => {
    // if (
    //   !attendanceData ||
    //   !attendanceData.data ||
    //   !attendanceData.data.candidates
    // )
    //   return;

    let filtered = candidates;
    if (searchText) {
      filtered = filtered.filter((candidate) =>
        candidate.name.toLowerCase().includes(searchText)
      );
    }
    if (department) {
      filtered = filtered.filter((candidate) =>
        candidate.departments.some((dept) => dept.name === department)
      );
    }

    setFilteredData(filtered);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleInvite = async () => {
    try {
      const status = "Not-Approved";
      const { data } = await inviteCandidate({
        candidate_id: selectedCandidate.candidate_id,
        status,
        companyId: companyId,
      });
      if (data) {
        console.log("Invite sent successfully", data);
      }
      setOpenDialog(false);
    } catch (error) {
      console.error("Error sending invitation:", error);
    }
  };

  const handleConfirmDelete = async () => {
    console.log("it is clicked");
    try {
      await deleteCandidate({
        candidate_id: selectedCandidate.candidate_id,
        company_id: companyId,
      });

      console.log("Candidate deleted successfully");

      setIsConfirmationDialogOpen(false);
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  const handleCloseConfirmationDialog = () => {
    setIsConfirmationDialogOpen(false);
  };

  const handleCloseUpdateDialog = () => {
    setIsUpdateDialogOpen(false);
  };

  const handleCloseStatusChangeDialog = () => {
    setIsStatusChangeDialogOpen(false);
  };

  const handleDeleteClick = (candidate_id) => {
    setSelectedCandidateId(candidate_id);
    setIsConfirmationDialogOpen(true);
  };

  const handleUpdate = () => {};

  const handleStatusChange = () => {
    // Implement status change functionality here
  };
  const handleRowClick = (candidate, event) => {
    const isButtonClicked = event.target.closest("button");
    if (!isButtonClicked) {
      setSelectedRow(candidate.id === selectedRow ? null : candidate.id);
      setSelectedRowCandidate(candidate);
      setIsRowDialogOpen(true);
    }
  };
  const [selectedRow, setSelectedRow] = useState(null);

  const isScreenSmall = useMediaQuery("(max-width:1024px)");
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: 1000, mt: 3 }}>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Search by Employee Name"
          variant="outlined"
          size="small"
          onChange={handleSearchTextChange}
          value={searchText}
        />

        <FormControl variant="outlined" size="small" sx={{ ml: 2, width: 200 }}>
          <InputLabel>Department</InputLabel>
          <Select
            label="Department"
            autoWidth={false}
            // value={selectedDepartment}
            // onChange={handleDepartmentChange}
          >
            <MenuItem value="">All Departments</MenuItem>
            {/* {attendanceData &&
              attendanceData.data &&
              attendanceData.data.departments.map((dept) => (
                <MenuItem key={dept.id} value={dept.name}>
                  {dept.name}
                </MenuItem>
              ))} */}
          </Select>
        </FormControl>
        <br />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>

              <TableCell>Employee Name</TableCell>
              <TableCell>Department</TableCell>

              <TableCell>Staff ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Phone</TableCell>

              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData &&
              filteredData.length > 0 &&
              filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((candidate) => (
                  <TableRow
                    key={candidate.id}
                    sx={{
                      borderBottom: "0.7px dotted #ccc",
                      backgroundColor:
                        candidate.id === selectedRow ? "#f2f2f2" : "",
                    }}
                    onClick={(event) => handleRowClick(candidate, event)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell>{candidate.id}</TableCell>

                    <TableCell sx={{ width: "40px" }}>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <label htmlFor="photo">
                          <Avatar
                            src={
                              candidate.profile_image || "/default-avatar.png"
                            }
                            sx={{
                              width: 50,
                              height: 50,
                              cursor: "pointer",
                              marginRight: "10px",
                            }}
                            alt="Profile Avatar"
                          />
                        </label>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: "5px",
                          }}
                        >
                          <span> {candidate.name}</span>
                          <span style={{ color: "gray" }}>
                            {candidate.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{candidate.designation}</TableCell>
                    <TableCell>{candidate.code}</TableCell>
                    <TableCell>
                      <span
                        style={{
                          backgroundColor:
                            candidate.status === "Not-Verified"
                              ? "#FF505033"
                              : "#00800033",
                          color:
                            candidate.status === "Not-Verified"
                              ? "red"
                              : "green",
                          padding: "7px",
                          borderRadius: "4px",
                        }}
                      >
                        {candidate.status}
                      </span>
                    </TableCell>

                    <TableCell>{candidate.phone}</TableCell>

                    <TableCell>
                      {candidate.status === "Active" ? (
                        <>
                          <IconButton
                            onClick={() => handleUpdateClick(company.id)}
                          >
                            <Update />
                          </IconButton>
                          <IconButton
                            onClick={() => handleUpdateStatusClick(company.id)}
                          >
                            <Update />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton
                            onClick={() => {
                              handleDeleteClick(company.id);
                            }}
                          >
                            <Update />
                          </IconButton>
                          <IconButton
                            onClick={() => handleUpdateStatusClick(company.id)}
                          >
                            <Update />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <EmployeeDetailsDialog
        isOpen={isRowDialogOpen}
        onClose={() => setIsRowDialogOpen(false)}
        selectedRowCandidate={selectedRowCandidate}
      />
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          Invite Candidate
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to invite {selectedCandidate && selectedCandidate.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginBottom: "10px",
          }}
        >
          <Button
            onClick={() => setOpenDialog(false)}
            color="primary"
            variant="contained"
            style={{ borderRadius: "20px 20px 20px 20px", width: "100px" }}
          >
            C<span style={{ textTransform: "lowercase" }}>ancel</span>
          </Button>
          <Button onClick={handleInvite} variant="contained" color="primary">
            Invite
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isConfirmationDialogOpen}
        onClose={handleCloseConfirmationDialog}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          Delete Employee
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this employee?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginBottom: "10px",
          }}
        >
          <Button
            onClick={handleCloseConfirmationDialog}
            color="primary"
            variant="contained"
            style={{ borderRadius: "20px 20px 20px 20px", width: "100px" }}
          >
            C<span style={{ textTransform: "lowercase" }}></span>
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isUpdateDialogOpen} onClose={handleCloseUpdateDialog}>
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          Edit Candidate
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to update this employee?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginBottom: "10px",
          }}
        >
          <Button
            onClick={handleCloseUpdateDialog}
            color="primary"
            variant="contained"
            style={{ borderRadius: "20px 20px 20px 20px", width: "100px" }}
          >
            C<span style={{ textTransform: "lowercase" }}>ancel</span>
          </Button>
          <Button
            onClick={handleUpdate}
            color="primary"
            variant="contained"
            style={{
              color: "red",
              borderRadius: "20px 20px 20px 20px",
              backgroundColor: "white",
              width: "100px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            U<span style={{ textTransform: "lowercase" }}>pdate</span>
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isStatusChangeDialogOpen}
        onClose={handleCloseStatusChangeDialog}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          Status Change
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to change the status of{" "}
            {selectedCandidate && selectedCandidate.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginBottom: "10px",
          }}
        >
          <Button onClick={handleCloseStatusChangeDialog} color="primary">
            C<span style={{ textTransform: "lowercase" }}>ancel</span>
          </Button>
          <Button
            onClick={handleStatusChange}
            variant="contained"
            style={{
              color: "red",
              borderRadius: "20px 20px 20px 20px",
              backgroundColor: "white",
              width: "100px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            C<span style={{ textTransform: "lowercase" }}>onfirm</span>
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeTable;
