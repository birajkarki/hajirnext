// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      const newHeaders = new Headers(headers);
      const token =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("token"))
          : null;
      newHeaders.set("Authorization", `Bearer ${token}`);
      // newHeaders.set("Content-Type", "application/json");
      return newHeaders;
    },
  }),
  endpoints: (builder) => ({
    //******************AUTH ***********************

    // Employee Registration
    registerEmployee: builder.mutation({
      query: (employeeData) => ({
        url: "employer/register",
        method: "POST",
        body: employeeData,
      }),
    }),

    // Verify Employee OTP
    verifyEmployeeOpt: builder.mutation({
      query: (otpData) => ({
        url: "employer/verify-opt",
        method: "POST",
        body: otpData,
      }),
    }),

    // Profile Update
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: "employer/profile-update",
        method: "POST",
        body: profileData,
        formData: true,
      }),
    }),

    // Get Profile
    getProfile: builder.query({
      query: () => "employer/get-profile",
    }),

    // ***************change number********************

    // getOtp to change Phone number
    getOtpChangeNumber: builder.mutation({
      query: (new_phone) => ({
        url: "employer/change-phone",
        method: "POST",
        body: new_phone,
      }),
    }),

    // /employer/phone-change-verify-otp
    verifyOtpChangeNumber: builder.mutation({
      query: ({ otp, new_phone }) => ({
        url: "employer/phone-change-verify-otp",
        method: "POST",
        body: { otp, new_phone },
      }),
    }),
    //****************** Company ***********************
    // createcompany
    createCompany: builder.mutation({
      query: (companyData) => ({
        url: "employer/company/store",
        method: "POST",
        body: companyData,
        formData: true,
      }),
      invalidatesTags: ["Companies"], // Add invalidation tag
    }),
    //update company
    updateCompany: builder.mutation({
      query: ({ company_id, companyData }) => ({
        url: `employer/company/update/${company_id}`,
        method: "POST",
        body: companyData,
        formData: true,
      }),
      invalidatesTags: (result, error, args) => [
        { type: "Company", id: args.company_id },
      ], // Add invalidation tag
    }),
    // deletecompany
    deleteCompany: builder.mutation({
      query: (company_id) => ({
        url: `employer/company/destroy/${company_id}`,
        method: "POST",
      }),
      invalidatesTags: ["Companies"], // Add invalidation tag
    }),

    // update company status
    updateCompanyStatus: builder.mutation({
      query: ({ company_id, status }) => ({
        url: `employer/company/status/${company_id}`,
        method: "POST",
        body: { status },
      }),
      invalidatesTags: (result, error, args) => [
        { type: "Company", id: args.company_id },
      ], // Add invalidation tag
    }),
    // All companies
    getEmployerCompanies: builder.query({
      query: () => "employer/company/employercompanies",
      providesTags: ["Companies"], // Add tag for caching
    }),

    // Get Active Company
    getActiveCompany: builder.query({
      query: () => "employer/company/active",
      providesTags: ["Companies"], // Add tag for caching
    }),

    // Get Inactive Company
    getInactiveCompany: builder.query({
      query: () => "employer/company/inactive",
      providesTags: ["Companies"], // Add tag for caching
    }),

    // Get Candidates for a company by company_id
    getCandidates: builder.query({
      query: (companyId) => `/employer/candidate/get-candidates/${companyId}`,
      providesTags: (result, error, companyId) => [
        { type: "Company", id: companyId },
      ],
    }),

    // Create Candidate for a company by company_id
    createCandidate: builder.mutation({
      query: ({ candidateData, companyId }) => ({
        url: `employer/candidate/store/${companyId}`,
        method: "POST",
        body: candidateData,
      }),
    }),

    // Invite Candidate for a company by company_id
    inviteCandidate: builder.mutation({
      query: ({ candidate_id, status, companyId }) => ({
        url: `/employer/${companyId}/invitation/store`,
        method: "POST",
        body: { candidate_id, status },
      }),
    }),
    // get candidate all details
    getCandidateDetail: builder.query({
      query: ({ company_id, candidate_id }) =>
        `employer/candidate/get-candidate/${company_id}/${candidate_id}`,
    }),
    // deleteCandidate
    deleteCandidate: builder.query({
      query: ({ companyId, candidate_id }) => ({
        url: `/employer/candidate/destroy/${companyId}/${candidate_id}`,
        method: "GET",
      }),
    }),

    // unique candidate code if company code is auto
    getCandidateCode: builder.query({
      query: ({ company_id }) => ({
        url: `/employer/company/candidate-code/${company_id}`,
        method: "GET",
      }),
    }),
    //aproval list
    getApproval: builder.query({
      query: (companyId) => `employer/approver/list/${companyId}`,
    }),
    //approval assign
    assignApproval: builder.mutation({
      query: ({ companyId, candidate_id, status }) => ({
        url: `/employer/approver/store/${companyId}/${candidate_id}`,
        method: "POST",
        body: { status },
      }),
    }),
    //approval remove
    removeApproval: builder.mutation({
      query: ({ company_id, candidate_id }) => ({
        url: `/employer/approver/destroy/${company_id}/${candidate_id}`,
        method: "POST",
      }),
    }),

    // all gov holiday prepareDataForValidation
    getGovHoliday: builder.query({
      query: () => "employer/get-government-holiday-PDF",
    }),
    // all department
    getDepartment: builder.query({
      query: () => "/employer/all-departments",
    }),
    // generate qr code

    generateQrCode: builder.query({
      query: (company_id) => ({
        url: `employer/company/generate-new-qr/${company_id}`,
      }),
    }),
    // update custom holiday
    updateCustomHoliday: builder.mutation({
      query: ({ company_id, formData }) => ({
        url: `/employer/company/update-special-holiday/${company_id}`,
        method: "POST",
        body: formData,
        formData: true,
      }),
    }),

    // ************* ATTENDACE REPORT ***************
    // candidate today report
    getAllCandidateToday: builder.query({
      query: (company_id) => ({
        url: `employer/report/today/all-candidate/${company_id}`,
      }),
    }),

    // attendance report today
    getAttendanceReportToday: builder.query({
      query: (company_id) => ({
        url: `employer/report/today/${company_id}`,
      }),
    }),

    // inactive-candidate today
    // {{v2}}/employer/report/today/inactive-candidate/95

    getInactivecandidateToday: builder.query({
      query: (company_id) => ({
        url: `employer/report/today/inactive-candidate/${company_id}`,
      }),
    }),

    // active-candidate today
    getActivecandidateToday: builder.query({
      query: (company_id) => ({
        url: `employer/report/today/active-candidate/${company_id}`,
      }),
    }),

    // ************** LEAVE message ******************

    // get company candidate leaves
    getCompanyCandidateLeaves: builder.query({
      query: (company_id) => ({
        url: `/employer/candidateLeave/all/${company_id}`,
      }),
    }),

    // get leave details

    getLeaveDetails: builder.query({
      query: ({ leave_id, company_id }) => ({
        url: `/employer/candidateLeave/detail/${company_id}/${leave_id}`,
      }),
    }),

    // leave types

    getAllLeaveTypes: builder.query({
      query: (company_id) => ({
        url: `/employer/leave-type/all/${company_id}`,
      }),
    }),
    // updateCandidiateLeave

    updateCandidiateLeave: builder.mutation({
      query: ({ leave_id, payStatus, status }) => ({
        url: `employer/candidateLeave/change-status/${leave_id}`,
        method: "POST",
        body: { status, payStatus },
      }),
    }),

    // performance report
    getDailyCompanyCandidateReport: builder.query({
      query: ({ company_id, candidate_id }) => ({
        url: `/employer/report/daily-report/${company_id}/${candidate_id}`,
      }),
    }),
    //missing attendance
    updateMissingAttendance: builder.mutation({
      query: ({ MissingAttendanceData }) => ({
        url: `employer/candidate/missing-attendance-submit`,
        method: "POST",
        body: MissingAttendanceData,
      }),
    }),
    // missing leave

    updateMissingLeave: builder.mutation({
      query: ({ MissingLeaveData }) => ({
        url: `/employer/candidate/missing-leave-submit`,
        method: "POST",
        body: MissingLeaveData,
      }),
    }),

    // api performace report
    // <<v2>>/employer/report/daily-report/95/31
    // i want to pass parameters also today_date
    // <<v2>>/employer/report/daily-report/95/31?today_date=2022-10-10
    // daily report
    getDailyCompanyCandidatePerformaceReport: builder.query({
      query: ({ company_id, candidate_id, today_date, year }) => ({
        url: `/employer/report/daily-report/${company_id}/${candidate_id}`,
        params: { today_date , year}, // Pass start and end as query parameters
      }),
    }),
    // weekly report
    getWeeklyCompanyCandidatePerformaceReport: builder.query({
      query: ({ company_id, candidate_id, from_date, to_date }) => ({
        url: `/employer/report/weekly-report/${company_id}/${candidate_id}`,
        params: { from_date, to_date },
      }), 
    }),
    // monthly report
    getMonthlyCompanyCandidatePerformaceReport: builder.query({
      query: ({ company_id, candidate }) => ({
        url: `/employer/report/monthly-report/${company_id}/${candidate_id}`,
      }),
    }),
    // yearly report
    getYearlyCompanyCandidatePerformaceReport: builder.query({
      query: ({ company_id, candidate_id, year }) => ({
        url: `/employer/report/yearly-report/${company_id}/${candidate_id}`,
        params: { year },
      }),
    }),
    // send payment
    sendPayment: builder.mutation({
      query: ({ company_id, candidate_id }) => ({
        url: `/employer/report/payment-submit/${company_id}/${candidate_id}`,
        method: "POST",
      }),
    }),
    // send notification
    sendNotification: builder.mutation({
      query: ({ company_id, candidate_id }) => ({
        url: `/employer/notification-send/${company_id}/${candidate_id}`,
        method: "POST",
      }),
    }),
    getAllNotifications: builder.query({
      query: () => ({
        url: "/notification/all",
        method:"GET"
      }),
    }),
    getAllPackages: builder.query({
      query: () => ({
        url: `/employer/package/all`,
        method: "GET",
      }),
    }),
  }),
});


