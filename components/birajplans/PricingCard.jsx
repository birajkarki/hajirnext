import React from "react";
import { Grid, Box, Button, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const PricingCard = ({ title, price, features, planType,buttonText, index, isSpecial }) => {
  const isBasic = title.toLowerCase().includes("basic");
  const isYearly = planType === "yearly";

  const splitFeatures = (features) => {
    if (!isBasic) {
      return [features];
    }

    const middleIndex = Math.ceil(features.length / 2);
    return [features.slice(0, middleIndex), features.slice(middleIndex)];
  };

  const featureColumns = splitFeatures(features);

  const basicWidth = 4.3;
  const remainingWidth = 3.8; 

  return (
  
    <Grid item xs={12} sm={12} md={12} lg={6} xl={isBasic ? basicWidth : remainingWidth} 
ml={-6} mb={8}
    >
       
<div style={{ backgroundColor: '#3068E9', height: '84px',

 marginTop:"-5px",
paddingLeft:'15px',
paddingTop:'15px',
paddingBottom:'29px',
  borderRadius:'6px 6px 0px 0px',

  }}>
  
  <Typography variant="h5" gutterBottom style={{ whiteSpace: 'pre-line',fontSize:"18px", color: 'white', textAlign: 'left',  padding: '0px'}}>
           {title.replace('(Forever) ', '(Forever)\n')}
           {' '}
           {index === 0 && !isYearly &&<span style={{position: 'relative', top: '-0.4em', fontSize: '12px' ,color:"#FFFFFF", fontWeight:'400' }}>Current Plan</span>}
           {index === 1 && <br />} 
           {index === 1 && !isYearly && (
             <>
               <span > {price}    </span>
               <span style={{ position: 'relative', top: '-0.5em',fontSize: '12px' ,color:"#FFFFFF", fontWeight:'400' }}> Monthly  </span>
             </>
           )}
           {index === 2 && <br />} 
           {index === 2 && !isYearly && (
             <>
               <span > {price}    </span>
               <span style={{ position: 'relative', top: '-0.5em',fontSize: '12px' ,color:"#FFFFFF", fontWeight:'400'}}> Monthly  </span>
             </>

           )}
     
{isYearly && (
 <>
   {index === 0 && <span style={{position: 'relative', top: '-0.4em',  fontSize: '12px' ,color:"#FFFFFF", fontWeight:'400'}}>Current Plan</span>}
   {index !== 0 && 
   <>
   <span style={{}}>{price}</span>
   <span style={{position: 'relative', top: '-0.5em', fontSize: '12px' ,color:"#FFFFFF", fontWeight:'400'}}>
    Yearly
    </span>
    </> }
 </>
)}
         </Typography>
</div>
      <Box
        sx={{
          border: "1px solid #eee",
        borderTop:'0px',
          textAlign: "center",
          height: "100%",
    position:'relative',
    height: "470px",
        padding:"16px",

        }}
      >
        <Box mt={2} display="flex" flexDirection={isBasic ? "row" : "column"} >
          {featureColumns.map((column, index) => (
            <Box key={index} display="flex" flexDirection="column" alignItems="flex-start" flex={1}  pl={index === 1 && isBasic ? 1 : 0} ml={-1}>
              {column.map((feature, featureIndex) => (
                <Box key={featureIndex} display="flex" alignItems="center" mb={1}>
                  <CheckIcon sx={{ marginRight: 0 , color:"#008000", paddingRight:'5px', paddingLeft:'6px'  }} />
                  <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
                    {feature}
                  </Typography>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
   <div style={{display:'flex', justifyContent:'center',alignItems:'center', textAlign:'center', position:'absolute', top:'88%',   left: "50%",
            transform: "translateX(-50%)"}}>
          <Button variant="outlined" style={{ borderColor: "green", width:'303px', height:'45px', color:'black', fontWeight:'500'}}>
            {buttonText}
          </Button>
          </div>
      </Box>
    </Grid>

  );
};

export default PricingCard;

