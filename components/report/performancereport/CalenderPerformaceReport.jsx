import { Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import DailyPerformanceReport from "./tablePerformaceReport/DailyPerformanceReport";
import YearlyPerformanceReport from "./tablePerformaceReport/YearlyPerformanceReport";
import WeeklyPerformanceReport from "./tablePerformaceReport/WeeklyPerformanceReport";
import MonthlyPerformanceReport from "./tablePerformaceReport/MonthlyPerformanceReport";

const CalendarPerformanceReport = () => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handlePresetClick = (preset) => {
    const now = new Date();
    let startDate, endDate;
  
    switch (preset) {
      case "today":
        startDate = now;
        endDate = now;
        break;
      case "yesterday":
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 1);
        endDate = new Date(now);
        endDate.setDate(now.getDate() - 1);
        break;
      case "thisWeek":
        startDate = new Date(now);
        startDate.setDate(now.getDate() - now.getDay());
        endDate = new Date(now);
        endDate.setDate(startDate.getDate() + 6);
        break;
      case "lastWeek":
        startDate = new Date(now);
        startDate.setDate(now.getDate() - now.getDay() - 7);
        endDate = new Date(now);
        endDate.setDate(startDate.getDate() + 6);
        break;
      case "thisMonth":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case "lastMonth":
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      case "allMonths":
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear(), 11, 31);
        break;
      // case "thisYear":
      //   startDate = new Date(now.getFullYear(), 0, 1);
      //   endDate = new Date(now.getFullYear(), 11, 31);
      //   break;
      default:
        startDate = now;
        endDate = now;
        break;
    }
  
    setSelectionRange({ startDate, endDate, key: "selection" });
  };

  useEffect(() => {
    const diffInDays = Math.floor((selectionRange.endDate - selectionRange.startDate) / (1000 * 60 * 60 * 24));
    const diffInMonths = selectionRange.endDate.getMonth() - selectionRange.startDate.getMonth() + 
                        (12 * (selectionRange.endDate.getFullYear() - selectionRange.startDate.getFullYear()));
    if (diffInDays === 0) {
      setSelectedComponent(
        <DailyPerformanceReport
        startDateValue={selectionRange.startDate.toLocaleDateString()}
          startDate={selectionRange.startDate}
        />
      );
    } else if (diffInDays <= 6) { // Less than or equal to 6 days, render weekly report
      setSelectedComponent(
        <WeeklyPerformanceReport
        startDateValue={selectionRange.startDate}
          endDateValue={selectionRange.endDate}
        />
      );
    } else if (diffInMonths === 0) { // Less than or equal to 1 month, render monthly report
      setSelectedComponent(
        <MonthlyPerformanceReport
        startDateValue={selectionRange.startDate}
        endDateValue={selectionRange.endDate}
        startDate={selectionRange.startDate}

        />
      );
    } else if (diffInMonths < 12) { // Less than or equal to 1 year, render yearly report
      setSelectedComponent(
        <YearlyPerformanceReport
        startDateValue={selectionRange.startDate}
        endDateValue={selectionRange.endDate}
        />
      );
    }
    
  }, [selectionRange]);

  return (
    <Box width="100%">
      <Box display="flex">
        <Box
          marginRight="20px"
          display="flex"
          flexDirection="column"
          gap="10px"
        >
          <Button onClick={() => handlePresetClick("today")}>Today</Button>
          <Button onClick={() => handlePresetClick("yesterday")}>Yesterday</Button>
          <Button onClick={() => handlePresetClick("thisWeek")}>This Week</Button>
          <Button onClick={() => handlePresetClick("lastWeek")}>Last Week</Button>
          <Button onClick={() => handlePresetClick("thisMonth")}>This Month</Button>
          <Button onClick={() => handlePresetClick("lastMonth")}>Last Month</Button>
          <Button onClick={() => handlePresetClick("allMonths")}>All Months</Button>
          <Button onClick={() => handlePresetClick("thisYear")}>This Year</Button>
        </Box>
        <DateRange
          editableDateInputs={true}
          months={1}
          onChange={(ranges) => setSelectionRange(ranges.selection)}
          moveRangeOnFirstSelection={false}
          ranges={[selectionRange]}
          scroll={{ enabled: true }}
          direction="vertical"
        />
      </Box>
      <Box display="flex" flexDirection="column" width="100%">
        {selectedComponent}
      </Box>
    </Box>
  );
};

export default CalendarPerformanceReport;
