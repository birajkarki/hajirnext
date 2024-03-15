import { useSendNotificationMutation } from "@/services/api";
import { Button, TextField, Box, Stack } from "@mui/material";
import React from "react";

const NotifyComponent = () => {
  const notifyComponent = useSendNotificationMutation();
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
  );
};

export default NotifyComponent;
