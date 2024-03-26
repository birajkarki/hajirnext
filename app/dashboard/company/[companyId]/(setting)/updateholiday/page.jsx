"use client";
import { useState } from "react";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import SyncIcon from '@mui/icons-material/Sync';
import Image from "next/image";
import { useUpdateCustomHolidayMutation } from "@/services/api";
import { useParams } from "next/navigation"; // Assuming this is the correct import for useParams
import { useFormik } from "formik";
import Link from "next/link";

const UpdateHoliday = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // State to track upload progress
  const [updateCustomHoliday] = useUpdateCustomHolidayMutation();
  const { companyId } = useParams(); // Corrected variable name to match the parameter name in the route

  // Initialize useFormik hook
  const formik = useFormik({
    initialValues: {
      custom_holiday_file: null,
    },
    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        const formData = new FormData();
        formData.append("custom_holiday_file", values.custom_holiday_file);
        formData.append("companyId", companyId);

        const config = {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        };

    
        const { data } = await updateCustomHoliday({ company_id: companyId, formData }, config);

        console.log("Company id ", companyId); // Corrected variable name to match the parameter name in the route
        console.log("File successfully uploaded:", data);

        alert("File uploaded successfully!");
      } catch (error) {
        console.error("Error uploading holiday file:", error);
        alert("Error uploading holiday file!");
      } finally {
        setIsLoading(false);
        setUploadProgress(0); // Reset upload progress
      }
    },
  });

  // Function to handle file change
  const handleFileChange = (event) => {
    formik.setFieldValue("custom_holiday_file", event.target.files[0]);
    // formik.handleSubmit();
  };

  // Function to handle file download
  const handleDownload = (fileName) => {
    const filePath = `/${fileName}`;

    const link = document.createElement("a");
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100vh",
        padding: "10px",
        backgroundColor: "#fff",
      }}
    >
      <Typography
        sx={{
          color: "#434345",
          fontSize: "24px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "24px",
          letterSpacing: "0.25px",
        }}
      >
        Update Holiday
      </Typography>
  
      <div style={{display:"flex", flexDirection:"row", marginTop:"10px"}}>
 <Link href="/dashboard" style={{textDecoration:"none", color:"#434345"}}>
          <span style={{ fontWeight: "400", marginRight: "10px", fontSize:"16px" }}>Home</span> <span style={{marginLeft:"10px",marginRight:"10px"}}>/</span>
         </Link>
         <Link href=""  style={{textDecoration:"none",color:"#434345"}}>
          <span style={{ fontWeight: "400", marginRight: "10px" , marginLeft:"10px",fontSize:"16px"}}>Setting</span> <span style={{marginLeft:"10px",marginRight:"10px"}}>/</span>
          </Link>
          <Link href={`/dashboard/company/${companyId}/updateholiday`}  style={{textDecoration:"none", color:"gray"}}>
          <span style={{ fontWeight: "400" ,fontSize:"16px",marginLeft:"10px"}}>Update Holiday</span>
          </Link>
   
      </div>

      <div style={{ display: "flex",  }}>
        <div style={{  }}>
          <Box
            sx={{
              display: "flex",
           
              flexDirection: "column",
              marginTop: "16px",
            }}
          >
           
              <Button variant="contained" component="label"   type="file"
              
                onClick={() => handleDownload("SpecialHoliday.xls")}
                hidden
                accept=".xls,.xlsx"
                 sx={{backgroundColor:"white", color:"#22408B",
                 "&:hover": {
                  backgroundColor: "white",
            
                },
                width: "362px",
                height:"48px"
              }}>
              View current Holidays
                
                </Button>
                <span onClick={() => handleDownload("SpecialHoliday.xls")} sx={{width:"362px", fontSize:"14px", fontWeight:"500"}}>
                <Typography
                  variant="body2"
                  sx={{
                    marginTop: "8px",
                    display: "flex",
                 fontSize:"16px",
                    textDecoration:"underline",
                
                    fontWeight:"500",
                    letterSpacing:"0.15px",
                    color:"#434345CC",
                    cursor:"pointer",
                    textAlign:"center",
                  justifyContent:'space-between',
                  marginLeft:'30px',
                  marginTop:"15px"

                  }}
                >
                  Click to download sample file (.xlsx)
                </Typography>
              </span>{" "}
              <Button variant="contained" component="label"   type="file"
                onChange={handleFileChange}
                hidden
                accept=".xls,.xlsx"
                 sx={{backgroundColor:"white", color:"#22408B",
                 "&:hover": {
                  backgroundColor: "white",

                },
                width: "362px",
                height:"48px",
                marginTop:"24px"
              }}>
         Import Holidays
                  <input type="file" onChange={handleFileChange} hidden  
            
                accept=".xls,.xlsx" />
                </Button>
            {isLoading && <LinearProgress value={uploadProgress} sx={{marginTop:'10px'}} />}
            {formik.values.custom_holiday_file && (
              <Typography variant="body2" sx={{ marginTop: "8px" }}>
                Uploaded File: {formik.values.custom_holiday_file.name}
              </Typography>
            )}
        

 
          </Box>
   
<Button
            type="submit"
            variant="contained"
            // disabled={isLoading}
            onClick={formik.handleSubmit}
            color="primary"
            sx={{
              width: "250px",
              height: "50px",
              justifyContent:"center",
              fontSize:"16px",
             gap:"20px",
             marginTop:"93px"
            }}
          >
            <SyncIcon/>
            <span>Update</span>
          </Button>
     
        </div>
      </div>
    </Box>
  );
};

export default UpdateHoliday;