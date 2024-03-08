import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken } from "@/redux/authSlice"; // Importing setToken action from authSlice

export const companyManagementApi = createApi({
  reducerPath: "companyManagementApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token; // Retrieve token from Redux state
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // createcompany
    createCompany: builder.mutation({
      query: (companyData) => ({
        url: "employer/company/store",
        method: "POST",
        body: companyData,
        formData: true,
      }),
    }),
    //update company
    updateCompany: builder.mutation({
      query: ({ company_id, companyData }) => ({
        url: `employer/company/update/${company_id}`,
        method: "POST",
        body: companyData,
        formData: true,
      }),
    }),
    // deletecompany
    deleteCompany: builder.mutation({
      query: (company_id) => ({
        url: `employer/company/destroy/${company_id}`,
        method: "POST",
      }),
    }),
    // update company status
    updateCompanyStatus: builder.mutation({
      query: ({ company_id, status }) => ({
        url: `employer/company/status/${company_id}`,
        method: "POST",
        body: { status },
      }),
    }),
    // All companies
    getEmployerCompanies: builder.query({
      query: () => "employer/company/employercompanies",
    }),
    // Get Active Company
    getActiveCompany: builder.query({
      query: () => "employer/company/active",
    }),
    // Get Inactive Company
    getInactiveCompany: builder.query({
      query: () => "employer/company/inactive",
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
  }),
});

export const {
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
  useUpdateCompanyStatusMutation,
  useGetEmployerCompaniesQuery,
  useGetActiveCompanyQuery,
  useGetInactiveCompanyQuery,
  useGenerateQrCodeQuery,
  useUpdateCustomHolidayMutation,
} = companyManagementApi;
