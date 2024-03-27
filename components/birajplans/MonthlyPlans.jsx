
import React from "react";
import PricingCard from "./PricingCard";
import { useGetAllPackagesQuery } from "@/services/api";

const MonthlyPlans = () => {


  const { data: apiResponse, error, isLoading } = useGetAllPackagesQuery(); // Fetch monthly plans data

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Check if the API response contains the expected structure and if packages is an array
//   const monthlyPlans = apiResponse?.data?.packages;
//   if (!Array.isArray(monthlyPlans)) {
//     return <div>Error: Invalid data format or missing packages array</div>;
//   }
//   return (
//     <>
//       {monthlyPlans.map((plan, index) => (
//         <PricingCard
//           key={index}
//           id={plan.id}
//           title={plan.title}
//           price={plan.price}
//           features={plan.feature}
//           planType="monthly"
//           index={index === 0 ? 2 : index === 2 ? 0 : index}
      
//           buttonText={`Upgrade to ${plan.title}`}
//      isSpecial={index < 2}
//         />
//       ))}
//     </>
//   );
// };

// export default MonthlyPlans;
const monthlyPlans = apiResponse?.data?.packages;
if (!Array.isArray(monthlyPlans)) {
  return <div>Error: Invalid data format or missing packages array</div>;
}

// Sort the monthlyPlans based on their IDs in ascending order
const sortedMonthlyPlans = monthlyPlans.slice().sort((a, b) => a.id - b.id);

return (
  <>
    {sortedMonthlyPlans.map((plan, index) => (
      <PricingCard
        key={index}
        id={plan.id}
        title={plan.title}
        price={plan.price}
        features={plan.feature}
        planType="monthly"
        index={index}
        buttonText={`Upgrade to ${plan.title}`}
        isSpecial={index < 2}
      />
    ))}
  </>
)
    }
export default MonthlyPlans;