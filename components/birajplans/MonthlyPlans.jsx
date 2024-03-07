// components/birajplans/MonthlyPlans.jsx
import React from "react";
import PricingCard from "./PricingCard";

const MonthlyPlans = () => {
  const monthlyPlans = [
    {
      title: "Basic (Forever) Free- ",
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
      buttonText: "Get Started",
    },
    {
      title: "Standard(Recommended)",
      price: "200/-",
      features: [
"Everything from free plan+",
"Add 3 companies",
"Add 33 employee"
      ],
      buttonText: "Upgrade to Standard",

    },
    {
      title: "Premium (Enterprise)",
      price: "500/-",
      features: [
        "Everything from free plan+",
        "Add 3 companies",
        "Add 33 employee"
      ],
      buttonText: "Upgrade to Premium",
    },
  ];
  const buttonTexts = monthlyPlans.map(plan => plan.buttonText);

  return (
    <>
      {monthlyPlans.map((plan, index) => (
        <PricingCard
          key={index}
          title={plan.title}
          price={plan.price}
          features={plan.features}
          planType="monthly"
          index={index} 
          buttonText={buttonTexts[index]}
          isSpecial={index < 2}
        />
      ))}
    </>
  );
};

export default MonthlyPlans;
