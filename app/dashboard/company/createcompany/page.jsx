"use client";
import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Typography,
  Button,
  TextField,
  Radio,
  Grid,
  FormControlLabel,
  RadioGroup,
  LinearProgress,
  useMediaQuery,
} from "@mui/material";
import SyncIcon from '@mui/icons-material/Sync';

import AddIcon from '@mui/icons-material/Add';

import { useRouter } from "next/navigation";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import CustomRadioGroup from "@/components/company/createcompany/RadioButton";
import { useCreateCompanyMutation } from "@/services/api";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CreateCompany = () => {
  const router = useRouter();
  const createCompanyMutation = useCreateCompanyMutation();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const isScreenSmall = useMediaQuery("(max-width:1486px)");
  const isScreenSM = useMediaQuery("(max-width:1134px)");
 

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Full name is required")
      .matches(/^[A-Za-z][A-Za-z0-9 ]*$/, "Alphanumeric value only")
      .test(
        "first-letter-alphabet",
        "First letter should be alphabetical for name",
        (value) => {
          return /^[A-Za-z]/.test(value);
        }
      ),
    code: yup.string().required("Please select a staff code"),
    date_type: yup.string().required("Please select a date"),
    holiday_type: yup.string().required("Please select holiday type").oneOf(['Government', 'Custom'], 'Please select either Default Government Holidays or Custom Holidays'),
  });
  

  const formik = useFormik({
    initialValues: {
      name: "",
      code: "",
      date_type: "",
      holiday_type: "",
      // custom_holiday_file: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true);

        console.log("Data being sent:", values);
        // Prepare form data
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("code", values.code);
        formData.append("date_type", values.date_type);
        formData.append("holiday_type", values.holiday_type);
        formData.append("custom_holiday_file", file);

        const [mutateAsync] = createCompanyMutation;

        const { data } = await mutateAsync(formData, {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
          },
        });

        await mutateAsync(values);

        console.log("Company added successfully:", data);

        alert("Company added successfully!");
        resetForm();

        router.push("/dashboard/company");
      } catch (error) {
        console.error("Error adding company:", error);

        alert("Error adding company. Please try again.");
      }
    },
  });

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    console.log(uploadedFile);
  };
  const handleDownload = (fileName) => {
    const filePath = `/${fileName}`;

    const link = document.createElement("a");
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100vh",
        padding: "10px",
        backgroundColor: "#fff",
        marginTop:'70px'
      }}
    >
      <Typography
        sx={{
          color: "#434345",
          fontSize: "24px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "24px",
          letterSpacing: "0.25px",
        }}
      >
        Create New Company
      </Typography>

      {/* breadcrumb area  */}
      <div style={{ display: "flex", gap: "20px", marginLeft:"4px" }}>
        <Link href="/dashboard" style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              marginTop: "10px",
              color: "#434345",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "21px",
              letterSpacing: "0.15px",
            }}
          >
            Dashboard <span style={{marginLeft:"10px"}}>/</span> 
          </Typography>
        </Link>
        <Link href="/dashboard/company" style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              marginTop: "10px",
              color: "#434345",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "21px",
              letterSpacing: "0.15px",
              textDecoration:'none'
            }}
          >
            Company  <span style={{marginLeft:"10px"}}></span> /
          </Typography>
        </Link>
        <Link href="/dashboard/company/createcompany" style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              marginTop: "10px",
              color: "#434345CC",
         
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "21px",
              letterSpacing: "0.15px",
            }}
          >
            New Company
          </Typography>
        </Link>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        style={{ marginTop: "20px"}}
      >
        <Grid container>
          {/* Left Column */}
          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                mt: 2,
              }}
            >
              {/* Name of the Company */}
              <Typography variant="body1">
                Name of your Company <span style={{ color: "red" }}> *</span>
              </Typography>
              <TextField
                label="Enter Company Name"
                variant="outlined"
                sx={{
                  width: isScreenSM
                    ? "220px"
                    : isScreenSmall
                    ? "380px"
                    : "552px",
                }}
                margin="normal"
                {...formik.getFieldProps("name")}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />

              {/* New Staff Code Selection  */}

              <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                Staff Code{" "} <span style={{color:'red'}}>*</span>
              </Typography>
              <CustomRadioGroup 
                name="code"
                value={formik.values.code}
                // onChange={(value) => formik.setFieldValue("code", value)}
                options={[
                  {
                    value: "1",
                    label: "Auto",
                    description: "E.g.: R001, R002, ROO3 ",
                  },
                  {
                    value: "2",
                    label: "Custom",
                    description: "E.g.: 021, 022 or 0100, 0101 ",
                  },
                ]}
                setFieldValue={formik.setFieldValue}
              />
              {formik.touched.code && Boolean(formik.errors.code) && (
                <span style={{color: "#cc0000", marginTop:'-10px', fontSize:'13px', marginLeft:'9px'  }}>
                  {formik.errors.code}
                </span>
              )}

              {/* New Date Selection  */}

              <Typography variant="body1" sx={{ marginBottom: "8px" }} >
                Date Selection <span style={{color:'red'}}>*</span>
              </Typography>
              <CustomRadioGroup
                name="date_type"
                value={formik.values.date_type}
                options={[
                  {
                    value: "English",
                    label: "English",
                    description: "E.g.: R001, R002, ROO3",
                  },
                  {
                    value: "Nepali",
                    label: "Nepali",
                    description: "E.g.: R001, R002, ROO3",
                  },
                ]}
                setFieldValue={formik.setFieldValue}
              />
              {formik.touched.date_type && Boolean(formik.errors.date_type) && (
               
                       <span style={{color: "#cc0000", marginTop:'-10px', fontSize:'13px',marginLeft:'9px'  }}>
                  {formik.errors.date_type}
            
                </span>
              )}
            </Box>
          </Grid>

          {/* Right Column */}
          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                mt: -2.5,
              }}
            >
              <Typography variant="body1" sx={{marginTop:'38px' }}>
                Holidays <span style={{color:'red'}}>*</span>
              </Typography>
              <Box sx={{ marginBottom: "16px" }}>
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "16px",
                    width: isScreenSM
                      ? "250px"
                      : isScreenSmall
                      ? "300px"
                      : "600px",
                    display: "flex",
                    transition: "background 0.3s, border 0.3s",
                    "&:hover": { background: "#f5f5f5" },
                    marginTop: "14px",
                    height:"57px",
                    display:"flex",
                  
                    alignItems:'center',
                  }}
                >
                  <RadioGroup
                    row
                    name="holiday_type"
                    value={formik.values.holiday_type}
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel
                      value="Government"
                      control={<Radio />}
                      label="Governmental Holidays"
                    />
                  </RadioGroup>
                </Box>
              </Box>
              <span onClick={() => handleDownload("example1.pdf")} style={{
marginLeft: isScreenSmall?"40px":"150px"

              }}>
                <Typography
                  variant="body2"
                  sx={{
                    marginTop: "-9px",
                    display: "flex",
                    textAlign:"center",
                    justifyContent:"center",
                    alignItems: "center",
                    color:"#434345CC",
                    cursor:"pointer",
                    textDecoration:"underline",
                    fontSize:"14px",
                    fontWeight:"500",
                    letterSpacing: "0.15px"
                  }}
                >
                  View Holidays (.pdf)
                </Typography>
              </span>
              <Box>
                {/* Custom Holidays Box */}
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "16px",

                    width: isScreenSM
                      ? "250px"
                      : isScreenSmall
                      ? "300px"
                      : "600px",

                    display: "flex",
                    transition: "background 0.3s, border 0.3s",
                    "&:hover": { background: "#f5f5f5" },
                    marginTop: "12px",
                    // marginTop: "14px",
                    height:"57px",
                    alignItems:"center"

                  }}
                >
                  <RadioGroup
                    row
                    name="holiday_type"
                    value={formik.values.holiday_type}
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel
                      value="Custom"
                      control={<Radio />}
                      label="Custom Holidays"
                    />
                  </RadioGroup>
                </Box>
                {formik.touched.holiday_type && formik.errors.holiday_type && (
    <span style={{ color: "#cc0000", marginTop: "4px", fontSize:'13px' ,marginLeft:'9px'}}>
      {formik.errors.holiday_type}
    </span>
  )}

              </Box>
              <span onClick={() => handleDownload("SpecialHoliday.xls")} sx={{width:"253px", fontSize:"14px", fontWeight:"500"}}>
                <Typography
                  variant="body2"
                  sx={{
                    marginTop: "8px",
                    display: "flex",
                    alignItems: "center",
                    textDecoration:"underline",
                    marginLeft: isScreenSmall?"3px":"120px",
                    fontWeight:"500",
                    letterSpacing:"0.15px",
                    color:"#434345CC",
                    cursor:"pointer"
                  }}
                >
                  Click to download sample file (.xlsx)
                </Typography>
              </span>{" "}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  marginTop: "16px",
                }}
              >
                <Button variant="contained" component="label" sx={{backgroundColor:"white", color:"#22408B",
                 "&:hover": {
                  backgroundColor: "white", // Prevent background color change on hover
                },
              }}>
               <AddIcon/>Import Holidays
                  <input type="file" onChange={handleFileChange} hidden />
                </Button>
                {isLoading && <LinearProgress value={uploadProgress} />}


                {file && (
                  <Typography variant="body2" sx={{ marginTop: "8px" }}>
                    Uploaded File: {file.name}
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            color="primary"
            sx={{
              width: "250px",
              height: "50px",
              justifyContent:"center",
              fontSize:"16px",
             gap:"20px",
            }}
          >
            <SyncIcon />
            <span>Update</span>
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateCompany;
