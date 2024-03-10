"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials, clearToken } from "@/redux/authSlice";
const Template = ({ children }) => {
  const router = useRouter();
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

        dispatch(setCredentials({ token: parsedToken, user: parsedUser }));

        if (
          router.pathname === "/" ||
          router.pathname === "/otp" ||
          router.pathname === "/login"
        ) {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error parsing token or user:", error);
        dispatch(clearToken());

        if (router.pathname !== "/login" && router.pathname !== "/otp") {
          router.replace("/login");
        }
      }
    } else {
      dispatch(clearToken());

      if (router.pathname !== "/login" && router.pathname !== "/otp") {
        router.replace("/login");
      }
    }
  }, [dispatch, router]);

  return <div>{children}</div>;
};

export default Template;
