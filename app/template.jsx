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
      typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("token"));
    const user =
      typeof window !== "undefined" && JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      dispatch(setCredentials({ token, user }));

      if (
        router.pathname === "/" ||
        router.pathname === "/otp" ||
        router.pathname === "/login"
      ) {
        router.push("/dashboard");
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
