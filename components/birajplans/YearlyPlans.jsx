// // components/birajplans/YearlyPlans.jsx
// import React from "react";
// import PricingCard from "./PricingCard";

// const YearlyPlans = () => {
//   const yearlyPlans = [
//     {
//       title: "Basic Yearly",
//       price: "$100/year",
//       features: [
//         "Track live attendance",
//         "QR / All network setup",
//         "Overtime setup",
//         "Office timing setup",
//         "Add candidates/company",
//         "Custom leave setup",
//         "Custom holiday setup",
//         "Add missing attend/leave",
//         "Allowance setup",
//         "Setup weekly day off",
//         "Setup allow late attend",
//         "Salary calculation",
//         "Payroll management",
//         "Add approver",
//         "Performance reports",
//         "Activities reports",
//         "Payment reports",
//         "Attendance reports",
//         "Can export reports",
//         "Many features +",
//         "Add 1 company",
//         "Add 5 employee",
//       ],
//       buttonText: "Get Started",
//     },
//     {
//       title: "Standard Yearly",
//       price: "$200/year",
//       features: [
//         "Everything from free plan+",
//         "Add 3 companies",
//         "Add 33 employee",

//       ],
//       buttonText: "Upgrade to Standard",

//     },
//     {
//       title: "Premium Yearly",
//       price: "$300/year",
//       features: [
//         "Everything from free plan+",
//         "Add 9 companies",
//         "Add 99 employee",

//       ],
//       buttonText: "Upgrade to Premium",
//     },
//   ];
//   const buttonTexts = yearlyPlans.map(plan => plan.buttonText);

//   return (
//     <>
//       {yearlyPlans.map((plan, index) => (
//         <PricingCard
//           key={index}
//           title={plan.title}
//           price={plan.price}
//           features={plan.features}
//           planType="yearly"
//           buttonText={buttonTexts[index]}
//         />
//       ))}
//     </>
//   );
// };

// export default YearlyPlans;
// components/birajplans/YearlyPlans.jsx
// import React from "react";
// import PricingCard from "./PricingCard";

// const YearlyPlans = () => {
//   const yearlyPlans = [
//     {
//       title: "Basic (Forever) Free- ",
// price: "$100/year",
//     features: [
//       "Track live attendance",
//       "QR / All network setup",
//       "Overtime setup",
//       "Office timing setup",
//       "Add candidates/company",
//       "Custom leave setup",
//       "Custom holiday setup",
//       "Add missing attend/leave",
//       "Allowance setup",
//       "Setup weekly day off",
//       "Setup allow late attend",
//       "Salary calculation",
//       "Payroll management",
//       "Add approver",
//       "Performance reports",
//       "Activities reports",
//       "Payment reports",
//       "Attendance reports",
//       "Can export reports",
//       "Many features +",
//       "Add 1 company",
//       "Add 5 employee",
//     ],
//     buttonText: "Get Started",
//   },
//   {
//     title: "Standard(Recommended)",
//     price: "2400/- ",
//     features: [
//       "Everything from free plan+",
//       "Add 3 companies",
//       "Add 33 employee"
//     ],
//     buttonText: "Upgrade to Standard",

//   },
//   {
//     title: "Premium (Enterprise)",
//     price: "6000/- ",
//     features: [
//       "Everything from free plan+",
//       "Add 3 companies",
//       "Add 33 employee"
//     ],
//     buttonText: "Upgrade to Premium",
//   },
// ];
// const buttonTexts = yearlyPlans.map(plan => plan.buttonText);

//   return (
//     <>
//       {yearlyPlans.map((plan, index) => (
//         <PricingCard
//           key={index}
//           title={plan.title}
//           price={plan.price}
//           features={plan.features}
//           planType="yearly"
//           index={index}
//           buttonText={buttonTexts[index]}
//           isSpecial={index < 2}
//         />
//       ))}
//     </>
//   );
// };

// export default YearlyPlans;
