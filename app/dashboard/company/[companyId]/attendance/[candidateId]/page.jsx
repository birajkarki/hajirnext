"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import {
  useGetDailyCompanyCandidatePerformaceReportQuery,
  useGetDailyCompanyCandidateReportQuery,
} from "@/services/api";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays, format, isWeekend } from "date-fns";
import { DateRange } from "react-date-range";

function PerformaceReport() {
  const { candidateId, companyId } = useParams();
  const [dateRange, setDateRange] = useState({
    selection: {
      startDate: addDays(new Date(), -6),
      endDate: new Date(),
      key: "selection1",
    },
  });

  function customDayContent(day) {
    let extraDot = null;
    if (isWeekend(day)) {
      extraDot = (
        <div
          style={{
            height: "5px",
            width: "5px",
            borderRadius: "100%",
            background: "orange",
            position: "absolute",
            top: 2,
            right: 2,
          }}
        />
      );
    }
    return (
      <div>
        {extraDot}
        <span>{format(day, "d")}</span>
      </div>
    );
  }

  const { data: dailyPerformaceReport } =
    useGetDailyCompanyCandidatePerformaceReportQuery({
      company_id: companyId,
      candidate_id: candidateId,
    });

  return (
    <div>
      <DateRangePicker
        onChange={(item) => setDateRange({ ...dateRange, ...item })}
        showSelectionPreview={true}
        minDate={addDays(new Date(), -30)}
        // maxDate={addDays(new Date(), 30)}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={[dateRange.selection]}
        direction="horizontal"
        dayContentRenderer={customDayContent}
        ariaLabels={{
          dateInput: {
            selection: {
              startDate: "start date input of selection 1",
              endDate: "end date input of selection 1",
            },
          },
          monthPicker: "month picker",
          yearPicker: "year picker",
          prevButton: "previous month button",
          nextButton: "next month button",
        }}
      />
    </div>
  );
}

export default PerformaceReport;
