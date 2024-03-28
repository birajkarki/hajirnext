// DashboardLayout.jsx
'use client'
// DashboardLayout.jsx
import * as React from 'react'
import { useState } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MainSidebar from '@/components/Sidebar/MainSidebar'
import SplitScreen from '@/components/Sidebar/SplitScreen'
import Header from '@/components/Sidebar/Header/Header'

const DRAWER_WIDTH = 250

const LayoutContainer = styled('div')(({ theme }) => ({
  display: 'flex',
}))

const Content = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: DRAWER_WIDTH,
  marginRight: DRAWER_WIDTH,
  marginTop: '90px', //
  transition: theme.transitions.create(['margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}))

export default function DashboardLayout({ children }) {
  const [isSplitScreenOpen, setIsSplitScreenOpen] = useState(false)

  const toggleSplitScreen = () => {
    setIsSplitScreenOpen(!isSplitScreenOpen)
  }

  return (
    <LayoutContainer>
      <MainSidebar drawerWidth={DRAWER_WIDTH} />
      <Header isSplitScreenOpen={isSplitScreenOpen} />{' '}
      {/* Pass the isSplitScreenOpen prop here */}
      <Content>
        <button onClick={toggleSplitScreen}>Toggle Split Screen</button>
        {children}
      </Content>
      <Box sx={{ display: isSplitScreenOpen ? 'block' : 'none' }}>
        <SplitScreen drawerWidth={DRAWER_WIDTH} isOpen={isSplitScreenOpen} />
      </Box>
    </LayoutContainer>
  )
}
