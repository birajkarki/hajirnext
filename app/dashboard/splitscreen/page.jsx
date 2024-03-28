'use client'

import React, { useState } from 'react'
import { Drawer, Button, TextField, Grid } from '@mui/material'

const Page = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        style={{ flexShrink: 0, width: '20%' }} // Set the drawer width
      >
        <div style={{ width: '100%', padding: '20px' }}>
          <h2>Drawer Content</h2>
          <TextField label="Name" variant="outlined" fullWidth />
          <TextField
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            style={{ marginTop: '10px' }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '20px' }}
          >
            Create
          </Button>
          <Button onClick={toggleDrawer} style={{ marginTop: '10px' }}>
            Close
          </Button>
        </div>
      </Drawer>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button onClick={toggleDrawer}>Open Drawer</Button>
          </Grid>
          <Grid item xs={12}>
            <div>
              <h2>Main Content</h2>
              <p>This content should be pushed when the drawer is opened.</p>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Page
