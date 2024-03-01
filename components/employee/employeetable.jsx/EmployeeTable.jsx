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
import ShareIcon from "@mui/icons-material/Share";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import StatusChangeIcon from "@mui/icons-material/TrackChanges";
import {
  useDeleteCandidateQuery,
  useInviteCandidateMutation,
} from "@/services/api";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { CloseOutlined, Edit, MoreVert } from "@mui/icons-material";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import { useMediaQuery } from "@mui/material";
import EmployeeDetailsDialog from "./EmployeeDetailsDialog";

const EmployeeTable = ({ candidateData, statusFilter }) => {
  const router = useRouter();
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
  const [filteredData, setFilteredData] = useState(candidateData);
  console.log("candidateData", candidateData);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedTab, setSelectedTab] = useState(0);
  const [inviteCandidate] = useInviteCandidateMutation();
  const deleteCandidate = useDeleteCandidateQuery();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [isRowDialogOpen, setIsRowDialogOpen] = useState(false);
  const [selectedRowCandidate, setSelectedRowCandidate] = useState(null);

  const handleClickMenu = (event, candidate_id) => {
    setAnchorEl(event.currentTarget);
    setSelectedCandidateId(candidate_id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action) => {
    handleCloseMenu();

    switch (action) {
      case "edit":
        setIsUpdateDialogOpen(true);

        break;
      case "inactive":
        setIsStatusChangeDialogOpen(true);
        break;
      case "invitation":
        openInviteDialog(selectedCandidate);
        break;
      default:
        break;
    }
  };

  const handleSearchTextChange = (event) => {
    const text = event.target.value.toLowerCase();
    setSearchText(text);
    filterData(text, selectedTab);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    filterData(searchText, newValue);
  };

  const filterData = (searchText) => {
    const filtered = companies.filter((candidates) =>
      candidates.name.toLowerCase().includes(searchText)
    );
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
          <Select label="Department" autoWidth={false}>
            <MenuItem>All Departments</MenuItem>
          </Select>
        </FormControl>
        <br />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell >ID</TableCell>
             
              <TableCell >Employee Name</TableCell>
              <TableCell  >Department</TableCell>
              
              <TableCell >Staff ID</TableCell>
              <TableCell >Status</TableCell>
              <TableCell>Phone</TableCell>

              <TableCell >Action</TableCell>
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
                    sx={{ borderBottom: "0.7px dotted #ccc", backgroundColor: candidate.id === selectedRow ? "#f2f2f2" : "" }}
                    onClick={(event) => handleRowClick(candidate, event)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell>{candidate.id}</TableCell>
                 
                    <TableCell sx={{width:'40px'}}>
                      <div style={{display:'flex', flexDirection:'row'}}>
                      <label htmlFor="photo">
                        <Avatar
                          src={candidate.profile_image || "/default-avatar.png"}
                          sx={{
                            width: 50,
                            height: 50,
                            cursor: "pointer",
                            marginRight:'10px'
                          }}
                          alt="Profile Avatar"
                        />
                      </label>
                      <div style={{display:'flex', flexDirection:'column', marginTop:'5px'}}>
                      <span> {candidate.name}</span>
                      <span style={{color:'gray'}}>{candidate.email}</span>
                      </div>
                      </div></TableCell>
                    <TableCell>{candidate.designation}</TableCell>
                    <TableCell>{candidate.code}</TableCell>
                    <TableCell>
                  <span
                    style={{
             
                      backgroundColor:
                      candidate.status === "inactive"
                        ? "#FF505033"
                        : "#00800033",
                    color:
                      candidate.status === "inactive" ? "red" : "green",
                      padding: "7px",
                      borderRadius: "4px",
                    }}
                  >
                    {candidate.status}
                  </span>

                </TableCell>

                    <TableCell>{candidate.phone}</TableCell>
              
                    <TableCell>
                      <IconButton
                        aria-label="update"
                        onClick={() => setIsUpdateDialogOpen(true)}
                      >
                        <Edit />
                      </IconButton>

                      <IconButton
                        aria-label="menu"
                        onClick={(event) =>
                          handleClickMenu(event, candidate.id)
                        }
                      >
                        <MoreVert />
                      </IconButton>
                      <Menu
                        id="candidate-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                        PaperProps={{
                          style: {
                            height: "104px",
                            width: "90px",
                            elevation: 0,
                            padding: "0px",
                            marginLeft: "-89px",
                            marginTop: "-80px",
                            boxShadow: "none",
                            border: "0.3px solid #eee",
                          },
                        }}
                      >
                        <MenuItem
                          onClick={() => handleMenuItemClick("edit")}
                          dense
                          style={{ width: "25px" }}
                        >
                          <Button style={{ justifyContent: "center" }}>
                            <Edit
                              style={{ fontSize: "19px", marginRight: "7px" }}
                            />
                            <span
                              style={{
                                fontSize: "18px",
                                color: "black",
                                textTransform: "lowercase",
                                fontWeight: "300",
                              }}
                            >
                              Edit
                            </span>
                          </Button>
                        </MenuItem>

                        {selectedCandidate &&
                        selectedCandidate.status === "active" ? (
                          <>
                            <MenuItem
                              onClick={() => handleMenuItemClick("inactive")}
                              dense
                            >
                              <DoNotDisturbAltIcon />
                              <span
                                style={{ color: "black", marginLeft: "6px" }}
                              >
                                Inactive
                              </span>
                            </MenuItem>
                            <MenuItem
                              onClick={() => handleMenuItemClick("invitation")}
                              dense
                            >
                              <ShareIcon />
                              <span style={{ marginLeft: "6px" }}>
                                Invitation
                              </span>
                            </MenuItem>
                          </>
                        ) : (
                          selectedCandidate && (
                            <>
                              <MenuItem
                                onClick={() => handleMenuItemClick("active")}
                                dense
                              >
                                <StatusChangeIcon />
                                <span style={{ marginLeft: "6px" }}>
                                  Activate
                                </span>
                              </MenuItem>
                              <MenuItem
                                onClick={() => handleMenuItemClick("delete")}
                                dense
                              >
                                <DeleteOutlineIcon />
                                <span style={{ marginLeft: "6px" }}>
                                  Delete
                                </span>
                              </MenuItem>
                              <MenuItem
                                onClick={() =>
                                  handleMenuItemClick("invitation")
                                }
                                dense
                              >
                                <InsertInvitationIcon />
                                <span style={{ marginLeft: "6px" }}>
                                  Invitation
                                </span>
                              </MenuItem>
                            </>
                          )
                        )}
                      </Menu>
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
        <DialogTitle>Invite Candidate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to invite {selectedCandidate && selectedCandidate.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleInvite} variant="contained" color="primary">
            Invite
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isConfirmationDialogOpen}
        onClose={handleCloseConfirmationDialog}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this employee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmationDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isUpdateDialogOpen} onClose={handleCloseUpdateDialog}>
        <DialogTitle>Edit Candidate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to update this employee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isStatusChangeDialogOpen}
        onClose={handleCloseStatusChangeDialog}
      >
        <DialogTitle>Status Change</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to change the status of{" "}
            {selectedCandidate && selectedCandidate.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStatusChangeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleStatusChange} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeTable;
