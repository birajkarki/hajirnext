'use client'
import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import GetAppIcon from '@mui/icons-material/GetApp'
import ShareIcon from '@mui/icons-material/Share'
import { Stack } from '@mui/system'
import { experimentalStyled as styled } from '@mui/material/styles'
import { Paper } from '@mui/material'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}))
const ActivityReportHeader = () => {
  return (
    <Box
      sx={
        {
          // display: 'flex',
          // justifyContent: 'space-between',
          // alignItems: 'center',
          // padding: '16px',
          // borderBottom: '1px solid #e0e0e0',
        }
      }
    >
      <Box>
        <Typography variant="h5">Velox lab</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          velox lab private limited
        </Typography>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <IconButton color="primary" aria-label="Download PDF">
          <GetAppIcon />
        </IconButton>
        <IconButton color="primary" aria-label="Share">
          <ShareIcon />
        </IconButton>
      </Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ marginTop: '20px', marginRight: '20px ' }}
        spacing={{ xs: 1, sm: 2, md: 12 }}
      >
        <Item sx={{ backgroundColor: '#0080000D ' }}>
          <Typography sx={{ color: '#FF5050' }} variant="h6"></Typography>
          <Typography variant="body1">Attende</Typography>
        </Item>

        <Item sx={{ backgroundColor: '#FF00000D ' }}>
          <Typography sx={{ color: '#FF5050' }} variant="h6"></Typography>
          <Typography variant="body1">Present</Typography>
        </Item>

        <Item sx={{ backgroundColor: '#FFA5000D ' }}>
          <Typography sx={{ color: '#FF5050' }} variant="h6"></Typography>
          <Typography variant="body1">Late</Typography>
        </Item>
        <Item sx={{ backgroundColor: '#FFA5000D ' }}>
          <Typography sx={{ color: '#FF5050' }} variant="h6"></Typography>
          <Typography variant="body1">Absent</Typography>
        </Item>
        <Item sx={{ backgroundColor: '#FFA5000D ' }}>
          <Typography sx={{ color: '#FF5050' }} variant="h6"></Typography>
          <Typography variant="body1">Early Checkout</Typography>
        </Item>
        <Item sx={{ backgroundColor: '#FFA5000D ' }}>
          <Typography sx={{ color: '#FF5050' }} variant="h6"></Typography>
          <Typography variant="body1">Leave</Typography>
        </Item>
      </Stack>
    </Box>
  )
}

export default ActivityReportHeader
