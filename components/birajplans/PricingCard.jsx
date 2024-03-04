// components/birajplans/PricingCard.jsx
import React from "react";
import { Grid, Box, Button, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const PricingCard = ({ title, price, features, lgWidth }) => {
  // Function to split features into two columns
  const splitFeatures = (features) => {
    const middleIndex = Math.ceil(features.length / 2);
    return [features.slice(0, middleIndex), features.slice(middleIndex)];
  };

  const [leftFeatures, rightFeatures] = splitFeatures(features);

  return (
    <Grid item xs={12} sm={6} md={4} lg={lgWidth}>
      {" "}
      {/* Adjust width based on lgWidth prop */}
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          textAlign: "center",
          padding: "20px",
          height: "100%",
        }}
      >
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {price}
        </Typography>
        <Box mt={2} display="flex" flexDirection="column">
          <Box>
            {leftFeatures.map((feature, index) => (
              <Box key={index} display="flex" alignItems="center" mb={1}>
                <CheckIcon sx={{ marginRight: 1 }} />
                <Typography variant="body2">{feature}</Typography>
              </Box>
            ))}
          </Box>
          <Box>
            {rightFeatures.map((feature, index) => (
              <Box key={index} display="flex" alignItems="center" mb={1}>
                <CheckIcon sx={{ marginRight: 1 }} />
                <Typography variant="body2">{feature}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Button variant="contained" color="primary">
          Select Plan
        </Button>
      </Box>
    </Grid>
  );
};

export default PricingCard;
