import React, { useState } from "react";
import { Box, Checkbox, Grid, Typography, Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const Step3Component = ({ formik }) => {
  onSubmit: (values) => {
    console.log(values);
  };

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleDayClick = (index) => {
    if (!formik.values.week_days_off.includes(index + 1)) {
      formik.setValues({
        ...formik.values,
        week_days_off: [...formik.values.week_days_off, index + 1],
      });
    } else {
      formik.setValues({
        ...formik.values,
        week_days_off: formik.values.week_days_off.filter(
          (day) => day !== index + 1
        ),
      });
    }
  };

  const handleHalfDayClick = (index) => {
    if (!formik.values.half_days.includes(index + 1)) {
      formik.setValues({
        ...formik.values,
        half_days: [...formik.values.half_days, index + 1],
      });
    } else {
      formik.setValues({
        ...formik.values,
        half_days: formik.values.half_days.filter((day) => day !== index + 1),
      });
    }
  };

  return (
    <Box > 
      <Typography sx={{marginTop:'-20px', marginBottom:'10px'}}>Weekly Day Off <span style={{color:'red'}}>*</span></Typography>
    <Grid container spacing={2}>
       
      {days.map((day, index) => (
        <Grid item key={day} xs={12} sm={6} md={5} lg={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #F0F0F0",
              borderRadius: "4px",
              padding: "6px",
              width: "100%",

              cursor: "pointer",
              marginBottom: "8px",
            }}
            onClick={() => handleDayClick(index)}
          >
           
            <Box sx={{ display: "flex", flexDirection:'row', alignItems: "center" }}>
              <Checkbox
                checked={formik.values.week_days_off.includes(index + 1)}
                onChange={() => handleDayClick(index)}
                sx={{
                  color: formik.values.week_days_off.includes(index + 1)
                    ? "red"
                    : "black",
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: formik.values.week_days_off.includes(index + 1)
                    ? "red"
                    : "black",
                
                }}
              >
                {day}
              </Typography>
            </Box>
            {formik.values.week_days_off.includes(index + 1) && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent:'center',
                  alignItems: "center",
                  cursor: "pointer",
                  borderLeft: "1px solid #E0E0E0",
                  marginLeft: "4px",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox
                  checked={formik.values.half_days.includes(index + 1)}
                  onChange={() => handleHalfDayClick(index)}
                  // sx={{ color: "red" }}
                />
                <Typography variant="body2"
                sx={{     
              }}
              >Half Day?</Typography>
              </Box>
            )}
          </Box>
        </Grid>
      ))}
    </Grid>
    </Box>
  );
};
export default Step3Component;
