"use client";
import React, { useState, useEffect } from "react";
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
  Grid,
} from "@mui/material";
import {
  useDeleteCandidateQuery,
  useGetDepartmentQuery,
  useInviteCandidateMutation,
} from "@/services/api";
import { useParams } from "next/navigation";
import {
  Delete,
  DoNotDisturbAlt,
  Edit,
  History,
  InsertInvitationRounded,
  Mail,
  Share,
  Upcoming,
  Update,
} from "@mui/icons-material";
import EmployeeDetailsDialog from "./EmployeeDetailsDialog";

const EmployeeTable = ({ candidates, refetch }) => {
  const { companyId } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isStatusChangeDialogOpen, setIsStatusChangeDialogOpen] =
    useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

  const [filteredData, setFilteredData] = useState(candidates);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const departmentList = useGetDepartmentQuery(companyId);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedTab, setSelectedTab] = useState(0);
  const [inviteCandidate] = useInviteCandidateMutation();
  const deleteCandidate = useDeleteCandidateQuery();
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [isRowDialogOpen, setIsRowDialogOpen] = useState(false);
  const [selectedRowCandidate, setSelectedRowCandidate] = useState(null);

  const openInviteDialog = (candidate) => {
    setSelectedCandidate(candidate);
    setOpenDialog(true);
  };
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    filterData(searchText, newValue);
  };