export const {
  useGetDataQuery,
  useRegisterEmployeeMutation,
  useVerifyEmployeeOptMutation,
  useUpdateProfileMutation,
  useGetOtpChangeNumberMutation,
  useVerifyOtpChangeNumberMutation,
  useGetProfileQuery,
  useDeleteCandidateQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
  useGetCandidatesQuery,
  useInviteCandidateMutation,
  useCreateCandidateMutation,
  useUpdateCompanyStatusMutation,
  useGetCandidateCodeQuery,
  useGetActiveCompanyQuery,
  useGetInactiveCompanyQuery,
  useGetEmployerCompaniesQuery,
  useGetApprovalQuery,
  useAssignApprovalMutation,
  useRemoveApprovalMutation,
  useGetGovHolidayQuery,
  useGetDepartmentQuery,
  useGenerateQrCodeQuery,
  useUpdateCustomHolidayMutation,
  useGetAllCandidateTodayQuery,
  useGetAttendanceReportTodayQuery,
  useGetInactivecandidateTodayQuery,
  useGetActivecandidateTodayQuery,
  useGetCompanyCandidateLeavesQuery,
  useGetLeaveDetailsQuery,
  useUpdateCandidiateLeaveMutation,
  useGetDailyCompanyCandidateReportQuery,
  useUpdateMissingAttendanceMutation,
  useUpdateMissingLeaveMutation,
  useGetAllLeaveTypesQuery,
  useChangePhoneNumberMutation,
  useGetCandidateDetailQuery,
  useGetDailyCompanyCandidatePerformaceReportQuery,
  useGetWeeklyCompanyCandidatePerformaceReportQuery,
  useGetMonthlyCompanyCandidatePerformaceReportQuery,
  useGetYearlyCompanyCandidatePerformaceReportQuery,
  useSendPaymentMutation,
  useSendNotificationMutation,
  useGetAllNotificationsQuery,
  useGetAllPackagesQuery
} = api;
