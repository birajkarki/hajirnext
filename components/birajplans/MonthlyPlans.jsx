// components/birajplans/MonthlyPlans.jsx
import React from "react";
import PricingCard from "./PricingCard";

const MonthlyPlans = () => {
  const monthlyPlans = [
    {
      title: "Basic Monthly",
      price: "$10/month",
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
      title: "Standard Monthly",
      price: "$20/month",
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
      title: "Premium Monthly",
      price: "$30/month",
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
      {monthlyPlans.map((plan, index) => (
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

export default MonthlyPlans;
