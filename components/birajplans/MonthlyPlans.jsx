import React from 'react'
import PricingCard from './PricingCard'
import { useGetAllPackagesQuery } from '@/services/api'

const MonthlyPlans = () => {
  const { data: apiResponse, error, isLoading } = useGetAllPackagesQuery()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  const monthlyPlans = apiResponse?.data?.packages
  if (!Array.isArray(monthlyPlans)) {
    return <div>Error: Invalid data format or missing packages array</div>
  }
  // Sort the monthlyPlans based on their IDs in ascending order
  const sortedMonthlyPlans = monthlyPlans.slice().sort((a, b) => a.id - b.id)
  console.log(sortedMonthlyPlans)

  return (
    <>
      {sortedMonthlyPlans.map((plan, index) => (
        <PricingCard
          key={index}
          id={plan.id}
          title={plan.title}
          price={plan.price}
          features={plan.feature}
          index={index}
          buttonText={`Upgrade to ${plan.title}`}
        />
      ))}
    </>
  )
}
export default MonthlyPlans
