import { Box, Container, Grid } from '@mui/material'
import MonthlyPlans from './MonthlyPlans'

export function BirajPlanTab() {
  return (
    <Container>
      <Box mt={3}>
        <Grid container spacing={3} justifyContent="space-around">
          <MonthlyPlans />
        </Grid>
      </Box>
    </Container>
  )
}
