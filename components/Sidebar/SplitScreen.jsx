// SplitScreen.js
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import CreateCompany from '../company/CreateCompany'
import { finishCreating } from '@/redux/createCompanySlice'

const SplitScreen = ({ drawerWidth, isOpen }) => {
  const isCreating = useSelector((state) => {
    console.log(state) // Log the entire state object
    return state.createCompany
  })

  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(finishCreating())
  }

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={isOpen}
      sx={{
        width: drawerWidth,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f5f5f5',
      }}
    >
      <div style={{ marginLeft: '4px' }}>{/* Existing content */}</div>

      {isCreating && <CreateCompany />}

      <IconButton onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </Drawer>
  )
}

export default SplitScreen
