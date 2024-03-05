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
  const [ampm, setAmpm] = useState("");
  const handleSalaryTypeChange = (event) => {
    formik.handleChange(event);
    // formik.setFieldValue("ampm", "am");
    // formik.setFieldValue("allowance_amount", "");
  };

  const handleworking_hoursChange = (decrease) => {
    const [hours, minutes] = formik.values.working_hours.split(":").map(Number);
    let totalMinutes = hours * 60 + minutes;
    totalMinutes = decrease ? totalMinutes + 10 : totalMinutes - 10;
    totalMinutes = (totalMinutes + 1440) % 1440;
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;
    const formattedHours = String(newHours).padStart(2, "0");
    const formattedMinutes = String(newMinutes).padStart(2, "0");
    formik.setFieldValue(
      "working_hours",
      `${formattedHours}:${formattedMinutes}`
    );
  };

  const handlebreak_durationChange = (decrease) => {
    const break_duration = formik.values.break_duration;
    if (!break_duration) return;

    const [hours, minutes] = break_duration.split(":").map(Number);

    // Calculate the total duration in minutes
    let totalMinutes = hours * 60 + minutes;

    // Increase or decrease by 10 minutes
    totalMinutes = decrease ? totalMinutes + 10 : totalMinutes - 10;

    // Ensure totalMinutes remain in range [0, 1439] (24 hours)
    totalMinutes = (totalMinutes + 1440) % 1440;

    // Calculate new hours and minutes
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;

    // Format the new time
    const formattedHours = String(newHours).padStart(2, "0");
    const formattedMinutes = String(newMinutes).padStart(2, "0");

    // Update the field value using Formik's setFieldValue method
    formik.setFieldValue(
      "break_duration",
      `${formattedHours}:${formattedMinutes}`
    );

    // Update the field value with the total duration in minutes
    formik.setFieldValue("break_duration_in_minutes", totalMinutes.toString());
  };

  // Inside handleAmPmChange() function
  const handleAmPmChange = () => {
    const duty_time = formik.values.duty_time;
    if (!duty_time) return; // Null check

    const [time, period] = duty_time.split(" ");
    const [hours, minutes] = time.split(":").map(Number);

    let newHours = hours;
    if (period === "pm" && hours !== 12) {
      newHours += 12;
    } else if (period === "am" && hours === 12) {
      newHours = 0;
    }

    // Ensure minutes are formatted with leading zeros
    const formattedMinutes = String(minutes).padStart(2, "0");

    // Format the new time with leading zeros for hours and minutes
    const formattedHours = String(newHours).padStart(2, "0");
    const formattedTime = `${formattedHours}:${formattedMinutes}`;

    // Update Formik value for duty_time
    formik.setFieldValue("duty_time", formattedTime);

    // Update Formik value for AM/PM selection
  };

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
            <Select
              value={formik.values.salary_type}
              label="Salary Type"
              name="salaryType"
              onChange={formik.handleChange}
              id="salary_type"
            >
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
              name="salary"
              value={formik.values.salary}
              onChange={formik.handleChange}
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
              name="salary_amount"
              {...formik.getFieldProps("salary_amount")}
              error={
                formik.touched.salary_amount &&
                Boolean(formik.errors.salary_amount)
              }
              helperText={
                formik.touched.salary_amount && formik.errors.salary_amount
              }
            />
          )}
          {formik.values.salary !== "Fixed" && (
            <>
              <TextField
                label="Basic Salary"
                variant="outlined"
                sx={{
                  width: isScreenSm
                    ? "200px"
                    : isScreenSmall
                    ? "350px"
                    : "450px",
                }}
                margin="normal"
                name="salary_amount"
                {...formik.getFieldProps("salary_amount")}
                error={
                  formik.touched.salary_amount &&
                  Boolean(formik.errors.salary_amount)
                }
                helperText={
                  formik.touched.salary_amount && formik.errors.salary_amount
                }
              />
              <TextField
                label="Allowance Amount"
                variant="outlined"
                sx={{
                  width: isScreenSm
                    ? "200px"
                    : isScreenSmall
                    ? "350px"
                    : "450px",
                }}
                margin="normal"
                name="allowance_amount"
                {...formik.getFieldProps("allowance_amount")}
                error={
                  formik.touched.allowance_amount &&
                  Boolean(formik.errors.allowance_amount)
                }
                helperText={
                  formik.touched.allowance_amount &&
                  formik.errors.allowance_amount
                }
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
              onClick={() => handleworking_hoursChange(false)}
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
              inputProps={{ style: { textAlign: "center" } }}
              {...formik.getFieldProps("working_hours")}
            />
            <Button
              variant="outlined"
              onClick={() => handleworking_hoursChange(true)}
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
              name="duty_time"
              {...formik.getFieldProps("duty_time")}
              sx={{
                width: isScreenSm ? "160px" : isScreenSmall ? "270px" : "395px",
                textAlign: "center",
              }}
            />
            <FormControl sx={{ width: "53px", marginTop: 1 }}>
              <InputLabel htmlFor="am">AM/PM</InputLabel>
              <Select
                value={formik.values.ampm}
                label="AM/PM"
                onChange={(e) => {
                  formik.handleChange(e);
                  handleAmPmChange();
                }}
                name="ampm"
                sx={{ marginLeft: -1.3 }}
              >
                <MenuItem value="am">AM</MenuItem>
                <MenuItem value="pm">PM</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Typography variant="body1">
            Break Time <span style={{ color: "red" }}> *</span>
          </Typography>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Button
              variant="outlined"
              onClick={() => handlebreak_durationChange(false)}
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
              {...formik.getFieldProps("break_duration")}
            />
            <Button
              variant="outlined"
              onClick={() => handlebreak_durationChange(true)}
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
            <Select
              value={formik.values.probation_period}
              label="Probation Period"
              onChange={formik.handleChange}
              name="probation_period"
              id="probation_period"
            >
              <MenuItem value="1">1 month</MenuItem>
              <MenuItem value="3 months">3 months</MenuItem>
              <MenuItem value="6 months">6 months</MenuItem>
              <MenuItem value="12 months">12 months</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Step2Component;