// original filtration code w/o using useEffect (doesnot work )

  // const handleDepartmentChange = (event) => {
  //   const department = event.target.value;
  //   setSelectedDepartment(department);
  //   filterData(searchText, department);
  // };
  // const handleSearchTextChange = (event) => {
  //   const text = event.target.value.toLowerCase();
  //   setSearchText(text);
  //   filterData(text, selectedTab);
  //   console.log(text);
  // };

  // const filterData = (searchText, department) => {
  //   refetch();

  //   if (
  //     !departmentList ||
  //     !departmentList.data ||
  //     !departmentList.data.candidates
  //   )
  //     return;
  //   let filtered = candidates;
  //   if (searchText) {
  //     filtered = filtered.filter((candidate) =>
  //       candidate.name.toLowerCase().includes(searchText)
  //     );
  //   }
  //   if (department) {
  //     filtered = filtered.filter((candidate) =>
  //       candidate.departments.some((dept) => dept.name === department)
  //     );
  //   }
  //   setFilteredData(filtered);
  //   console.log(filtered)
  // };
  
  useEffect(() => {
    setFilteredData(candidates);
  }, [candidates]);
  useEffect(() => {
 
    // Apply filtering whenever searchText or selectedDepartment changes
    filterData(searchText, selectedDepartment);
  }, [searchText, selectedDepartment,candidates]);

  const handleDepartmentChange = (event) => {
    const department = event.target.value;
    setSelectedDepartment(department);
  };

  const handleSearchTextChange = (event) => {
    const text = event.target.value.toLowerCase();
    setSearchText(text);

  };

  const filterData = (searchText, department) => {


    let filtered = candidates;

    if (searchText) {
      filtered = filtered.filter((candidate) =>
        candidate.name.toLowerCase().includes(searchText)
      );
    }
    if (department) {
      filtered = filtered.filter((candidate) =>
        candidate.departments.some((dept) => dept.id === department)
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
  const handleDeleteClick = (candidate_id) => {
    setSelectedCandidateId(candidate_id);

    setIsConfirmationDialogOpen(true);
  };

  const handleStatusClick = (candidate_id) => {
    setSelectedCandidateId(candidate_id);
    setIsStatusChangeDialogOpen(true);
  };

  const handleEditClick = (candidate_id) => {
    setSelectedCandidateId(candidate_id);
    setIsUpdateDialogOpen(true);
  };

  const handleInviteClick = (candidate_id) => {
    const selectedCandidate = filteredData.find(
      (candidate) => candidate.id === candidate_id
    );
    setSelectedCandidate(selectedCandidate);
    setIsInviteDialogOpen(true);
  };

  const handleConfirmInvite = async () => {
    try {
      const status = "Approved";
      await inviteCandidate({
        candidate_id: selectedCandidate.candidate_id,
        status,
        companyId: companyId,
      });
      console.log("Invite sent successfully");
      setIsInviteDialogOpen(false); // Close the invite dialog
      refetch();
    } catch (error) {
      console.error("Error sending invitation:", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      console.log("Deleting candidate with id:", selectedCandidateId);
      await deleteCandidate({
        candidate_id: selectedCandidateId,
        company_id: companyId,
      });
      console.log("Candidate deleted successfully");
      setIsConfirmationDialogOpen(false);
      refetch();
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  const handleConfirmStatusChange = async () => {
    // Logic for confirming status change
  };

  const handleConfirmEdit = async () => {
    // Logic for confirming edit
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: 1000,
        mt: 3,

        ml: { xs: 0.1, sm: 0.4, md: 2, lg: 2, xl: 2 },
        mr: { xs: 5, sm: 5, md: 2, lg: 2, xl: 2 },
      }}
    >
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
            value={selectedDepartment}
            onChange={handleDepartmentChange}
          >
            <MenuItem value="">All Departments</MenuItem>
            {departmentList &&
              departmentList.data &&
              departmentList.data.data.departments.map((dept) => (
                <MenuItem key={dept.id} value={dept.id}>
                  {dept.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <br />
      </Box>
      <Box
        sx={{
          maxWidth: "99%",
          overflowX: "auto",
          boxShadow: "0px 0px 0px 1px rgba(0, 0, 0, 0.1)",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "0px 0px 0px 1px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>

                <TableCell style={{ width: "20%" }}>Employee Name</TableCell>

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
                        marginBottom: "0px",
                        maxHeight: "200px",
                        overflowY: "auto",
                      }}
                      onClick={(event) => handleRowClick(candidate, event)}
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell>{candidate.id}</TableCell>

                      <TableCell
                        style={{
                          whiteSpace: "normal",
                          whiteSpace:
                            candidate.email.length > 6 ? "normal" : "nowrap",
                        }}
                      >
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
                            <span>{candidate.email}</span>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        {/* <div> */}
                        {candidate.departments.map((dept) => (
                          <span key={dept.id}>{dept.name}</span>
                        ))}
                        {/* </div> */}
                      </TableCell>
                      <TableCell>{candidate.code}</TableCell>
                      <TableCell>
                        <span
                          style={{
                            backgroundColor:
                              candidate.status === "Not-Verified" ||
                              candidate.status === "absent" ||
                              candidate.status === "Late"
                                ? "#FF505033"
                                : candidate.status === "Leave"
                                ? "#FFA50033"
                                : "#00800033",
                            color:
                              candidate.status === "Not-Verified" ||
                              candidate.status === "absent" ||
                              candidate.status === "Late"
                                ? "red"
                                : candidate.status === "Leave"
                                ? "orange"
                                : "green",
                            width: candidate.status === "Leave" ? "100px" : "",
                            padding: "7px",
                            borderRadius: "4px",
                          }}
                        >
                          {candidate.status}
                        </span>
                      </TableCell>

                      <TableCell>{candidate.phone}</TableCell>

                      <TableCell>
                        {candidate.status === "Not-Verified" ? (
                          <>
                            <IconButton
                              onClick={() => handleInviteClick(candidate.id)}
                            >
                              <Share />
                            </IconButton>
                            <IconButton
                              onClick={() => handleEditClick(candidate.id)}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              onClick={() => handleStatusClick(candidate.id)}
                            >
                              <DoNotDisturbAlt />
                            </IconButton>
                          </>
                        ) : (
                          <>
                            <IconButton
                              onClick={() => {
                                handleEditClick(candidate.id);
                              }}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              onClick={() => handleStatusClick(candidate.id)}
                            >
                              <DoNotDisturbAlt />
                            </IconButton>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            position: "sticky",
            bottom: 0,
            backgroundColor: "#fff",
            zIndex: 1,

            boxShadow: "0px 0px 0px 1px rgba(0, 0, 0, 0.1)",
          }}
        />
      </Box>

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
          <Button
            onClick={handleInviteClick}
            variant="contained"
            color="primary"
          >
            Invite
          </Button>
        </DialogActions>
      </Dialog>
      {/* delete dialog  */}
      <Dialog
        open={isConfirmationDialogOpen}
        onClose={() => setIsConfirmationDialogOpen(false)}
      >
        <DialogTitle>Delete Employee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this employee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsConfirmationDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {/* edit dialog  */}

      <Dialog
        open={isUpdateDialogOpen}
        onClose={() => setIsUpdateDialogOpen(false)}
      >
        <DialogTitle>Edit Candidate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to edit this employee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsUpdateDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmEdit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {/* status change dialog  */}

      <Dialog
        open={isStatusChangeDialogOpen}
        onClose={() => setIsStatusChangeDialogOpen(false)}
      >
        <DialogTitle>Status Change</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to change the status of{" "}
            {selectedCandidate && selectedCandidate.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsStatusChangeDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirmStatusChange} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
  

      <Dialog
        open={isInviteDialogOpen}
        onClose={() => setIsInviteDialogOpen(false)}
      >
        <DialogTitle>Invite Candidate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to invite {selectedCandidate && selectedCandidate.name}?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setIsInviteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmInvite} color="primary">
            Invite
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeTable;
