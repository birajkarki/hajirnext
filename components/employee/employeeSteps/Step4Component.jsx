"use client";
import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import DatePick from "./DatePick";
import { useMediaQuery } from "@mui/material";

const Step4Component = ({ formik }) => {
  const handleAccessNetworkChange = (event) => {
    // formik.setFieldValue("allow_network_access", event.target.value);
  };

  const handleHoursChange = (increase) => {
    const [hours, minutes] = formik.values.working_hours.split(":").map(Number);
    let totalMinutes = hours * 60 + minutes;
    totalMinutes = increase ? totalMinutes + 10 : totalMinutes - 10;
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

  const handleOvertimeRatioFieldChange = (increase) => {
    const currentValue = parseFloat(formik.values.overtime_ratio);
    const newValue = increase ? currentValue + 0.1 : currentValue - 0.1;
    formik.setFieldValue("overtime_ratio", newValue.toFixed(1));
  };

  const handleDateSelect = (selectedDate) => {
    const parsedDate = new Date(selectedDate); // Parse the selectedDate string into a Date object
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // Add leading zero if necessary
    const day = String(parsedDate.getDate()).padStart(2, "0"); // Add leading zero if necessary
    const formattedDate = `${year}-${month}-${day}`;
    formik.setFieldValue("joining_date", formattedDate);
  };
  const isScreenSmall = useMediaQuery("(max-width:1214px)");
  const isScreenSm = useMediaQuery("(max-width:910px)");

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            mt: 1,
            width: "300px",
          }}
        >
          <Typography variant="body1" sx={{ marginBottom: "6px" }}>
            Joining Date{" "}
            <span style={{ width: "150px", color: "red" }}> *</span>
          </Typography>

          <div style={{ width: "50px" }}>
            <DatePick
              style={{ marginLeft: "23px" }}
              onSelect={handleDateSelect}
            />
          </div>

          <Typography sx={{ marginTop: 2 }} variant="body1">
            Overtime Hours <span sx={{ color: "red" }}>(Optional)</span>
          </Typography>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Checkbox
              checked={formik.values.overtime_checked === 1}
              onChange={(e) => {
                formik.setFieldValue(
                  "overtime_checked",
                  e.target.checked ? 1 : 0
                );
                formik.setFieldValue("overtime_hrs", "");
              }}
              name="overtime_checked"
            />
            <TextField
              sx={{
                width: isScreenSm ? "140px" : isScreenSmall ? "240px" : "445px",
                ml: 2,
              }}
              label="eg : 2 ,4 ,5 , 6"
              disabled={!formik.values.overtime_checked}
              {...formik.getFieldProps("overtime_hrs")}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginTop: 2,
              width: "605px",
            }}
          >
            <Box sx={{ width: "40%" }}>
              <Typography variant="body1">
                Sick Leave <span style={{ color: "red" }}>*</span>
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.sick_leave_checked === 1}
                      onChange={(e) =>
                        formik.setFieldValue(
                          "sick_leave_checked",
                          e.target.checked ? 1 : 0
                        )
                      }
                      name="sick_leave_checked"
                      sx={{ ml: "9px" }}
                    />
                  }
                />
                <TextField
                  label="eg : 2 ,4 ,5 , 6"
                  sx={{
                    width: isScreenSm
                      ? "60px"
                      : isScreenSmall
                      ? "110px"
                      : "auto",
                    ml: isScreenSmall ? -2 : 2,
                  }}
                  {...formik.getFieldProps("sick_leave")}
                  disabled={!formik.values.sick_leave_checked}
                />
              </Box>
            </Box>
            <Box sx={{ width: "42%", ml: 2 }}>
              <Typography
                variant="body1"
                style={{
                  marginLeft: isScreenSm
                    ? "-140px"
                    : isScreenSmall
                    ? "-80px"
                    : "30px",
                }}
              >
                Casual Leave <span style={{ color: "red" }}>*</span>
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.casual_leave_checked === 1}
                      onChange={(e) =>
                        formik.setFieldValue(
                          "casual_leave_checked",
                          e.target.checked ? 1 : 0
                        )
                      }
                      name="casual_leave_checked"
                      style={{
                        marginLeft: isScreenSm
                          ? "-140px"
                          : isScreenSmall
                          ? -101
                          : "30px",
                        marginRight: "-5px",
                      }}
                    />
                  }
                />
                <TextField
                  label="eg : 2 ,4 ,5 , 6"
                  sx={{
                    width: isScreenSm
                      ? "60px"
                      : isScreenSmall
                      ? "110px"
                      : "160px",
                    ml: isScreenSm ? "-120px" : isScreenSmall ? "-80px" : 1.5,
                  }}
                  {...formik.getFieldProps("casual_leave")}
                  disabled={!formik.values.casual_leave_checked}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={6}>
        <div style={{ marginLeft: isScreenSm ? "25px" : "auto" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              mt: -0.7,
              ml: isScreenSm ? "-10px" : "auto",
            }}
          >
            <Typography
              variant="body1"
              style={{
                marginLeft: isScreenSmall ? "-12px" : "55px",
                marginTop: "10px",
                marginBottom: "-10px",
              }}
            >
              Allow Late Attendance <span style={{ color: "red" }}>*</span>
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
                marginLeft: isScreenSmall ? "1px" : "60px",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.allow_late_attendance === 1}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "allow_late_attendance",
                        e.target.checked ? 1 : 0
                      )
                    }
                    name="allow_late_attendance"
                    style={{
                      marginRight: isScreenSm
                        ? "30px"
                        : isScreenSmall
                        ? "47px"
                        : "-10px",
                      marginLeft: isScreenSm
                        ? "-18px"
                        : isScreenSmall
                        ? "-14px"
                        : "auto",
                    }}
                  />
                }
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginLeft: isScreenSmall ? "-60px" : "auto",
                }}
              >
                <Button
                  sx={{ height: "55px", marginRight: -1.25, marginTop: 0.9 }}
                  variant="outlined"
                  onClick={() => handleHoursChange(false)}
                  disabled={!formik.values.allow_late_attendance_checked}
                >
                  -
                </Button>
                <TextField
                  // label="Working Hours"
                  variant="outlined"
                  sx={{
                    width: isScreenSm
                      ? "80px"
                      : isScreenSmall
                      ? "160px"
                      : "230px",
                    textAlign: "center",
                  }}
                  margin="normal"
                  name="working_hours"
                  inputProps={{ style: { textAlign: "center" } }}
                  {...formik.getFieldProps("working_hours")}
                  InputProps={{
                    disabled: !formik.values.allow_late_attendance,
                  }}
                />
                <Button
                  variant="outlined"
                  sx={{ height: "55px", marginLeft: -1.3, marginTop: 0.9 }}
                  onClick={() => handleHoursChange(true)}
                  disabled={!formik.values.allow_late_attendance_checked}
                >
                  +
                </Button>
              </div>
            </Box>

            <Typography
              variant="body1"
              style={{
                marginTop: "12px",
                marginBottom: "1px",
                marginLeft: isScreenSmall ? "-10px" : "60px",
              }}
            >
              Over Time Ratio <span style={{ color: "red" }}>*</span>
            </Typography>
            <Box>
              <TextField
                label="eg ratio: 2, 4, 5, 6"
                value={formik.values.overtime_ratio}
                onChange={formik.handleChange}
                name="overtime_ratio"
                sx={{
                  mt: -0.1,
                  mb: 2,
                  ml: isScreenSmall ? -1.1 : 7,
                  width: isScreenSm
                    ? "226px"
                    : isScreenSmall
                    ? "330px"
                    : "405px",
                }}
                disabled={!formik.values.overtime_checked}
              />
            </Box>
            <Typography
              variant="body1"
              style={{ marginLeft: isScreenSmall ? "-12px" : "55px" }}
            >
              Allow access Network <span style={{ color: "red" }}>*</span>
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                width: isScreenSm ? "220px" : isScreenSmall ? "330px" : "400px",
                ml: isScreenSmall ? -1 : 7,
                height: "55px",
              }}
            >
              <FormControlLabel
                value="all"
                control={<Radio />}
                label="All"
                checked={formik.values.allow_network_access === "All Net"}
                onChange={formik.handleChange}
                name="allow_network_access"
              />
              <Divider
                style={{ height: "55px", marginTop: "-11px" }}
                orientation="vertical"
                flexItem
              />
              <FormControlLabel
                value="QR"
                control={<Radio />}
                label="QR code"
                checked={formik.values.allow_network_access === "QR code"}
                onChange={formik.handleChange}
                name="allow_network_access"
              />
            </Box>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};

export default Step4Component;
