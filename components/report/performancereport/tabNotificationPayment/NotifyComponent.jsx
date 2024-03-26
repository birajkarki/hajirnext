import {
  useSendNotificationMutation,
  useSendPaymentMutation,
} from '@/services/api'
import { Button, TextField, Box, Stack } from '@mui/material'
import { useParams } from 'next/navigation'
import React from 'react'

const NotifyComponent = () => {
  const { candidateId, companyId } = useParams()
  const { data: notifyComponent } = useSendNotificationMutation({
    company_id: companyId,
    candidate_id: candidateId,
  })
  const { data: sendPayment } = useSendPaymentMutation({
    company_id: companyId,
    candidate_id: candidateId,
  })

  console.log(notifyComponent)
  console.log(sendPayment)
  return (
    <Box>
      <Stack>
        <TextField
          label="Send Message to Candidate"
          multiline
          rows={4}
          variant="outlined"
        />
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </Stack>
    </Box>
  )
}

export default NotifyComponent
