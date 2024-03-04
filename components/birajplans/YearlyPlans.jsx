// components/birajplans/YearlyPlans.jsx
import React from "react";
import PricingCard from "./PricingCard";

const YearlyPlans = () => {
  const yearlyPlans = [
    {
      title: "Basic Yearly",
      price: "$100/year",
      features: [
        "Track live attendance",
        "QR / All network setup",
        "Overtime setup",
        "Office timing setup",
        "Add candidates/company",
        "Custom leave setup",
        "Custom holiday setup",
        "Add missing attend/leave",
        "Allowance setup",
        "Setup weekly day off",
        "Setup allow late attend",
        "Salary calculation",
        "Payroll management",
        "Add approver",
        "Performance reports",
        "Activities reports",
        "Payment reports",
        "Attendance reports",
        "Can export reports",
        "Many features +",
        "Add 1 company",
        "Add 5 employee",
      ],
    },
    {
      title: "Standard Yearly",
      price: "$200/year",
      features: [
        "Track live attendance",
        "QR / All network setup",
        "Overtime setup",
        "Office timing setup",
        "Add candidates/company",
        "Custom leave setup",
        "Custom holiday setup",
        "Add missing attend/leave",
        "Allowance setup",
        "Setup weekly day off",
        "Setup allow late attend",
        "Salary calculation",
        "Payroll management",
        "Add approver",
        "Performance reports",
        "Activities reports",
        "Payment reports",
        "Attendance reports",
        "Can export reports",
        "Many features +",
        "Add 1 company",
        "Add 5 employee",
      ],
    },
    {
      title: "Premium Yearly",
      price: "$300/year",
      features: [
        "Track live attendance",
        "QR / All network setup",
        "Overtime setup",
        "Office timing setup",
        "Add candidates/company",
        "Custom leave setup",
        "Custom holiday setup",
        "Add missing attend/leave",
        "Allowance setup",
        "Setup weekly day off",
        "Setup allow late attend",
        "Salary calculation",
        "Payroll management",
        "Add approver",
        "Performance reports",
        "Activities reports",
        "Payment reports",
        "Attendance reports",
        "Can export reports",
        "Many features +",
        "Add 1 company",
        "Add 5 employee",
      ],
    },
  ];

  return (
    <>
      {yearlyPlans.map((plan, index) => (
        <PricingCard
          key={index}
          title={plan.title}
          price={plan.price}
          features={plan.features}
        />
      ))}
    </>
  );
};

export default YearlyPlans;
