import React, { useEffect } from 'react'
import {
  Box,
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material'
import { useGetDailyCompanyCandidatePerformaceReportQuery } from '@/services/api'
import { useParams } from 'next/navigation'
import NotifyComponent from '../tabNotificationPayment/NotifyComponent'

const DailyPerformanceReport = ({ startDateValue, startDate }) => {
  const { candidateId, companyId } = useParams()

  // Parse the startDateValue string into a Date object
  const formattedStartDate = new Date(startDateValue)

  // Format the date into 'YYYY/MM/DD' format
  const formattedDateValue = `${formattedStartDate.getFullYear()}/${
    formattedStartDate.getMonth() + 1
  }/${formattedStartDate.getDate()}`

  const { data: getDailyCompanyCandidatePerformaceReport, refetch } =
    useGetDailyCompanyCandidatePerformaceReportQuery({
      company_id: companyId,
      candidate_id: candidateId,
      today_date: formattedDateValue,
      year: formattedStartDate.getFullYear(),
    })
  console.log(getDailyCompanyCandidatePerformaceReport)
  useEffect(() => {
    refetch()
  }, [startDateValue, refetch])

  return (
    <Box>
      <h2>Daily Performance Report</h2>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Salary Calculation</TableCell>
                  <TableCell>Data</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Salary</TableCell>
                  <TableCell>
                    {
                      getDailyCompanyCandidatePerformaceReport?.data
                        .totalearning
                    }
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Overtime </TableCell>
                  <TableCell>
                    {
                      getDailyCompanyCandidatePerformaceReport?.data
                        .overtime_earning
                    }
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Allowance</TableCell>
                  <TableCell>
                    {getDailyCompanyCandidatePerformaceReport?.data.allowance}
                  </TableCell>
                </TableRow>
                {/* gross salary  */}
                <TableRow>
                  <TableCell>Gross Salary</TableCell>
                  <TableCell>{}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={6}>
          <NotifyComponent />
        </Grid>
      </Grid>
    </Box>
  )
}

export default DailyPerformanceReport
