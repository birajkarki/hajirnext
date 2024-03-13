// Step1Component.jsx
"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useMediaQuery } from "@mui/material";
import {
  useGetCandidateCodeQuery,
  useGetDepartmentQuery,
} from "@/services/api";
import { useParams } from "next/navigation";

const Step1Component = ({ formik, validationErrors }) => {
  const { companyId } = useParams();

  const isFormIncomplete =
    Object.keys(validationErrors).length > 0 && formik.submitCount > 0;
  // Log form values when moving to Step 2
  const moveToStep2 = () => {
    console.log("Step 1 Form Values:", formik.values);
  };
  const isScreenSmall = useMediaQuery("(max-width:1390px)");
  const isScreenSM = useMediaQuery("(max-width:922px)");
  const departmentList = useGetDepartmentQuery(companyId);
  const candidateCode = useGetCandidateCodeQuery({
    company_id: companyId,
  });
  // console.log("department list", departmentList);
  // console.log("department list", departmentList);
  console.log("isFormIncomplete:", isFormIncomplete);
  // console.log("candidate code is coming:", candidateCode);

  const disableCodeField = candidateCode?.data?.data ? true : false;

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            mt: 1,
          }}
        >
          {/* Staff Code */}
          <div>
            Staff Code <span style={{ color: "red" }}> *</span>
          </div>
          <TextField
            label="Staff Code"
            variant="outlined"
            sx={{
              width: isScreenSM ? "250px" : isScreenSmall ? "300px" : "500px",
            }}
            margin="normal"
            name="code"
            {...formik.getFieldProps("code")}
            disabled={disableCodeField}
            // If uniqueCandidateCode exists, set the field value to its code
            // Otherwise, let it be an empty string
            value={candidateCode?.data?.data ? candidateCode?.data?.data : ""}

            // error={
            //   ((formik.touched.code || formik.submitCount > 0) &&
            //     Boolean(formik.errors.code) &&
            //     formik.touched.code &&
            //     formik.errors.code) ||
            //   (!formik.touched.code &&
            //     formik.submitCount > 0 &&
            //     formik.errors.code) ||
            //   (validationErrors.code && validationErrors.code)
            // }
            // helperText={
            //   (formik.touched.code && formik.errors.code) ||
            //   (!formik.touched.code &&
            //     formik.submitCount > 0 &&
            //     formik.errors.code) ||
            //   (validationErrors.code && validationErrors.code)
            // }
          />

          {/* Name Holder */}
          <div>
            Candidate details <span style={{ color: "red" }}> *</span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <FormControl
              sx={{
                width: isScreenSmall ? "80px" : "100px",
                marginTop: "15px",
              }}
            >
              <InputLabel htmlFor="demo-simple-select-label"></InputLabel>
              <Select
                value={formik.values.name_holder}
                onChange={formik.handleChange}
                name="name_holder"
                IconComponent={ArrowDropDownIcon} // Use ArrowDropDownIcon as the icon component
                sx={{ "& .MuiSvgIcon-root": { color: "darkblue" } }}
              >
                <MenuItem value="Mr">Mr</MenuItem>
                <MenuItem value="Mrs">Mrs</MenuItem>
              </Select>
            </FormControl>

            {/* Full Name */}
            <TextField
              label="Full Name"
              variant="outlined"
              sx={{
                marginLeft: 3,
                width: isScreenSM ? "150px" : isScreenSmall ? "200px" : "380px",
                marginTop: 0.1,
              }}
              margin="normal"
              name="name"
              {...formik.getFieldProps("name")}
              error={
                ((formik.touched.name || formik.submitCount > 0) &&
                  Boolean(formik.errors.name) &&
                  formik.touched.name &&
                  formik.errors.name) ||
                (!formik.touched.name &&
                  formik.submitCount > 0 &&
                  formik.errors.name) ||
                (validationErrors.name && validationErrors.name)
              }
              helperText={
                (formik.touched.name && formik.errors.name) ||
                (!formik.touched.name &&
                  formik.submitCount > 0 &&
                  formik.errors.name) ||
                (validationErrors.name && validationErrors.name)
              }
            />
          </div>

          {/* Phone Number */}
          <TextField
            label="Phone Number"
            variant="outlined"
            sx={{
              width: isScreenSM ? "255px" : isScreenSmall ? "305px" : "505px",
              marginTop: 0.9,
              marginBottom: 2,
            }}
            margin="normal"
            name="contact"
            {...formik.getFieldProps("contact")}
            error={
              ((formik.touched.contact || formik.submitCount > 0) &&
                Boolean(formik.errors.contact) &&
                formik.touched.contact &&
                formik.errors.contact) ||
              (!formik.touched.contact &&
                formik.submitCount > 0 &&
                formik.errors.contact) ||
              (validationErrors.contact && validationErrors.contact)
            }
            helperText={
              (formik.touched.contact && formik.errors.contact) ||
              (!formik.touched.contact &&
                formik.submitCount > 0 &&
                formik.errors.contact) ||
              (validationErrors.contact && validationErrors.contact)
            }
          />

          {/* Designation */}
          <TextField
            label="Designation"
            variant="outlined"
            sx={{
              width: isScreenSM ? "255px" : isScreenSmall ? "305px" : "505px",
              // marginTop: 0.1,
              marginTop:  ((formik.touched.designation && formik.errors.designation) && !formik.errors.contact) ?"1.6rem": ((formik.touched.designation && formik.errors.designation) || (formik.submitCount > 0 && formik.errors.designation)) ? "0.2rem" : "0.1rem",

              marginBottom: 2,
            }}
            margin="normal"
            name="designation"
            {...formik.getFieldProps("designation")}
            error={
              ((formik.touched.designation || formik.submitCount > 0) &&
                Boolean(formik.errors.designation) &&
                formik.touched.designation &&
                formik.errors.designation) ||
              (!formik.touched.designation &&
                formik.submitCount > 0 &&
                formik.errors.designation) ||
              (validationErrors.designation && validationErrors.designation)
            }
            helperText={
              (formik.touched.designation && formik.errors.designation) ||
              (!formik.touched.designation &&
                formik.submitCount > 0 &&
                formik.errors.designation) ||
              (validationErrors.designation && validationErrors.designation)
            }
          />

          {/* Marriage Status */}
          <FormControl
            sx={{
              width: isScreenSM ? "255px" : isScreenSmall ? "305px" : "505px",
              marginTop: 0.1,
            }}
          >
            <InputLabel
              htmlFor="demo-simple-select-label"
              sx={{ marginBottom: 0 }}
            >
              Marriage Status <span sx={{ color: "red" }}> *</span>
            </InputLabel>
            <Select
              value={formik.values.marriage_status}
              label="Marriage Status"
              onChange={formik.handleChange}
              name="marriage_status"
            >
              <MenuItem value="Married">Married</MenuItem>
              <MenuItem value="Unmarried">Unmarried</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            mt: 20,
          }}
        >
          {/* Confirm Phone Number */}
          {/* <TextField
            label="Confirm Phone Number"
            variant="outlined"
            sx={{
              width: isScreenSM ? "200px" : isScreenSmall ? "350px" : "505px",
          
              // marginTop: ((formik.touched.name && formik.errors.name) || (formik.touched.contact && formik.errors.contact)) ? "5.2rem" : "3.9rem",


              marginLeft: isScreenSM
                ? "30px"
                : isScreenSmall
                ? "-20px"
                : "40px",
              marginBottom: 2,
            }}
            margin="normal"
            name="confirmPhoneNumber"
            {...formik.getFieldProps("confirmPhoneNumber")}
            error={
              (formik.touched.confirmPhoneNumber || formik.submitCount > 0) &&
              Boolean(formik.errors.confirmPhoneNumber)
                &&
                formik.touched.confirmPhoneNumber &&
                formik.errors.confirmPhoneNumber) ||
              (!formik.touched.confirmPhoneNumber &&
                formik.submitCount > 0 &&
                formik.errors.confirmPhoneNumber) ||
              (validationErrors.confirmPhoneNumber &&
                validationErrors.confirmPhoneNumber)
              }
            helperText={
    <span style={{ color: "#cc0000" }}>
      {(formik.touched.confirmPhoneNumber && formik.errors.confirmPhoneNumber) ||
      (!formik.touched.confirmPhoneNumber &&
        formik.submitCount > 0 &&
        formik.errors.confirmPhoneNumber) ||
      (validationErrors.confirmPhoneNumber &&
        validationErrors.confirmPhoneNumber)}
    </span>
  }

/> */}
{/* <TextField
  label="Confirm Phone Number"
  variant="outlined"
  sx={{
    width: isScreenSM ? "200px" : isScreenSmall ? "350px" : "505px",
    marginLeft: isScreenSM ? "30px" : isScreenSmall ? "-20px" : "40px",
    marginBottom: 2,
  }}
  margin="normal"
  name="confirmPhoneNumber"
  {...formik.getFieldProps("confirmPhoneNumber")}
  error={
    (
      (formik.touched.confirmPhoneNumber || formik.submitCount > 0) &&
      (
        Boolean(formik.errors.confirmPhoneNumber) &&
        formik.touched.confirmPhoneNumber &&
        formik.errors.confirmPhoneNumber
      )
    ) ||
    (
      !formik.touched.confirmPhoneNumber &&
      formik.submitCount > 0 &&
      formik.errors.confirmPhoneNumber
    ) ||
    (
      validationErrors.confirmPhoneNumber &&
      validationErrors.confirmPhoneNumber
    )
  }
  helperText={
    <span style={{ color: "#cc0000" }}>
      {
        (formik.touched.confirmPhoneNumber && formik.errors.confirmPhoneNumber) ||
        (
          !formik.touched.confirmPhoneNumber &&
          formik.submitCount > 0 &&
          formik.errors.confirmPhoneNumber
        ) ||
        (
          validationErrors.confirmPhoneNumber &&
          validationErrors.confirmPhoneNumber
        )
      }
    </span>
  }
/> */}
<TextField
  label="Confirm Phone Number"
  variant="outlined"
  sx={{
    width: isScreenSM ? "200px" : isScreenSmall ? "350px" : "505px",
    marginLeft: isScreenSM ? "30px" : isScreenSmall ? "-20px" : "40px",
      //  marginTop: ((formik.touched.name && formik.errors.name) || (formik.touched.contact && formik.errors.contact)) ? "5.2rem" : ((formik.touched.contact && formik.errors.contact) && !formik.touched.name) ? "2rem": "3.9rem",
     
      //  marginTop: ((formik.touched.name && formik.errors.name) || (formik.touched.contact && formik.errors.contact)) ? "5.2rem" : ((formik.touched.contact && formik.errors.contact) && !formik.touched.name) ? "-6rem": "3.9rem",
      //
        marginTop: ((formik.touched.contact && formik.errors.contact) && !formik.errors.name) ? "4rem" : ((formik.touched.name && formik.errors.name) || (formik.touched.contact && formik.errors.contact)) ? "5.2rem" : "3.9rem",

       marginBottom: 2,
  }}
  margin="normal"
  name="confirmPhoneNumber"
  {...formik.getFieldProps("confirmPhoneNumber")}
  error={
    (formik.touched.confirmPhoneNumber && Boolean(formik.errors.confirmPhoneNumber))
  }
  helperText={
    (formik.touched.confirmPhoneNumber && formik.errors.confirmPhoneNumber) || ""
  }
