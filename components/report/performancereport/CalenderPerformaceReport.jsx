"use client";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const CalenderPerformanceReport = () => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

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
        startDate.setDate(now.getDate() - now.getDay()); // First day of the current week
        endDate = new Date(now);
        endDate.setDate(startDate.getDate() + 6); // Last day of the current week
        break;
      case "lastWeek":
        startDate = new Date(now);
        startDate.setDate(now.getDate() - now.getDay() - 7); // First day of the last week
        endDate = new Date(now);
        endDate.setDate(startDate.getDate() + 6); // Last day of the last week
        break;
      case "thisMonth":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1); // First day of the current month
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of the current month
        break;
      case "lastMonth":
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1); // First day of the last month
        endDate = new Date(now.getFullYear(), now.getMonth(), 0); // Last day of the last month
        break;
      case "allMonths":
        startDate = new Date(now.getFullYear(), 0, 1); // First day of the current year
        endDate = new Date(now.getFullYear(), 11, 31); // Last day of the current year
        break;

      default:
        startDate = now;
        endDate = now;
    }

    setSelectionRange({ startDate, endDate, key: "selection" });
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginRight: "20px",
          marginLeft: "20px",
          marginTop: "20px",
          gap: "10px",
          marginLeft: "20px",
        }}
      >
        <Button onClick={() => handlePresetClick("today")}>Today</Button>
        <Button onClick={() => handlePresetClick("yesterday")}>
          Yesterday
        </Button>
        <Button onClick={() => handlePresetClick("thisWeek")}>This Week</Button>
        <Button onClick={() => handlePresetClick("lastWeek")}>Last Week</Button>
        <Button onClick={() => handlePresetClick("thisMonth")}>
          This Month
        </Button>
        <Button onClick={() => handlePresetClick("lastMonth")}>
          Last Month
        </Button>
        <Button onClick={() => handlePresetClick("allMonths")}>
          All Months
        </Button>
      </div>
      <div>
        <DateRange
          editableDateInputs={true}
          months={1}
          onChange={(ranges) => setSelectionRange(ranges.selection)}
          moveRangeOnFirstSelection={false}
          ranges={[selectionRange]}
          scroll={{ enabled: true }}
          direction="vertical"
        />
      </div>

      <p>
        Selected Date Range:{" "}
        {`${selectionRange.startDate.toLocaleDateString()} - ${selectionRange.endDate.toLocaleDateString()}`}
      </p>
    </div>
  );
};

export default CalenderPerformanceReport;
