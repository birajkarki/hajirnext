// // authenticationApi.js
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { setToken } from "@/redux/authSlice";

// export const authenticationApi = createApi({
//   reducerPath: "authenticationApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_API_URL,
//     prepareHeaders: (headers, { getState }) => {
//       const token = getState().auth.token;
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     // Register Employee
//     registerEmployee: builder.mutation({
//       query: (employeeData) => ({
//         url: "employer/register",
//         method: "POST",
//         body: employeeData,
//       }),
//     }),

//     // Verify Employee OTP
//     verifyEmployeeOpt: builder.mutation({
//       query: (otpData) => ({
//         url: "employer/verify-opt",
//         method: "POST",
//         body: otpData,
//       }),
//       async onQueryStarted({ dispatch }, { getState, context }) {
//         const { token, user } = getState().auth;
//         try {
//           const result = await context.fetchJson({
//             method: "POST",
//             body: JSON.stringify(otpData),
//           });
//           if (result.status === "success") {
//             dispatch(setToken({ token: token, user: user }));
//           }
//           return { data: result.data };
//         } catch (error) {
//           throw error;
//         }
//       },
//     }),

//     // Update Profile
//     updateProfile: builder.mutation({
//       query: (profileData) => ({
//         url: "employer/profile-update",
//         method: "POST",
//         body: profileData,
//         formData: true,
//       }),
//     }),

//     // Get Profile
//     getProfile: builder.query({
//       query: () => "employer/get-profile",
//     }),

//     // Change Phone Number
//     changePhoneNumber: builder.mutation({
//       query: (new_phone) => ({
//         url: "employer/change-phone",
//         method: "POST",
//         body: new_phone,
//       }),
//     }),

//     // Verify Phone Number OTP
//     verifyPhoneNumberOTP: builder.mutation({
//       query: ({ otp, new_phone }) => ({
//         url: "employer/phone-change-verify-otp",
//         method: "POST",
//         body: { otp, new_phone },
//       }),
//       async onQueryStarted({ dispatch }, { getState, context }) {
//         const { token, user } = getState().auth;
//         try {
//           const result = await context.fetchJson({
//             method: "POST",
//             body: JSON.stringify({ otp, new_phone }),
//           });
//           if (result.status === "success") {
//             dispatch(setToken({ token: token, user: user }));
//           }
//           return { data: result.data };
//         } catch (error) {
//           throw error;
//         }
//       },
//     }),
//   }),
// });

// export const {
//   useRegisterEmployeeMutation,
//   useVerifyEmployeeOptMutation,
//   useUpdateProfileMutation,
//   useGetProfileQuery,
//   useChangePhoneNumberMutation,
//   useVerifyPhoneNumberOTPMutation,
// } = authenticationApi;
