import { Button } from "@mui/material";
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import MonthlyPerformanceReport from "./tablePerformaceReport/MonthlyPerformanceReport";
import WeeklyPerformanceReport from "./tablePerformaceReport/WeeklyPerformanceReport";
import DailyPerformanceReport from "./tablePerformaceReport/DailyPerformanceReport";
import YearlyPerformanceReport from "./tablePerformaceReport/YearlyPerformanceReport";

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
      default:
        startDate = now;
        endDate = now;
        break;
    }

    // Check if the selected date range is the same as the previously selected range
    const isSameDateRange =
      startDate.toDateString() === selectionRange.startDate.toDateString() &&
      endDate.toDateString() === selectionRange.endDate.toDateString();

    // If it's the same date range, set both start and end dates to the same date
    if (isSameDateRange) {
      startDate = endDate = new Date(startDate);
    }

    setSelectionRange({ startDate, endDate, key: "selection" });
    setSelectedComponent(determineComponent(startDate, endDate));
  };

  const determineComponent = (startDate, endDate) => {
    const diffInDays = Math.floor(
      (endDate - startDate) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) {
      return <DailyPerformanceReport startDate={startDate} endDate={endDate} />;
    } else if (diffInDays === 6 || diffInDays >= 7) {
      return (
        <WeeklyPerformanceReport startDate={startDate} endDate={endDate} />
      );
    } else if (
      startDate.getDate() === 1 &&
      endDate.getDate() ===
        new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate()
    ) {
      return (
        <MonthlyPerformanceReport startDate={startDate} endDate={endDate} />
      );
    } else if (
      startDate.getDate() === 1 &&
      startDate.getMonth() === 0 &&
      endDate.getDate() === 31 &&
      endDate.getMonth() === 11
    ) {
      return (
        <YearlyPerformanceReport startDate={startDate} endDate={endDate} />
      );
    } else {
      return null;
    }
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        {selectedComponent}
      </div>
      <p>
        Selected Date Range:{" "}
        {`${selectionRange.startDate.toLocaleDateString()} - ${selectionRange.endDate.toLocaleDateString()}`}
      </p>
    </div>
  );
};

export default CalendarPerformanceReport;
