"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useMediaQuery } from "@mui/material";

const Step2Component = ({ formik }) => {
  const isScreenSmall = useMediaQuery("(max-width:1209px)");
  const isScreenSm = useMediaQuery("(max-width:1000px)");
  return (
    <Grid container spacing={2}>
      {/* Left Column */}
      <Grid item xs={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            mt: 1,
          }}
        >
          <Typography variant="body1">
            Salary Type <span style={{ color: "red" }}> *</span>
          </Typography>
          <FormControl
            sx={{
              width: isScreenSm ? "200px" : isScreenSmall ? "350px" : "450px",
              marginTop: 2,
            }}
          >
            <InputLabel
              htmlFor="salary_type"
              sx={{ color: "black", marginBottom: 0 }}
            >
              Salary Type
            </InputLabel>
            <Select label="Salary Type">
              <MenuItem value="Weekly">Weekly</MenuItem>
              <MenuItem value="Monthly">Monthly</MenuItem>
            </Select>
          </FormControl>
          <Typography sx={{ marginTop: 2 }} variant="body1">
            Salary <span style={{ color: "red" }}> *</span>
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="salary_type"
              sx={{ width: "700px", marginTop: 1 }}
            >
              <FormControlLabel
                value="Fixed"
                control={<Radio />}
                label="Fixed"
              />
              <FormControlLabel
                value="Breakdown"
                control={<Radio />}
                label="Breakdown"
              />
            </RadioGroup>
          </FormControl>
          {formik.values.salary === "Fixed" && (
            <TextField
              label="Salary Amount"
              variant="outlined"
              margin="normal"
              sx={{
                width: isScreenSm ? "200px" : isScreenSmall ? "350px" : "450px",
                marginTop: 8,
              }}
            />
          )}
          <>
            <TextField
              label="Basic Salary"
              variant="outlined"
              sx={{
                width: isScreenSm ? "200px" : isScreenSmall ? "350px" : "450px",
              }}
              margin="normal"
            />
            <TextField
              label="Allowance Amount"
              variant="outlined"
              sx={{
                width: isScreenSm ? "200px" : isScreenSmall ? "350px" : "450px",
              }}
              margin="normal"
            />
          </>
          )}
        </Box>
      </Grid>
      {/* right part  */}
      <Grid item xs={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            mt: 1,
          }}
        >
          <Typography variant="body1">
            Working Hours <span style={{ color: "red" }}> *</span>
          </Typography>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Button
              variant="outlined"
              sx={{ height: "55px", marginRight: -1.25, marginTop: 0.9 }}
            >
              -
            </Button>
            <TextField
              label="Working Hours"
              variant="outlined"
              sx={{
                width: isScreenSm ? "100px" : isScreenSmall ? "200px" : "333px",
                textAlign: "center",
              }}
              margin="normal"
              name="working_hours"
            />
            <Button
              variant="outlined"
              sx={{ height: "55px", marginLeft: -1.2, marginTop: 0.9 }}
            >
              +
            </Button>
          </div>

          <Typography variant="body1">
            Duty Time <span style={{ color: "red" }}> *</span>
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <TextField
              label="Duty Time"
              variant="outlined"
              margin="normal"
              sx={{
                width: isScreenSm ? "160px" : isScreenSmall ? "270px" : "395px",
                textAlign: "center",
              }}
            />
            <FormControl sx={{ width: "53px", marginTop: 1 }}>
              <InputLabel htmlFor="am">AM/PM</InputLabel>
              <Select label="AM/PM" sx={{ marginLeft: -1.3 }}>
                <MenuItem value="">AM</MenuItem>
                <MenuItem value="">PM</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Typography variant="body1">
            Break Time <span style={{ color: "red" }}> *</span>
          </Typography>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Button
              variant="outlined"
              sx={{ height: "55px", marginRight: -1.25, marginTop: 0.9 }}
            >
              -
            </Button>
            <TextField
              label="Break Time"
              variant="outlined"
              sx={{
                width: isScreenSm ? "100px" : isScreenSmall ? "200px" : "333px",
                textAlign: "center",
              }}
              margin="normal"
              name="break_duration"
              inputProps={{ style: { textAlign: "center" } }}
            />
            <Button
              variant="outlined"
              sx={{ height: "55px", marginLeft: -1.2, marginTop: 0.9 }}
            >
              +
            </Button>
          </div>

          <Typography variant="body1">
            Probation Period <span style={{ color: "red" }}> *</span>
          </Typography>
          <FormControl
            sx={{
              width: isScreenSm ? "230px" : isScreenSmall ? "330px" : "462px",
            }}
          >
            <Select label="Probation Period">
              <MenuItem value="1">1 month</MenuItem>
              <MenuItem value="3 ">3 months</MenuItem>
              <MenuItem value="6 ">6 months</MenuItem>
              <MenuItem value="12 ">12 months</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Step2Component;
