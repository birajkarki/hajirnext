import React, { useEffect, useMemo } from 'react'
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useGetWeeklyCompanyCandidatePerformaceReportQuery } from '@/services/api'
import { useParams } from 'next/navigation'
import NotifyComponent from '../tabNotificationPayment/NotifyComponent'

const WeeklyPerformanceReport = ({ startDateValue, endDateValue }) => {
  const { candidateId, companyId } = useParams()

  const formattedDates = useMemo(() => {
    // Format start date and end date
    const formattedStartDate = new Date(startDateValue)
    const formattedEndDate = new Date(endDateValue)
    // Format the date into 'YYYY/MM/DD' format
    const formattedStartDateValue = `${formattedStartDate.getFullYear()}/${
      formattedStartDate.getMonth() + 1
    }/${formattedStartDate.getDate()}`
    const formattedEndDateValue = `${formattedEndDate.getFullYear()}/${
      formattedEndDate.getMonth() + 1
    }/${formattedEndDate.getDate()}`

    return {
      formattedStartDateValue,
      formattedEndDateValue,
    }
  }, [startDateValue, endDateValue])

  const { data: getweeklyCompanyCandidatePerformanceReport, refetch } =
    useGetWeeklyCompanyCandidatePerformaceReportQuery({
      candidate_id: candidateId,
      company_id: companyId,
      from_date: formattedDates.formattedStartDateValue, // Use formatted start date
      to_date: formattedDates.formattedEndDateValue, // Use formatted end date
    })

  useEffect(() => {
    refetch()
  }, [formattedDates, refetch])

  console.log(getweeklyCompanyCandidatePerformanceReport)

  return (
    <Box>
      <h2>Weekly Performance Report</h2>
      <Grid container spacing={3}>
        {/* Left side with table */}
        <Grid item xs={6}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Salary</TableCell>
                  <TableCell>Overtime</TableCell>
                  <TableCell>Allowance</TableCell>
                  <TableCell>Total Salary</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    {getweeklyCompanyCandidatePerformanceReport?.data.salary}
                  </TableCell>
                  <TableCell>
                    {getweeklyCompanyCandidatePerformanceReport?.data.overtime}
                  </TableCell>
                  <TableCell>
                    {getweeklyCompanyCandidatePerformanceReport?.data.allowance}
                  </TableCell>
                  <TableCell>
                    {
                      getweeklyCompanyCandidatePerformanceReport?.data
                        .total_salary
                    }
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}>Total Amount</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Right side with message box and submit button */}
        <Grid item xs={6}>
          <NotifyComponent />
        </Grid>
      </Grid>
    </Box>
  )
}

export default WeeklyPerformanceReport
