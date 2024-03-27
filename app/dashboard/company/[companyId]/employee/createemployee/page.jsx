"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import HeaderEmployeeSteps from "@/components/employee/employeeSteps/HeaderEmployeeSteps";
import Step1Component from "@/components/employee/employeeSteps/Step1Component";
import Step2Component from "@/components/employee/employeeSteps/Step2Component";
import Step3Component from "@/components/employee/employeeSteps/Step3Component";
import Step4Component from "@/components/employee/employeeSteps/Step4Component";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useCreateCandidateMutation,
  useGetCandidateCodeQuery,
} from "@/services/api";
import { useParams, useRouter } from "next/navigation";

const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];
const stepComponents = [
  <Step1Component key="step1" />,
  <Step2Component key="step2" />,
  <Step3Component key="step3" />,
  <Step4Component key="step4" />,
];

const validationSchemaStep1 = Yup.object({
  // code: Yup.string()
  //   .required("Staff Code is required")
  //   .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field"),
  // name_holder: Yup.string().required("Name Holder is required"),
  // contact: Yup.string().required("Mobile Number is required"),
  // designation: Yup.string().required("Designation is required"),
  // marriage_status: Yup.string().required("Marriage Status is required"),
  // name: Yup.string().required("Full Name is required"),
  // confirmPhoneNumber: Yup.string()
  //   .required("Confirm Phone Number is required")
  //   .oneOf([Yup.ref("contact"), null], "Phone Numbers must match"),
  // departments: Yup.string().required("Departments is required"),
});

const validationSchemaStep2 = Yup.object({
  // salary: Yup.string()
  //   .required("Salary Type is required")
  //   .oneOf(["Fixed", "Breakdown"], "Invalid Salary Type"),
  // Temporarily removing salary_amount and allowance_amount from validation
  // salary_amount: Yup.number().when("salary", {
  //   is: "Fixed",
  //   then: Yup.number().required("Salary Amount is required").positive("Salary amount must be positive").nullable(),
  //   otherwise: Yup.number().required("Salary Amount is required").positive("Salary amount must be positive")
  // }),
  // allowance_amount: Yup.number().when("salary", {
  //   is: "Breakdown",
  //   then: Yup.number().nullable(),
  //   otherwise: Yup.number().required("Allowance is required").positive("Allowance amount must be positive")
  // }),
  // working_hours: Yup.string().required("Working Hours is required"),
  // duty_time: Yup.string().required("Duty Time is required"),
  // probation_period: Yup.number()
  //   .required("Probation Period is required")
  //   .positive("Probation period must be positive")
  //   .integer("Probation period must be an integer"),
});

const validationSchemaStep3 = Yup.object({
  // week_days_off: Yup.array().required("Week Days Off is required"),
});

const validationSchemaStep4 = Yup.object({
  // overtime_checked: Yup.number().required("Overtime Hours is required"),
  // sick_leave_checked: Yup.number().required("Sick Leave is required"),
  // casual_leave_checked: Yup.number().required("Casual Leave is required"),
  // working_hours: Yup.string().required("Working Hours is required"),
  // allow_late_attendance_checked: Yup.number().required(
  //   "Allow Late Attendance is required"
  // ),
  // overtime_ratio: Yup.number().required("Over Time Ratio is required"),
});

const HorizontalLinearStepper = () => {
  const { companyId } = useParams();

  // console.log("uniqueCandidateCode", uniqueCandidateCode);
  const [createCandidateMutation] = useCreateCandidateMutation();

  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();

  const validationSchemas = [
    validationSchemaStep1,
    validationSchemaStep2,
    validationSchemaStep3,
    validationSchemaStep4,
  ];
  const formik = useFormik({
    initialValues: {
      name_holder: "Mr", //required string
      name: "", // required
      code: "", // Set the initial value based on candidateCode
      contact: "", // required
      designation: "", // required
      marriage_status: "Unmarried", //required enum['Married', 'Unmarried']
      salary_type: "Monthly", // required - enum ['Weekly', 'Monthly']
      salary: "Fixed", // required - enum ['Fixed', 'Breakdown']
      salary_amount: 2000.0, // required - double
      allowance_amount: 0, // nullable - double
      joining_date: "", // req  uired - date
      working_hours: "08:00", // required
      duty_time: "07:00", // required - time
      probation_period: "1", // required - unsignedBigInt
      break_duration: "00:30", // required - min/hr to seconds - string
      departments: "1", // required - array - api:{{globalLiveUrl}}/employer/all-departments
      allow_late_attendance: "00:15", // nullable -time
      casual_leave: "7", //required - unsignedInteger
      sick_leave: "5", //required - unsignedInteger
      overtime_ratio: "", // double(2.2)
      overtime_hrs: "", // float(2.2)
      week_days_off: [7], // array
      half_days: [], // array
      allow_network_access: "QR", // required - enum['All Net', 'QR']
      // confirmPhoneNumber: "9808426215",
      // allow_late_attendance_checked: "",
      // casual_leave_checked: "",
      // overtime_checked: "",
      // sick_leave_checked: "",
    },
    validationSchema: validationSchemas[activeStep],
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log("Employee being created:", values);

        const { data } = await createCandidateMutation({
          candidateData: values,
          companyId: companyId,
        });

        alert("Candidate added successfully!");
        console.log("Candidate added successfully:", data);
        router.push(`/dashboard/company/${companyId}`);

        resetForm();
      } catch (error) {
        console.error("Error adding candidate:", error);
        alert("Error adding candidate. Please try again.");
      }
    },
  });

  const handleNext = async () => {
    try {
      const isLastStep = activeStep === steps.length - 1;
      console.log("Step 1 Form Values:", formik.values);

      const errors = await formik.validateForm();

      if (Object.keys(errors).length === 0) {
        if (isLastStep) {
          formik.handleSubmit();
        } else {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      } else {
        console.log("Form validation errors:", errors);
      }
    } catch (error) {
      console.error("Error during form validation:", error);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleTestSubmit = () => {
    formik.handleSubmit();
  };
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "87vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <HeaderEmployeeSteps companyId={companyId} />

      <Stepper
        activeStep={activeStep}
        sx={{
          fontSize: "5rem",
          padding: "50px",
        }}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel sx={{ display: "flex", flexDirection: "column" }}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {activeStep === steps.length ? (
          
          <div>
            <>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - youre finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={() => setActiveStep(0)}>Reset</Button>
              </Box>
            </>
          </div>
        ) : (
          <div>
            {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
            <Box sx={{ mt: 2, mb: 2, flex: 1 }}>
              {React.cloneElement(stepComponents[activeStep], {
                formik: formik,
                validationErrors: formik.errors,
              })}
            </Box>
          </div>
        )}
      </Box>

      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          left: 0,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          p: 2,
          bg: "background.paper",
          justifyContent: "space-between",
        }}
      >
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ marginRight: 1 }}
        >
          Back
        </Button>
        <Button onClick={handleNext}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>

        {/* Test Submit Button */}
        {/* <Button onClick={handleTestSubmit}>Test Submit</Button> */}
      </Box>
    </Box>
  );
};

export default HorizontalLinearStepper;
