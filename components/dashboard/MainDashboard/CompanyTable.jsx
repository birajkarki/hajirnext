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
  useMediaQuery,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import ShareIcon from "@mui/icons-material/Share";

import { CloseOutlined, Delete, Edit, Update } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  useDeleteCompanyMutation,
  useUpdateCompanyStatusMutation,
  useGenerateQrCodeQuery,
} from "@/services/api";
import Image from "next/image";

const CompanyTable = ({ companies, refetch }) => {
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
  const [updateCompanyStatus] = useUpdateCompanyStatusMutation();
  const [deleteCompanyMutation] = useDeleteCompanyMutation();
  const [openQrCodeModal, setOpenQrCodeModal] = useState(false);
  const [qrCodeContent, setQrCodeContent] = useState("");
  const [companyIdForQrCode, setCompanyIdForQrCode] = useState(null);
  const generateQrCode = useGenerateQrCodeQuery();
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleSearchTextChange = (event) => {
    const text = event.target.value.toLowerCase();
    setSearchText(text);
    filterData(text);
  };

  const filterData = (searchText) => {
    refetch();
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
      refetch();
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
      refetch();
    } catch (error) {
      console.error("Error updating company status:", error);
    }
  };

  const handleQrCodeClick = (content) => {
    setQrCodeContent(content);
    setOpenQrCodeModal(true);
  };

  const generateQrCodeClick = (companyId) => {
    setCompanyIdForQrCode(companyId);
    setOpenQrCodeModal(true);
  };

  const generateNewQrCode = async () => {
    console.log("Generating new QR code for company:", companyIdForQrCode);

    try {
      const response = await generateQrCode(companyIdForQrCode);
      if (response.data) {
      } else {
        console.error("Error: Invalid QR code response");
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };
  const [activeCompanyId, setActiveCompanyId] = useState(null);

  const handleRowClick = (companyId) => {
    setActiveCompanyId(companyId);
    const company = companies.find((company) => company.id === companyId);
    setSelectedCompany(company);
  };

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
          label="Search by Company Name"
          variant="outlined"
          size="small"
          onChange={handleSearchTextChange}
          value={searchText}
        />
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
                <TableCell>Company Name</TableCell>
                <TableCell>Employee</TableCell>
                <TableCell>Approver</TableCell>
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
                  .map((company, index) => (
                    <TableRow
                      key={company.id}
                      sx={{
                        borderBottom: "0.7px dotted #ccc",
                        backgroundColor:
                          activeCompanyId === company.id ? "#f1f1f1" : "",
                      }}
                      onClick={() => handleRowClick(company.id)} // Handle row clicks
                    >
                      <TableCell>{company.id}</TableCell>
                      <TableCell>
                        <Link
                          href={`/dashboard/company/${company.id}`}
                          passHref
                          style={{
                            textDecoration: "none",
                            fontWeight: "400",
                            color: "#434345",
                            fontSize: "14px",
                          }}
                        >
                          <span sx={{ color: "#434345", fontWeight: "440" }}>
                            {company.name}
                          </span>
                        </Link>
                      </TableCell>
                      <TableCell>{company.employee_count}</TableCell>
                      <TableCell>{company.approver_count}</TableCell>

                      <TableCell>
                        <span
                          style={{
                            backgroundColor:
                              company.status === "Active"
                                ? "#00800033"
                                : "#FF505033",
                            color:
                              company.status === "Active" ? "green" : "red",
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
                          {company.status}
                        </span>
                      </TableCell>

                      <TableCell>
                        <Image
                          src={company.qr_path}
                          height={50}
                          width={50}
                          alt="QR Code"
                        />
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
                              onClick={() =>
                                handleUpdateStatusClick(company.id)
                              }
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
                              onClick={() =>
                                handleUpdateStatusClick(company.id)
                              }
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
      </Box>
      {/* delete dialog  */}
      <Dialog
        open={isDeleteConfirmationDialogOpen}
        onClose={handleCloseConfirmationDialog}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          Delete Company
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this company?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "space-evenly",
            marginTop: "-10px",
            marginBottom: "20px",
          }}
        >
          <Button
            onClick={handleCloseConfirmationDialog}
            variant="contained"
            style={{ borderRadius: "20px 20px 20px 20px", width: "100px" }}
          >
            C<span style={{ textTransform: "lowercase" }}>ancel</span>
          </Button>
          <Button
            onClick={handleConfirmDelete}
            style={{
              width: "100px",
              color: "red",
              borderRadius: "20px 20px 20px 20px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            D
            <span style={{ color: "red", textTransform: "lowercase" }}>
              elete
            </span>
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
            C <span style={{ textTransform: "lowercase" }}>ancel</span>
          </Button>
          <Button
            onClick={handleUpdate}
            variant="contained"
            style={{
              color: "black",
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
        open={isStatusUpdateConfirmationDialogOpen}
        onClose={handleCloseConfirmationDialog}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          {selectedCompany && selectedCompany.status === "Active"
            ? "Inactive"
            : "Active"}
          Company
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to
            {selectedCompany && selectedCompany.status === "Active"
              ? "Inactive"
              : "Active"}
            <span> company?</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "space-evenly",
            marginTop: "-10px",
            marginBottom: "20px",
          }}
        >
          <Button
            onClick={handleCloseConfirmationDialog}
            color="primary"
            variant="contained"
            sx={{
              borderRadius: "20px 20px 20px 20px",
              width: "100px",
            }}
          >
            C<span style={{ textTransform: "lowercase" }}>ancel</span>
          </Button>
          <Button
            onClick={handleConfirmStatusUpdate}
            style={{
              borderRadius: "20px 20px 20px 20px",
              color: "red",
              backgroundColor: "white",
              width: "100px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            {selectedCompany && selectedCompany.status === "Active" ? (
              <span>
                I<span style={{ textTransform: "lowercase" }}>nactive</span>
              </span>
            ) : (
              <span>
                A<span style={{ textTransform: "lowercase" }}>ctive</span>
              </span>
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openQrCodeModal} onClose={() => setOpenQrCodeModal(false)}>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "3px",
          }}
        >
          {/* Generate New QR button */}
          <div
            onClick={generateNewQrCode}
            sx={{ color: "black", marginBottom: "20px", width: "50%" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ReplayIcon style={{ cursor: "pointer" }} />
              <div style={{ marginLeft: "10px", marginRight: "160px" }}>
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontStyle: "normal",
                    fontWeight: 300,
                    textTransform: "lowercase",
                    width: "280px",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ textTransform: "capitalize" }}>G</span>enerate{" "}
                  <span style={{ textTransform: "capitalize" }}>N</span>ew{" "}
                  <span style={{ textTransform: "capitalize" }}>QR</span>
                </Typography>
              </div>
            </div>
          </div>
          <IconButton
            onClick={() => setOpenQrCodeModal(false)}
            sx={{
              position: "absolute",
              right: 4,
              top: "9%",
              transform: "translateY(-50%)",
              fontSize: "24px",
              color: "black",
            }}
          >
            <CloseOutlined style={{ fontSize: "24px" }} />
          </IconButton>{" "}
          <Image
            src={qrCodeContent}
            height={250}
            width={250}
            style={{
              marginBottom: "20px",
              marginTop: "20px",
            }}
            alt="QR Code"
          />
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, fontSize: "22px" }}
          >
            {selectedCompany && selectedCompany.name}
          </Typography>
          <Button
            onClick={() => downloadQrCodeAsPdf()}
            sx={{ overflow: "hidden", marginLeft: "-70px", marginTop: "10pX " }}
          >
            <Typography
              variant="body2"
              sx={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                backgroundColor: "#D9D9D940",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShareIcon />
            </Typography>
            <h1
              style={{
                fontSize: "18px",
                fontWeight: "450",
                color: "gray",
                marginLeft: "40px",
              }}
            >
              S<span style={{ textTransform: "lowercase" }}>hare</span> PDF
            </h1>
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CompanyTable;
