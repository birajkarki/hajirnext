"use client";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import Button from "@mui/material/Button";
import * as yup from "yup";
import { TextField, useMediaQuery } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import ScrollDialog from "@/components/Auth/ScrollDialog";
import { postRequest } from "@/services/ApiRequestService";

const validationSchema = yup.object({
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^(98|97|96)\d{8}$/, {
      message:
        "Phone number must start with 98, 97, or 96 and be exactly 10 digits",
      excludeEmptyString: true,
    })
    .test(
      "is-ten-digits",
      "Phone number must be exactly 10 digits",
      (val) => val.length === 10
    )
    .test(
      "starts-with-979698",
      "Phone number must start with 98, 97, or 96",
      (val) => {
        const firstTwoDigits = val.substring(0, 2);
        return ["98", "97", "96"].includes(firstTwoDigits);
      }
    ),
});

export default function Signin() {
  const router = useRouter();
  const [termsChecked, setTermsChecked] = useState(false);

  useEffect(() => {
    const token =
      typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("token"));
    const user =
      typeof window !== "undefined" && JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      router.push("/dashboard");
    }
  }, [router]);
  const images = [
    {
      src: "/auth/otp1111.png",
      width: 175,
      height: 180,
      alt: "First Image",

      content: (
        <>
          <p>
            Login with employer will help you to <br />
            track your all the staff activities from your <br />
            smart devices.
          </p>
        </>
      ),
    },
    {
      src: "/auth/otp2222.png",
      width: 175,
      height: 180,
      alt: "Second Image",
      content: (
        <>
          <p>
            You can manage your employee <br />
            attendance, salary,overtime and payroll <br />
            anywhere in the world.
          </p>
        </>
      ),
    },
    {
      src: "/auth/otp3333.png",
      width: 175,
      height: 180,
      alt: "Third Image",
      content: (
        <>
          <p>
            Live attendance, quick reports,
            <br />
            allowance & overtime expense calculation <br /> and export reports
            in csv/excel/pdf.
          </p>
        </>
      ),
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const [open, setOpen] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // Use media query hook
  const isScreenSmall = useMediaQuery("(max-width:900px)");

  const formik = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (buttonClicked) {
          return;
        }

        setButtonClicked(true);
        const apiResponse = await postRequest(`/employer/register`, values);

        if (!apiResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await apiResponse.json();

        if (data.status === "success") {
          alert(`Successfully Registered.  \n Your OTP is: ${data.data.otp}`);
          router.push(`/otp?phone=${values.phone}&otp=${data.data.otp}`);
        } else {
          console.error("Registration failed. Message:", data.message);
        }
      } catch (error) {
        console.error("Error during API request:", error.message);
      }
    },
  });
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        objectFit: "cover",
        overflow: "hidden",
      }}
    >
      
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6} >
          {!isScreenSmall && (
            <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <Image
              src="/side-img.png"
              alt="login image"
           
             fill
             style={{objectFit:"cover"}}

              priority
                sizes="(max-width: 600px) 100vw, 900px"
            />
             </div>
          )}
        </Grid>
        <Grid item xs={12} md={6} sx={{ marginBottom: "80px", marginTop:"60px" }}  >
          <Paper
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
              typography: "body2",
              padding: "16px",
              textAlign: "center",
              color: (theme) => theme.palette.text.secondary,
              display: "flex",
              flexDirection: "column",
              // justifyContent: "center",
              alignItems: "center",
              height: "100%",
              boxShadow: "none",
              elevation: 0,
              background: "transparent",
            }}
          >
            {/* <Box sx={{ marginTop:'60px', paddingRight:'192px', paddingLeft:'212px', height:'519px'}}> */}
          
              <Image src="/hajir-logo.png" width={140} height={50} alt="Logo" />
    

            <h1
              style={{
                color: "rgba(34, 64, 139, 0.87)",
                fontWeight: "500",
                fontSize: "18px",
                marginBottom:'15px',
          height:'20px',
          width:'336px'
              }}
            >
              Smart attendance system
            </h1>

            <div
              style={{
                marginBottom: "0px",
                fontWeight: "500",
                width:'336px',
       fontSize:'15px',
                height:'75px'
              }}
            >
              {images[selectedImageIndex].content}
            </div>

            <Image
              src={images[selectedImageIndex].src}
              width={images[selectedImageIndex].width}
              height={images[selectedImageIndex].height}
              alt={images[selectedImageIndex].alt}
              style={{ marginTop: "15px" }}
              priority
            />
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              noValidate
              autoComplete="off"
              onSubmit={formik.handleSubmit}
              // style={{ width: "250px" }}
            >
              <TextField
                fullWidth
                id="phone"
                label="Phone Number"
                placeholder="+977 9841234567"
                name="phone"
                type="tel"
                onChange={formik.handleChange}
                value={formik.values.phone}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                style={{
                  marginTop: "26px",
                  width: "300px",
                  marginLeft: "6px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
              <Button
                variant="contained"
                type="submit"
                disabled={!termsChecked || buttonClicked}
                style={{ width: "300px", marginLeft: "10px", marginTop: "15px" , marginBottom:'19px'}}
              >
                Get OTP
              </Button>
              {/* </Box> */}
            </Box>
{/* <Box sx={{marginBottom:'83px'}}> */}
<div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                whiteSpace: "pre-line",
             
                color: "black",
             justifyContent:'center'
             
              }}
            >
              <p style={{marginBottom:'10px', marginTop:'19px'}}>We will send OTP on this mobile number </p>
      
              <label style={{display:'flex', justifyContent:'center'}}>
                <input
                  type="checkbox"
                  checked={termsChecked}
                  onChange={(e) => setTermsChecked(e.target.checked)}
                />{" "}
                I have read and agree{" "}
                <span
                  style={{ textDecoration: "underline", cursor: "pointer" , marginLeft:'8px'}}
                  onClick={handleOpen}
                >
                  Terms & Services
                </span>
              </label>
            
            </div>
            </div>
{/* </Box> */}
            <ScrollDialog open={open} onClose={handleClose} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}