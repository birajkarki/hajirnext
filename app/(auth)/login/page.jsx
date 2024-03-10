"use client";
import React, { useState, useEffect } from "react";
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
import { useRegisterEmployerMutation } from "@/services/api";

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

  const [registerEmployer, { data, isloading }] = useRegisterEmployerMutation();
  console.log("data", data);
  useEffect(() => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    const user = typeof window !== "undefined" && localStorage.getItem("user");

    console.log("Token from localStorage:", token);
    console.log("User from localStorage:", user);

    if (token && user) {
      try {
        const parsedToken = JSON.parse(token);
        const parsedUser = JSON.parse(user);

        router.push("/dashboard");
      } catch (error) {
        console.error("Error parsing token or user:", error);
      }
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
      phone: "9808426215",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (buttonClicked) {
        return;
      }
      setButtonClicked(true);
      try {
        const response = await registerEmployer({ ...values });
        if (response.data.status === "success") {
          alert(
            `Successfully Registered. Your OTP is: ${response.data.data.otp}`
          );
          router.push(
            `/otp?phone=${values.phone}&otp=${response.data.data.otp}`
          );
        } else {
          console.error("Registration failed. Message:", response.data.message);
        }
      } catch (error) {
        console.error("Error occurred while registering:", error);
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
        <Grid item xs={12} md={6}>
          {!isScreenSmall && (
            <Image
              src="/auth/login.png"
              alt="login image"
              width={isScreenSmall ? 300 : 900}
              height={900}
              style={{ display: "block", maxWidth: "100%", height: "auto" }}
              priority
            />
          )}
        </Grid>
        <Grid item xs={12} md={6}>
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
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              boxShadow: "none",
              elevation: 0,
              background: "transparent",
            }}
          >
            <div style={{ marginTop: "50px", marginBottom: "0px" }}>
              <Image src="/hajir-logo.png" width={140} height={50} alt="Logo" />
            </div>

            <h1
              style={{
                color: "rgba(34, 64, 139, 0.87)",
                fontWeight: "500",
                fontSize: "18px",
                marginTop: "1px",
              }}
            >
              Smart attendance system
            </h1>

            <div
              style={{
                marginBottom: "0px",
                fontWeight: "500",
                marginTop: "-7px",
                paddingTop: "0px",
                paddingBottom: "0px",
                marginTop: "-6px",
              }}
            >
              {images[selectedImageIndex].content}
            </div>

            <Image
              src={images[selectedImageIndex].src}
              width={images[selectedImageIndex].width}
              height={images[selectedImageIndex].height}
              alt={images[selectedImageIndex].alt}
              style={{ marginTop: "0px" }}
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
              style={{ width: "250px" }}
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
                style={{ width: "300px", marginLeft: "10px", marginTop: "2px" }}
              >
                Get OTP
              </Button>
            </Box>

            <p
              style={{
                whiteSpace: "pre-line",
                marginTop: "-6px",
                color: "black",
                marginBottom: "20px",
                marginTop: "20px",
              }}
            >
              <label>
                <input
                  type="checkbox"
                  checked={termsChecked}
                  onChange={(e) => setTermsChecked(e.target.checked)}
                />{" "}
                I have read and agree{" "}
                <span
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={handleOpen}
                >
                  Terms & Services
                </span>
              </label>
            </p>

            <ScrollDialog open={open} onClose={handleClose} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
