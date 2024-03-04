import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import GetAppIcon from "@mui/icons-material/GetApp";
import ShareIcon from "@mui/icons-material/Share";

const HeaderPlanBiraj = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Box>
        <Typography variant="h4">My Plans</Typography>
        <Typography variant="subtitle1" color="black">
          Home MyPlans
        </Typography>
      </Box>
    </Box>
  );
};

export default HeaderPlanBiraj;
