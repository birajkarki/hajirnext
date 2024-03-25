
import React, { useState, useEffect } from "react";
import { Grid, Box, Button, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Link from "next/link";

const PricingCard = ({ id, title, price, features, planType, buttonText, index, isSpecial }) => {
  const isBasic = title.toLowerCase().includes("basic");
  const isYearly = planType === "yearly";

  const [maxContentHeight, setMaxContentHeight] = useState("auto");

  useEffect(() => {
    // Calculate the maximum content height among all boxes
    const maxHeight = Math.max(
      ...Array.from(document.getElementsByClassName("content-box")).map(
        (element) => element.offsetHeight
      )
    );
    setMaxContentHeight(`${maxHeight}px`);
  }, [features]);

  let borderColor;
  let backgroundColor;
  switch (id) {
    case 1: // Basic Plan (Green border)
      borderColor = "green";
      backgroundColor = "white";
      break;
    case 3: // Premium Plan (Yellow border)
      borderColor = "#F3D6B6";
      backgroundColor = "#FEFAF6";
      break;
    case 4: // Standard Plan (Red border)
      borderColor = "#FA6262";
      backgroundColor = "#FAF3F3";
      break;
    default:
      borderColor = "black";
  }

  return (
    <Grid item xs={12} sm={12} md={12} lg={6} xl={isBasic ? 4.3 : 4} ml={-8} mb={8}>
      <Box
        style={{
          position: "relative",
          border: `2px solid ${borderColor}`,
          backgroundColor: `${backgroundColor}`,
          borderRadius: '6px',
          overflow: 'hidden',
          height: maxContentHeight,
          transition: 'height 0.3s ease',
        }}
      >
        <div style={{
          padding: '15px',
          borderBottom: '2px solid #f5f5f5',
          height: '69px'
        }}>
          <Typography variant="h5" gutterBottom style={{ whiteSpace: 'pre-line', color: "#06038D", fontSize: "17px", fontWeight: "500", textAlign: 'left', padding: '0px' }}>
            <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              {title.replace('(Forever) ', '(Forever)\n')}
              {' '}
              {index === 0 && !isYearly && <span style={{ fontSize: '17px', fontWeight: '500', marginRight: "15px" }}>Free</span>}
            </div>
            {index === 1 && !isYearly && (
              <>
                <div style={{ display: "flex", flexDirection: "column", gap: "5px", textAlign: "right", marginRight: "5px", marginTop: "-20px" }}>
                  <span style={{}}> {price}    </span>
                  <span style={{ position: 'relative', fontSize: '12px', fontWeight: '400' }}> Monthly  </span>
                </div>
              </>
            )}
            {index === 2 && !isYearly && (
              <>
                <div style={{ display: "flex", flexDirection: "column", gap: "5px", textAlign: "right", marginRight: "5px", marginTop: "-20px" }}>
                  <span style={{}}> {price}    </span>
                  <span style={{ position: 'relative', fontSize: '12px', fontWeight: '400' }}> Monthly  </span>
                </div>
              </>
            )}
          </Typography>
        </div>
        <Box p={2} style={{ maxHeight: '100%' }} className="content-box">
   
          {features.map((feature, featureIndex) => (
            <Box key={featureIndex} display="flex" alignItems="center" mb={featureIndex === features.length - 1 ? 4 : 1}>
              <CheckIcon sx={{ marginRight: 0, color: "#008000", paddingRight: '5px', paddingLeft: '6px', alignSelf: 'flex-start' }} />
              <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", maxWidth: "100%", overflowWrap: "break-word", alignSelf: 'flex-start' }}>
                {feature}
              </Typography>
           
            </Box>
         
           
          ))}
        </Box>
        {index !== 0 && (
          <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
            <Link href={{
              pathname: "/dashboard/myplansbiraj/payment",
              query: { id, title, price }
            }}>
              <Button variant="outlined" style={{  width: '303px', height: '45px', color: 'white', fontWeight: '500', backgroundColor: `${borderColor}` }}>
                {buttonText}
              </Button>
            </Link>
          </div>
        )}
      </Box>
    </Grid>
  );
};

export default PricingCard;
