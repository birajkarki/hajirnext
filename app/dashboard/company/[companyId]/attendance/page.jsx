"use client";
import AttendaceTableLayout from "@/components/attendance/AttendaceTableLayout";
import HeaderAttendance from "@/components/attendance/HeaderAttendance";
import React from "react";

const Page = () => {
  return (
    <>
      <HeaderAttendance />

      <AttendaceTableLayout />
    </>
  );
};

export default Page;
