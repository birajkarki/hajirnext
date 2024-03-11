import React from "react";

const YearlyPerformanceReport = ({ startDate, endDate }) => {
  // Fetch and display yearly performance data based on startDate and endDate
  return (
    <div>
      <h2>Yearly Performance Report</h2>
      <p>
        Displaying data from {startDate.getFullYear()} to{" "}
        {endDate.getFullYear()}
      </p>
      {/* Add your performance data here */}
    </div>
  );
};

export default YearlyPerformanceReport;
