'use client'
// Header.jsx// Header.jsx
import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import NotificationsIcon from '@mui/icons-material/Notifications'
import NotificationDialog from './Notif'
import LanguageIcon from '@mui/icons-material/Language'

const Header = ({ isSplitScreenOpen }) => {
  const [openDialog, setOpenDialog] = useState(false)

  const handleNotificationClick = () => {
    setOpenDialog(true)
  }

  const handleCloseNotification = () => {
    setOpenDialog(false)
  }

  return (
    <>
      <AppBar position="fixed" elevation={1} color="inherit">
        <Toolbar
          sx={{ justifyContent: isSplitScreenOpen ? 'center' : 'flex-end' }}
        >
          {' '}
          {/* Adjust the justifyContent property */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <MenuItem>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="black"
              >
                <Badge badgeContent={'En'} color="info">
                  <LanguageIcon />
                </Badge>
              </IconButton>
            </MenuItem>
            <MenuItem>
              <IconButton
                size="large"
                aria-label="show notifications"
                color="black"
                onClick={handleNotificationClick}
              >
                <Badge color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </MenuItem>
          </div>
        </Toolbar>
      </AppBar>
      <NotificationDialog
        open={openDialog}
        handleClose={handleCloseNotification}
      />
    </>
  )
}

export default Header
