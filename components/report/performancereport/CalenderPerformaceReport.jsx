import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import MonthlyPerformanceReport from "./tablePerformaceReport/MonthlyPerformanceReport";
import WeeklyPerformanceReport from "./tablePerformaceReport/WeeklyPerformanceReport";
import DailyPerformanceReport from "./tablePerformaceReport/DailyPerformanceReport";
import YearlyPerformanceReport from "./tablePerformaceReport/YearlyPerformanceReport";
import DailyGraphPerformaceReport from "./graphPerformance/DailyGraphPerformaceReport";
import WeeklyGraphPerformaceReport from "./graphPerformance/WeeklyGraphPerformaceReport";
import MonthlyGraphPerformaceReport from "./graphPerformance/MonthlyGraphPerformaceReport";
import YearlyGraphPerformaceReport from "./graphPerformance/YearlyGraphPerformaceReport";

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

    const isSameDateRange =
      startDate.toDateString() === selectionRange.startDate.toDateString() &&
      endDate.toDateString() === selectionRange.endDate.toDateString();

    if (isSameDateRange) {
      startDate = endDate = new Date(startDate);
    }

    setSelectionRange({ startDate, endDate, key: "selection" });
    setSelectedComponent(determineComponent(startDate, endDate));
  };

  const determineComponent = (startDate, endDate) => {
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    const diffInDays = Math.floor(
      (endDate - startDate) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) {
      return <DailyPerformanceReport startDate={startDate} endDate={endDate} />;
    } else if (diffInDays === 6 || diffInDays >= 7) {
      return (
        // <WeeklyPerformanceReport startDate={startDate} endDate={endDate} />
        <YearlyPerformanceReport StartYear={StartYear} />
      );
    } else if (
      startDate.getDate() === 1 &&
      endDate.getDate() ===
        new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate()
    ) {
      return (
        // <MonthlyPerformanceReport startDate={startDate} endDate={endDate} />
        <YearlyPerformanceReport StartYear={StartYear} />
      );
    } else {
      return (
        <YearlyPerformanceReport startDate={startDate} endDate={endDate} />
      );
    }
  };
  const StartYear = selectionRange.startDate.getFullYear();
  const StartMonth = selectionRange.startDate.getMonth() + 1;
  const StartDay = selectionRange.startDate.getDate();
  const EndYear = selectionRange.endDate.getFullYear();
  const EndMonth = selectionRange.endDate.getMonth() + 1;
  const EndDay = selectionRange.endDate.getDate();
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
          <Button onClick={() => handlePresetClick("yesterday")}>
            Yesterday
          </Button>
          <Button onClick={() => handlePresetClick("thisWeek")}>
            This Week
          </Button>
          <Button onClick={() => handlePresetClick("lastWeek")}>
            Last Week
          </Button>
          <Button onClick={() => handlePresetClick("thisMonth")}>
            This Month
          </Button>
          <Button onClick={() => handlePresetClick("lastMonth")}>
            Last Month
          </Button>
          <Button onClick={() => handlePresetClick("allMonths")}>
            All Months
          </Button>
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
        <Box>
          {selectedComponent && (
            <Box>
              <h2>Graphical Report</h2>
              {selectionRange.startDate.toDateString() ===
              selectionRange.endDate.toDateString() ? (
                <DailyGraphPerformaceReport
                  startDate={selectionRange.startDate}
                  endDate={selectionRange.endDate}
                />
              ) : selectionRange.startDate.getDate() === 1 &&
                selectionRange.endDate.getDate() ===
                  new Date(
                    selectionRange.startDate.getFullYear(),
                    selectionRange.startDate.getMonth() + 1,
                    0
                  ).getDate() ? (
                <MonthlyGraphPerformaceReport
                  startDate={selectionRange.startDate}
                  endDate={selectionRange.endDate}
                />
              ) : (
                <YearlyGraphPerformaceReport
                  startDate={selectionRange.startDate}
                  endDate={selectionRange.endDate}
                />
              )}
            </Box>
          )}
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" width="100%">
        <p>
          Selected Date Range:{" "}
          {`${selectionRange.startDate.toLocaleDateString()} - ${selectionRange.endDate.toLocaleDateString()}`}
        </p>
        {/* <p>Start Year:{StartYear}</p>
        <p>Start Month: :{StartMonth}</p>
        <p>Start Day: :{StartDay}</p>
        <p>End Year::{EndYear} </p>
        <p>End Month::{EndMonth} </p>
        <p>End Day: :{EndDay}</p> */}
        {selectedComponent}
      </Box>
    </Box>
  );
};

export default CalendarPerformanceReport;
