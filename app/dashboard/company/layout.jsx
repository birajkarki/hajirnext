import Header from '@/components/Sidebar/Header/Header'
import MainSidebar from '@/components/Sidebar/MainSidebar'
import { Box } from '@mui/material'

export const metadata = {
  title: "Hajir's ",
  description: 'A smart attadance system ',
}
const DRAWER_WIDTH = 0

export default function DashboardLayout({ children }) {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mr: `${DRAWER_WIDTH}px`,
        }}
      >
        {children}
      </Box>
    </>
  )
}
