
"use client"
import * as React from "react";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { useMediaQuery } from "@mui/material";

export default function DatePick({ onSelect }) {
  const [cleared, setCleared] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onSelect(date); // Call the onSelect callback with the selected date
  };

  React.useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);
  const isScreenSmall = useMediaQuery("(max-width:1214px)");
  const isScreenSm = useMediaQuery("(max-width:910px)");
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          // justifyContent: "center",
          position: "relative",
        }}
      >
        <DemoItem>
          <DatePicker
            sx={{ width: isScreenSm? "200px": isScreenSmall ? "300px": "505px"}}
            slotProps={{
              field: { clearable: true, onClear: () => setCleared(true) },
            }}
            value={selectedDate} // Pass the selectedDate as the value prop
            onChange={handleDateChange} // Pass the handleDateChange callback to handle date changes
          />
        </DemoItem>

        {cleared && (
          <Alert
            sx={{ position: "absolute", bottom: 0, right: 0 }}
            severity="success"
          >
            Field cleared!
          </Alert>
        )}
      </Box>
    </LocalizationProvider>
  );
}
