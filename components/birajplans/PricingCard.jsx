

import React from "react";
import { Grid, Box, Button, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Link from "next/link";

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
  const remainingWidth = 4; 
  let borderColor;
  switch (index) {
    case 0:
      borderColor = "green";
      break;
    case 1:
      borderColor = "pink";
      break;
    case 2:
      borderColor = "yellow";
      break;
    default:
      borderColor = "black";
  }
  return (
  
    <Grid item xs={12} sm={12} md={12} lg={6} xl={isBasic ? basicWidth : remainingWidth} 
ml={-8} mb={8}
    >
      
       
<div style={{  height: '84px',
  border: `2px solid ${borderColor}`,
  borderBottom:'2px solid #f5f5f5',
  borderBottomWidth: '60%',
 marginTop:"-5px",
paddingLeft:'15px',
paddingTop:'15px',
paddingBottom:'29px',
  borderRadius:'6px 6px 0px 0px',

  }}>
  
  <Typography variant="h5" gutterBottom style={{ whiteSpace: 'pre-line',color:"#06038D",fontSize:"17px", fontWeight:"500", textAlign: 'left',  padding: '0px'}}>
           <div style={{display:"flex", justifyContent:'space-between'}}>
           {title.replace('(Forever) ', '(Forever)\n')}
           {' '}
           {index === 0 && !isYearly &&<span style={{ fontSize: '17px' , fontWeight:'500', marginRight:"15px" }}>Free</span>}
           </div>
       
           {index === 1 && !isYearly && (
             <>
              
               <div style={{display:"flex", flexDirection:"column", gap:"5px", textAlign:"right", marginRight:"5px", marginTop:"-20px"}}>
               <span  style={{}}> {price}    </span>
               <span style={{ position: 'relative',fontSize: '12px' , fontWeight:'400'}}> Monthly  </span>
           
               </div>
             </>
           )}
     
           {index === 2 && !isYearly && (
             <>
               <div style={{display:"flex", flexDirection:"column", gap:"5px", textAlign:"right", marginRight:"5px", marginTop:"-20px"}}>
               <span  style={{}}> {price}    </span>
               <span style={{ position: 'relative',fontSize: '12px' , fontWeight:'400'}}> Monthly  </span>
           
               </div>
             </>

           )}
     
{/* {isYearly && (
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
)} */}
         </Typography>
</div>
      <Box
        sx={{
    
          border: `2px solid ${borderColor}`,
        borderTop:'0px',
          textAlign: "center",
          height: "100%",
    position:'relative',
    height: "470px",
        padding:"16px",
        borderRadius:'0px 0px 6px 6px',
        
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
        {index !== 0 && (
   <div style={{display:'flex', justifyContent:'center',alignItems:'center', textAlign:'center', position:'absolute', top:'88%',   left: "50%",
            transform: "translateX(-50%)"}}>

          <Button variant="outlined" style={{ borderColor: "green", width:'303px', height:'45px', color:'black', fontWeight:'500'}}>
            {buttonText}
          </Button>
       
          </div>
 )}
          
      </Box>
    </Grid>

  );
};

export default PricingCard;
