"use client";
import React, { useCallback } from "react";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  useMediaQuery,
} from "@mui/material";

const CustomRadioGroup = ({
  name,
  value,
  options,
  onChange,
  setFieldValue,
}) => {
  const handleChange = useCallback(
    (selectedValue) => {
      setFieldValue(name, selectedValue);
    },
    [name, setFieldValue]
  );
  const isScreenSmall = useMediaQuery("(max-width:1486px)");
  const isScreenSM = useMediaQuery("(max-width:1132px)");
  return (
    <RadioGroup 
    row={true}
     name={name}
      value={value} onChange={onChange} sx={{}}>
      {options.map((option) => (
        <Box
          key={option.value}
          sx={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "16px",
            display: "flex",
          
            width: isScreenSM ? "220px" : isScreenSmall ? "170px" : "258.57px",
            height:isScreenSmall?'130px':"90px",
            alignItems: "center",
            paddingRight: "50px",
            marginBottom: "17px",
            paddingLeft: "50px",
            marginRight: "38px",
            cursor: "pointer",
            flexDirection: "column",
            transition: "background 0.3s, border 0.3s",
            // "&:hover": {
            //   backgroun",
            // },
            ...(value === option.value
              ? { background: "rgba(0, 128, 0, 0.1)", border: "1px solid #2196F3" }
              : {}),
            
          }}
          onClick={() => handleChange(option.value)}
        >
          <FormControlLabel
            value={option.value}
            control={<Radio sx={{ width: "50%", color: "transparent" }} />}
            label={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: value === option.value ? "#2196F3" : "#000",
                }}
              >
                {option.label}
              </Box>
            }
          />
          <Typography
            variant="caption"
            sx={{
              marginLeft: "8px",
              color: "#777",
              marginTop:isScreenSmall?"":"-11px"
            }}
          >
            {option.description}
          </Typography>
        </Box>
      ))}
    </RadioGroup>
  );
};

export default CustomRadioGroup;
