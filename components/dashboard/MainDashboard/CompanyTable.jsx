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
  DialogContentText,
  DialogActions,
  Button,
  TablePagination,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Typography,
  Menu,
  Tooltip,
} from "@mui/material";
import {
  BlockSharp,
  Check,
  CheckCircleOutline,
  Delete,
  DeleteOutline,
  DoNotDisturbAlt,
  Edit,
  EditAttributes,
  MoreVert,
  Update,
  UpdateSharp,
} from "@mui/icons-material";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useImage from "../../../hooks/useImage";
import {
  useDeleteCompanyMutation,
  useGetActiveCompanyQuery,
  useGetInactiveCompanyQuery,
  useUpdateCompanyStatusMutation,
  useGenerateQrCodeQuery,
} from "@/services/api";
import Image from "next/image";
import { textTransform } from "@mui/system";

const CompanyTable = ({ companies, statusFilter }) => {
  const router = useRouter();

  const [filteredData, setFilteredData] = useState(companies);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [isDeleteConfirmationDialogOpen, setDeleteConfirmationDialogOpen] =
    useState(false);
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [
    isStatusUpdateConfirmationDialogOpen,
    setStatusUpdateConfirmationDialogOpen,
  ] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const activeCompaniesData = useGetActiveCompanyQuery();
  const activeCompanies = activeCompaniesData.data?.companies || [];
  const [updateCompanyStatus] = useUpdateCompanyStatusMutation();
  const [deleteCompanyMutation] = useDeleteCompanyMutation();
  const [openQrCodeModal, setOpenQrCodeModal] = useState(false);
  const [qrCodeContent, setQrCodeContent] = useState("");
  const [companyIdForQrCode, setCompanyIdForQrCode] = useState(null);
  const generateQrCode = useGenerateQrCodeQuery(); // This line initializes the hook
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMenuCompanyId, setSelectedMenuCompanyId] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null); // Add state for selected company

  const handleOpenMenu = (event, companyId) => {
    setAnchorEl(event.currentTarget);
    setSelectedMenuCompanyId(companyId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSearchTextChange = (event) => {
    const text = event.target.value.toLowerCase();
    setSearchText(text);
    filterData(text);
  };

  const filterData = (searchText) => {
    const filtered = companies.filter((company) =>
      company.name.toLowerCase().includes(searchText)
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

  const handleDeleteClick = (companyId) => {
    setSelectedCompanyId(companyId);
    setDeleteConfirmationDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      console.log("Company deleted successfully", selectedCompanyId);
      await deleteCompanyMutation(selectedCompanyId);
      setDeleteConfirmationDialogOpen(false);
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  const handleCloseConfirmationDialog = () => {
    setDeleteConfirmationDialogOpen(false);
    setStatusUpdateConfirmationDialogOpen(false);
    setUpdateDialogOpen(false);
  };
  const handleUpdateClick = (companyId) => {
    setSelectedCompanyId(companyId);
    const company = companies.find((company) => company.id === companyId);
    setSelectedCompany(company);

    setUpdateDialogOpen(true);
  };

  const handleUpdate = (companyId) => {
    setUpdateDialogOpen(false);

    router.push(`/dashboard/company/editcompany/${selectedCompanyId}`);
  };

  const handleUpdateStatusClick = (companyId) => {
    setSelectedCompanyId(companyId);
    const company = companies.find((company) => company.id === companyId);
    setSelectedCompany(company);
    setStatusUpdateConfirmationDialogOpen(true);
  };

  const handleConfirmStatusUpdate = async () => {
    try {
      let newStatus = "Inactive";

      if (selectedCompany && selectedCompany.status === "Active") {
        newStatus = "Inactive";
      } else {
        newStatus = "Active";
      }

      await updateCompanyStatus({
        company_id: selectedCompanyId,
        status: newStatus,
      });
      setStatusUpdateConfirmationDialogOpen(false);
    } catch (error) {
      console.error("Error updating company status:", error);
    }
  };

  const handleQrCodeClick = (content) => {
    setQrCodeContent(content);
    setOpenQrCodeModal(true);
  };
  // const generateQrCodeClick = (companyId) => {
  //   setCompanyIdForQrCode(companyId); // Set the companyIdForQrCode
  //   setOpenQrCodeModal(true); // Open the QR code modal
  // };

  const generateNewQrCode = async () => {
    console.log("Generating new QR code for company:", companyIdForQrCode);

    try {
      // Fetch QR code data using useGenerateQrCodeQuery
      const response = await generateQrCode(companyIdForQrCode);

      // Check if the response is successful
      if (response.data) {
        // Handle the response data here, maybe set it to state or display it
      } else {
        console.error("Error: Invalid QR code response");
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: 1000, mt: 3 }}>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Search by Company Name"
          variant="outlined"
          size="small"
          onChange={handleSearchTextChange}
          value={searchText}
        />

        <br />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Employee Count</TableCell>
              <TableCell>Approver Count</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>QR Code</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData &&
              filteredData.length > 0 &&
              filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((company) => (
                  <TableRow
                    key={company.id}
                    // sx={{ borderBottom: "0.7px dotted #ccc" }}
                  >
                    <TableCell>
                      <Link href={`/dashboard/company/${company.id}`} passHref>
                        <Button color="primary">{company.name}</Button>
                      </Link>
                    </TableCell>
                    <TableCell>{company.employee_count}</TableCell>
                    <TableCell>{company.approver_count}</TableCell>
                    <TableCell
                      sx={{
                        backgroundColor:
                          company.status === "Active"
                            ? "#00800033"
                            : "#FF505033",
                        color: company.status === "Active" ? "green" : "red",
                        padding: "7px",
                        borderRadius: "4px",
                        marginTop: "20px",
                        textAlign: "center",
                        justifyContent: "center",
                        marginRight: "10px",
                        height: "34px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {company.status}
                    </TableCell>
                    <TableCell>
                      <Image
                        src={company.qr_path}
                        height={50}
                        width={50}
                        alt="QR Code"
                      />
                      <IconButton
                        onClick={() => handleQrCodeClick(company.qr_path)}
                      >
                        {/* Render your button icon here */}
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      {company.status === "Active" ? (
                        <>
                          <IconButton
                            onClick={() => handleUpdateClick(company.id)}
                          >
                            <Edit />
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
                            <Delete />
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
      {/* delete dialog  */}
      <Dialog
        open={isDeleteConfirmationDialogOpen}
        onClose={handleCloseConfirmationDialog}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this company?
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
      {/* Update Dialog */}
      <Dialog open={isUpdateDialogOpen} onClose={handleCloseConfirmationDialog}>
        <DialogTitle>Edit Company</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to update{" "}
            <span style={{ color: "red" }}>
              {selectedCompany && selectedCompany.name}
            </span>{" "}
            company?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmationDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {/* Status Update Confirmation Dialog */}
      <Dialog
        open={isStatusUpdateConfirmationDialogOpen}
        onClose={handleCloseConfirmationDialog}
      >
        <DialogTitle>    {selectedCompany && selectedCompany.status === "Active"
              ? "Inactive"
              : "Active"} Company</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure  to {" "}
            {/* <span style={{ color: "red" }}>
              {selectedCompany && selectedCompany.name}
            </span>{" "}
            to{" "} */}
            {selectedCompany && selectedCompany.status === "Active"
              ? "Inactive"
              : "Active"}  

         <span>  company?</span> 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmationDialog} color="primary" variant="contained" sx={{borderRadius:'23%'}}>
            Cancel
          </Button>
          <Button onClick={handleConfirmStatusUpdate} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {/* QR Code Modal */}
      <Dialog open={openQrCodeModal} onClose={() => setOpenQrCodeModal(false)}>
        <DialogTitle>QR Code</DialogTitle>
        <DialogContent>
          {/* Display QR code image */}
          <Button onClick={generateNewQrCode}>
            <Typography
              sx={{
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: 500,
              }}
            >
              Generate New QR Code
            </Typography>
          </Button>{" "}
          {useImage({
            src: qrCodeContent,
            height: 250,
            width: 250,
            style: {
              margin: "auto",
            },
            alt: "QR Code",
          })}
          {/* Display company name */}
          <Typography variant="body2">Name:</Typography>
          {/* Share button to download the QR code image as PDF */}
          <Button onClick={() => downloadQrCodeAsPdf()}>
            <Typography variant="body2">Share</Typography>
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenQrCodeModal(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CompanyTable;
