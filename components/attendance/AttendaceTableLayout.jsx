import React, { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TablePagination,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Avatar,
} from '@mui/material'
import { useGetAttendanceReportTodayQuery } from '@/services/api'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import SouthEastIcon from '@mui/icons-material/SouthEast'
const AttendanceTable = () => {
  const { companyId } = useParams()

  const [filteredData, setFilteredData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const { data: attendanceData, isLoading: isLoading2 } =
    useGetAttendanceReportTodayQuery(companyId)
  console.log(attendanceData)
  useEffect(() => {
    if (
      attendanceData &&
      attendanceData.data &&
      attendanceData.data.candidates
    ) {
      setFilteredData(attendanceData.data.candidates)
    }
  }, [attendanceData])

  const handleSearchTextChange = (event) => {
    const text = event.target.value.toLowerCase()
    setSearchText(text)
    filterData(text, selectedDepartment)
  }

  const handleDepartmentChange = (event) => {
    const department = event.target.value
    setSelectedDepartment(department)
    filterData(searchText, department)
  }

  const filterData = (searchText, department) => {
    if (
      !attendanceData ||
      !attendanceData.data ||
      !attendanceData.data.candidates
    )
      return

    let filtered = attendanceData.data.candidates
    if (searchText) {
      filtered = filtered.filter((candidate) =>
        candidate.name.toLowerCase().includes(searchText)
      )
    }
    if (department) {
      filtered = filtered.filter((candidate) =>
        candidate.departments.some((dept) => dept.name === department)
      )
    }
    setFilteredData(filtered)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 1000,
        mt: 3,
        marginTop: '80px',
      }}
    >
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Search by Employee Name"
          variant="outlined"
          size="small"
          onChange={handleSearchTextChange}
          value={searchText}
        />
        <FormControl variant="outlined" size="small" sx={{ ml: 2, width: 200 }}>
          <InputLabel>Department</InputLabel>
          <Select
            label="Department"
            autoWidth={false}
            value={selectedDepartment}
            onChange={handleDepartmentChange}
          >
            <MenuItem value="">All Departments</MenuItem>
            {/* Add options dynamically based on backend response */}
            {attendanceData &&
              attendanceData.data &&
              attendanceData.data.departments.map((dept) => (
                <MenuItem key={dept.id} value={dept.name}>
                  {dept.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <br />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Candidate ID</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Clock In</TableCell>
              <TableCell>Clock Out</TableCell>
              <TableCell>Status</TableCell>

              {/* <TableCell>Departments</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell>{candidate.candidate_id}</TableCell>
                  <TableCell>
                    <Link
                      href={`/dashboard/company/${companyId}/attendance/${candidate.candidate_id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          src={candidate.image || '/default-avatar.png'}
                          sx={{
                            width: 50,
                            height: 50,
                            cursor: 'pointer',
                            marginRight: '10px',
                          }}
                          alt="Profile Avatar"
                        />
                        <div
                          style={{ display: 'flex', flexDirection: 'column' }}
                        >
                          <span style={{ fontSize: '16px' }}>
                            {candidate.name}
                          </span>
                          <span style={{ fontSize: '14px', color: '#555' }}>
                            {candidate.role}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    {candidate.start_time}{' '}
                    <span style={{ color: 'green', fontSize: '16px' }}>
                      {' '}
                      <SouthEastIcon sx={{ fontSize: 'medium' }} />
                    </span>
                  </TableCell>
                  <TableCell>
                    {candidate.end_time}{' '}
                    <span style={{ color: 'red', fontSize: '16px' }}>
                      <ArrowOutwardIcon sx={{ fontSize: 'medium' }} />
                    </span>
                  </TableCell>
                  <TableCell>
                    {candidate.status === 'Absent' && (
                      <span
                        style={{
                          backgroundColor: 'rgba(255, 0, 0, 0.1)',
                          color: 'darkred',
                          padding: '3px 6px',
                          borderRadius: '4px',
                        }}
                      >
                        {candidate.status}
                      </span>
                    )}
                    {candidate.status === 'Late' && (
                      <span
                        style={{
                          backgroundColor: 'rgba(255, 165, 0, 0.1)',
                          color: 'darkorange',
                          padding: '3px 6px',
                          borderRadius: '4px',
                        }}
                      >
                        {candidate.status}
                      </span>
                    )}
                    {candidate.status === 'Leave' && (
                      <span
                        style={{
                          backgroundColor: 'rgba(255, 0, 0, 0.1)',
                          color: 'darkred',
                          padding: '3px 6px',
                          borderRadius: '4px',
                        }}
                      >
                        {candidate.status}
                      </span>
                    )}
                    {candidate.status === 'Waiting' && (
                      <span
                        style={{
                          backgroundColor: 'rgba(169, 169, 169, 0.1)',
                          color: 'darkgray',
                          padding: '3px 6px',
                          borderRadius: '4px',
                        }}
                      >
                        {candidate.status}
                      </span>
                    )}
                    {candidate.status === 'Present' && (
                      <span
                        style={{
                          backgroundColor: 'rgba(0, 128, 0, 0.1)',
                          color: 'darkgreen',
                          padding: '3px 6px',
                          borderRadius: '4px',
                        }}
                      >
                        {candidate.status}
                      </span>
                    )}
                  </TableCell>

                  {/* <TableCell>
            {candidate.departments.map((department) => (
              <div key={department.id}>{department.name}</div>
            ))}
          </TableCell> */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      ;
    </Box>
  )
}

export default AttendanceTable