/>



          {/* Departments */}
          <FormControl
            sx={{
              width: isScreenSM ? "200px" : isScreenSmall ? "350px" : "505px",
              // marginTop: (formik.touched.designation && formik.errors.designation) ?"2.7":"0.9",
              // marginTop: ((formik.touched.designation && formik.errors.designation) && (formik.touched.confirmPhoneNumber && formik.errors.confirmPhoneNumber))  ? "0.2rem" : (!formik.touched.designation && !formik.errors.designation) ?"0.4": "0.4rem",
              marginTop: (
                (formik.touched.designation && formik.errors.designation &&  !formik.errors.confirmPhoneNumber) ? "2rem" : // When only Designation has errors and is touched
                (formik.touched.designation && formik.errors.designation && formik.touched.confirmPhoneNumber && formik.errors.confirmPhoneNumber) ? "0.2rem" : // When both Designation and Confirm Phone Number have errors and are touched
                "0.4rem" // Default marginTop
              ),
              marginLeft: isScreenSM
                ? "30px"
                : isScreenSmall
                ? "-20px"
                : "40px",
            }}
          >
            <InputLabel
              htmlFor="demo-simple-select-label"
              sx={{ marginBottom: 0 }}
            >
              Departments <span style={{ color: "red" }}> *</span>
            </InputLabel>
            <Select
              value={formik.values.departments}
              label="Departments"
              onChange={formik.handleChange}
              name="departments"
              IconComponent={ArrowDropDownIcon} // Use ArrowDropDownIcon as the icon component
              sx={{ "& .MuiSvgIcon-root": { color: "darkblue" } }}
            >
              <MenuItem value="">All Departments</MenuItem>
              {/* Add options dynamically based on backend response */}
              {departmentList &&
                departmentList.data &&
                departmentList.data.data.departments.map((dept) => (
                  <MenuItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Step1Component;