"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useAuth } from "@/context/AuthContext";
import { useFormik } from "formik";
import { useSearchParams, useRouter } from "next/navigation";
import { useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/authSlice";
import { useVerifyEmployerOptMutation } from "@/services/api";

const Otp = () => {
  const router = useRouter();
  const [verifyEmployer, { isLoading, isError }] =
    useVerifyEmployerOptMutation();
  const dispatch = useDispatch();

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

        // Redirect to dashboard if user is already logged in
        router.push("/dashboard");
      } catch (error) {
        console.error("Error parsing token or user:", error);
      }
    }
  }, [router]);

  const query = useSearchParams();
  const otpnumber = query.get("otp");
  const phone = query.get("phone");

  // const { setIsLoggedIn } = useAuth();
  const [otp, setOtp] = useState(
    otpnumber?.toString().split("") || ["", "", "", ""]
  );
  const [loading, setLoading] = useState(false);
  const isScreenSmall = useMediaQuery("(max-width:900px)");

  const formik = useFormik({
    initialValues: {
      phone: phone || "",
      otp: otpnumber || "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const { data } = await verifyEmployer(values); // Using useRegisterEmployeeMutation hook

        if (data.status === "success") {
          console.log("OTP verification successful");
          localStorage.setItem("token", JSON.stringify(data.data.token));
          localStorage.setItem("user", JSON.stringify(data.data.user));
          // setIsLoggedIn(true);

          // Dispatching setToken action along with user data
          dispatch(
            setCredentials({ token: data.data.token, user: data.data.user })
          );

          router.push("/dashboard");
        } else {
          console.error("OTP verification failed. Message:", data.message);
          alert("Wrong OTP. Please enter the correct OTP.");
        }
      } catch (error) {
        console.error("Error during OTP verification:", error.message);
        alert("An error occurred during OTP verification. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    enableReinitialize: true,
  });

  if (otpnumber === "" || otpnumber === null) {
    console.error(
      "OTP is missing or empty. Please request a new OTP and verify."
    );
  }

  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    if (value !== "") {
      const nextIndex = index + 1;
      if (nextIndex < newOtp.length) {
        document.getElementById(`otp-input-${nextIndex}`).focus();
      } else {
        const inputBox = document.getElementById(`otp-input-${index}`);
        const inputLength = inputBox.value.length;
        inputBox.setSelectionRange(inputLength, inputLength);
      }
    } else {
      const prevIndex = index - 1;
      if (prevIndex >= 0) {
        document.getElementById(`otp-input-${prevIndex}`).focus();
      }
    }

    setOtp(newOtp);
    let otpString = newOtp ? newOtp.join("") : "";
    formik.setFieldValue("otp", otpString);
  };

  // timer

  const [timer, setTimer] = useState(30); // 3 minutes in seconds
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    let interval;

    if (timerActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerActive]);

  const handleResendClick = () => {
    // Handle resend logic here (use client)
    console.log("Resend button clicked");

    // Reset the timer
    setTimer(30);
    // Activate the timer
    setTimerActive(true);
  };

  const timerMinutes = Math.floor(timer / 60);
  const timerSeconds = timer % 60;
  const isMobile = useMediaQuery("(max-width:900px)");

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
        <Grid item xs={6}>
          {!isMobile && (
            <Image
              src="/auth/login.png"
              alt="login image"
              width={isMobile ? 300 : 900}
              height={900}
              style={{ display: "block", maxWidth: "100%", height: "auto" }}
              priority
            />
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            style={{
              typography: "body2",
              padding: "16px",
              textAlign: "center",
              color: "gray",
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
            <div style={{ marginTop: "50px" }}>
              <Image
                src="/hajir-logo.png"
                width={140}
                height={50}
                alt="Logo"
                priority
              />
            </div>
            <div>
              <h1
                style={{
                  color: "rgba(34, 64, 139, 0.87)",
                  fontWeight: "500",
                  fontSize: "18px",
                  marginTop: "7px",
                }}
              >
                Smart attendance system
              </h1>

              <h1
                style={{
                  fontWeight: "400",
                  fontSize: "14px",
                  whiteSpace: "pre-line",
                  marginTop: "5px",
                }}
              >
                Enter the OTP code that has been sent to your mobile number{" "}
              </h1>
            </div>
            <Image
              src="/auth/maskotp.png"
              width={175}
              height={170}
              style={{ marginTop: "20px", marginBottom: "60px" }}
              alt="otp"
              priority
            />

            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1 },
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
              noValidate
              autoComplete="off"
              onSubmit={formik.handleSubmit}
            >
              <div
                sx={{
                  marginX: "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* OTP input boxes */}
                <div className="flex space-x-2">
                  {otp.map((digit, index) => (
                    <TextField
                      key={index}
                      id={`otp-input-${index}`}
                      type="text"
                      inputProps={{ maxLength: 1 }}
                      value={digit}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      variant="outlined"
                      size="small"
                      sx={{
                        width: "50px",
                        height: "40px",
                        textAlign: "center",
                        justifyContent: "center",
                        marginRight: "20px",
                        alignItems: "center",
                        paddingLeft: "8px",
                        marginTop: "-20px",
                      }}
                    />
                  ))}
                </div>

                <br />

                {/* Verify button */}

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: "10px", width: "260px" }}
                >
                  {loading ? (
                    <Image
                      src="/loading/loading.svg"
                      alt="Loading"
                      width={35}
                      height={35}
                    />
                  ) : (
                    "Verify"
                  )}
                </Button>
              </div>
            </Box>

            <div
              style={{
                whiteSpace: "pre-line",
                marginTop: "8px",
                display: "flex",
                alignItems: "center",
                marginTop: "2px",
              }}
            >
              <p style={{ color: timer === 0 ? "red" : "inherit" }}>
                Do not receive OTP? Resend OTP in{" "}
                <span style={{ color: "red" }}>
                  {timerMinutes}:
                  {timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
                </span>
              </p>
              {timer === 0 && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleResendClick}
                  style={{
                    marginLeft: "8px",
                    borderColor: "red",
                    color: "red",
                  }}
                >
                  Resend
                </Button>
              )}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Otp;
