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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
const Step2Component = ({ formik }) => {
  const [ampm, setAmpm] = useState("am");
  const isScreenSmall = useMediaQuery("(max-width:1209px)");
  const isScreenSm = useMediaQuery("(max-width:1000px)");
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
    if (!break_duration) return; // Null check

    const [hours, minutes] = break_duration.split(":").map(Number);

    // Convert hours and minutes to total minutes
    let totalMinutes = hours * 60 + minutes;

    // Increase or decrease by 30 minutes
    totalMinutes = decrease ? totalMinutes + 10 : totalMinutes - 10;

    // Ensure totalMinutes remain in range [0, 1439] (24 hours)
    totalMinutes = (totalMinutes + 1440) % 1440;

    // Calculate new hours and minutes
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;

    // Format the new time
    const formattedHours = String(newHours).padStart(2, "0");
    const formattedMinutes = String(newMinutes).padStart(2, "0");

    formik.setFieldValue(
      "break_duration",
      `${formattedHours}:${formattedMinutes}`
    );
  };

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

    formik.setFieldValue("duty_time", formattedTime);
  };

  // Ensure minutes are formatted with leading zeros

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
              <InputLabel htmlFor="salary_type">Salary Type</InputLabel>
              <Select
                label="Salary Type"
                name="salary_type"
                value={formik.values.salary_type}
                onChange={formik.handleChange}
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
                aria-label="salary"
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
                name="salary_amount"
                value={formik.values.salary_amount}
                onChange={formik.handleChange}
                sx={{
                  width: isScreenSm
                    ? "200px"
                    : isScreenSmall
                    ? "350px"
                    : "450px",
                  marginTop: 8,
                }}
              />
            )}
            {formik.values.salary === "Breakdown" && (
              <TextField
                label="Salary Amount"
                variant="outlined"
                margin="normal"
                name="salary_amount"
                value={formik.values.salary_amount}
                onChange={formik.handleChange}
                sx={{
                  width: isScreenSm
                    ? "200px"
                    : isScreenSmall
                    ? "350px"
                    : "450px",
                  marginTop: 8,
                }}
              />
            )}
            {formik.values.salary === "Breakdown" && (
              <TextField
                label="Allowance Amount"
                variant="outlined"
                margin="normal"
                name="allowance_amount"
                value={formik.values.allowance_amount}
                onChange={formik.handleChange}
                sx={{
                  width: isScreenSm
                    ? "200px"
                    : isScreenSmall
                    ? "350px"
                    : "450px",
                }}
              />
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
                // label="Working Hours"
                variant="outlined"
                sx={{
                  width: isScreenSm
                    ? "100px"
                    : isScreenSmall
                    ? "200px"
                    : "333px",
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
                sx={{ height: "55px", marginLeft: -1.3, marginTop: 0.9 }}
              >
                +
              </Button>
            </div>

            {/* <DemoContainer components={["TimePicker"]}>
              <TimePicker label="Duty Hour " />
            </DemoContainer>
            <DemoContainer components={["TimePicker"]}>
              <TimePicker label="Breaking Time " />
            </DemoContainer> */}
            <Typography variant="body1">
              Duty Time <span style={{ color: "red" }}> *</span>
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <TextField
                label="Duty Time"
                variant="outlined"
                margin="normal"
                sx={{
                  width: isScreenSm
                    ? "160px"
                    : isScreenSmall
                    ? "270px"
                    : "395px",
                  textAlign: "center",
                }}
                name="duty_time"
                value={formik.values.duty_time}
                onChange={formik.handleChange}
              />
              <FormControl sx={{ width: "70px", marginTop: 1, marginLeft:'-10px' }}>
                <InputLabel htmlFor="am">AM/PM</InputLabel>
                <Select
                  label="AM/PM"
                  value={formik.values.am_pm}
                  onChange={formik.handleChange}
                  name="am_pm"
                >
                  <MenuItem value="AM">AM</MenuItem>
                  <MenuItem value="PM">PM</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Typography variant="body1">
              Break Time <span style={{ color: "red" }}> *</span>
            </Typography>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Button variant="outlined" sx={{ height: "55px" ,marginRight: -1.25, marginTop: 0.9}}>
                -
              </Button>
              <TextField
                label="Break Time"
                variant="outlined"
                sx={{
                  width: isScreenSm
                    ? "100px"
                    : isScreenSmall
                    ? "200px"
                    : "333px",
                  textAlign: "center",
                }}
                margin="normal"
                name="break_duration"
                value={formik.values.break_duration}
                onChange={formik.handleChange}
                inputProps={{ style: { textAlign: "center" } }}
              />
              <Button variant="outlined" sx={{ height: "55px",marginLeft: -1.3, marginTop: 0.9 }}>
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
                label="Probation Period"
                value={formik.values.probation_period}
                onChange={formik.handleChange}
                name="probation_period"
              >
                <MenuItem value="1">1 month</MenuItem>
                <MenuItem value="3">3 months</MenuItem>
                <MenuItem value="6">6 months</MenuItem>
                <MenuItem value="12">12 months</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default Step2Component;
