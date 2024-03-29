"use client";
import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ProfileCard from "./ProfileCard";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutButton from "./LogoutButton";
import BusinessIcon from "@mui/icons-material/Business";
import Link from "next/link";
import ExpandLess from "@mui/icons-material/ExpandLess";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { useParams } from "next/navigation";
import { Button } from "@mui/material";
import TestProfileCard from "../testprofile/TestProfileCard";
import { getRequest } from "@/services/ApiRequestService";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import { useRouter } from "next/navigation";

const CompanySidebar = () => {
  const router = useRouter();
  const [openSettings, setOpenSettings] = useState(false);
  const [openReport, setOpenReport] = useState(false); // Add this line
  const [activeLink, setActiveLink] = useState("");
  const { companyId } = useParams();

  const onLogoutClick = async (e) => {
    const logout = await getRequest(`/employer/logout`);
    if (logout) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      return router.push("/login");
    }
  };
  const handleLinkClick = (text) => {
    setActiveLink(text);
  };
  const LINKS = [
    {
      text: "Home",
      href: "/dashboard/",
      icon: HomeIcon,
    },
    {
      text: "Employee",
      href: `/dashboard/company/${companyId}/`,
      icon: "/employee.svg",
    },
    {
      text: "Attendance",
      href: `/dashboard/company/${companyId}/attendance/`,
      icon: "/attendance.svg",
    },
    {
      text: "Report",
      icon: "/registerr.svg",
      sublinks: [
        {
          text: "Activity Report",
          href: `/dashboard/company/${companyId}/activityreport/`,
          icon: "/tabler.svg",
        },
        {
          text: "Payments Reports",
          href: `/dashboard/company/${companyId}/paymentreport/`,
          icon: "/moneyy.svg",
        },
      ],
    },
    {
      text: "Setting",
      icon: SettingsIcon,
      sublinks: [
        {
          text: "Messenger Inbox",
          href: `/dashboard/company/${companyId}/messaginginbox/`,

          icon: "/Message.svg ",
        },

        {
          text: "Missing Attendance",
          href: `/dashboard/company/${companyId}/missingattendance/`,

          icon: "/missingattendance.svg",
        },
        {
          text: "Missing Leave",
          href: `/dashboard/company/${companyId}/missingleave/`,

          icon: "/missingLeave.svg",
        },
        {
          text: "Add Approval",
          href: `/dashboard/company/${companyId}/addapproval/`,

          icon: "/AddApprover.svg",
        },
        {
          text: "Update Holiday",
          href: `/dashboard/company/${companyId}/updateholiday/`,

          icon: "/updateHolidays.svg",
        },
      ],
    },
  ];

  const handleSettingsClick = () => {
    setOpenSettings(!openSettings);
  };

  const handleReportClick = () => {
    setOpenReport(!openReport);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
 
   width: 250,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Divider />
      <TestProfileCard />
      <List sx={{ flexGrow: 1 }}>
        {LINKS.map(({ text, href, icon: Icon, sublinks }) => (
          <div key={href || text}>
            <ListItem disablePadding>
              <ListItemButton
                component={href ? Link : undefined}
                href={href}
                onClick={
                  sublinks
                    ? text === "Report"
                      ? handleReportClick
                      : handleSettingsClick
                    : () => handleLinkClick(text)
                }
                // sx={activeLink === text ? { backgroundColor: "#22408B15" } : {}}
                sx={{
                  "&:hover, &:active": {
                    backgroundColor: "#22408B15", // Change background color on hover and click
                  },
                }}
              >
                {typeof Icon === "string" ? (
                  <img src={Icon} alt={text} style={{ marginRight: "18px" }} />
                ) : (
                  <Icon style={{ marginLeft: "-3px", marginRight: "16px" }} />
                )}
                <ListItemText primary={text} />
                {sublinks &&
                  (text === "Report" ? (
                    openReport ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )
                  ) : openSettings ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  ))}
              </ListItemButton>
            </ListItem>
            {sublinks && sublinks.length > 0 && (
              <Collapse
                in={text === "Report" ? openReport : openSettings}
                timeout="auto"
                unmountOnExit
              >
                {sublinks.map(({ text, href, icon: SubIcon }) => (
                  <ListItem key={href || text} disablePadding>
                    <ListItemButton
                      component={href ? Link : undefined}
                      href={href}
                      onClick={() => handleLinkClick(text)}
                      sx={{
                      width:"100px",
                        pl: 4, 
                       
                        pr: openReport || openSettings ? 2 : 0,
                        py: 1, 
                        backgroundColor: activeLink === text ? "#22408B15" : "transparent", // Set background color based on active link
                        "&:hover": {
                          backgroundColor: "#22408B15", // Change background color on hover
                        },
                        "&:active": {
                          backgroundColor: "#22408B15", // Change background color when link is active
                        },
                      }}
                    >
                      {typeof SubIcon === "string" ? (
                        <img
                          src={SubIcon}
                          alt={text}
                          style={{ marginRight: "8px" }}
                        />
                      ) : (
                        <ListItemIcon>
                          <SubIcon />
                        </ListItemIcon>
                      )}
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </Collapse>
            )}
          </div>
        ))}
      </List>
      <Divider />

      <List>
        <LogoutButton onClick={(e) => onLogoutClick(e)} sx={{ position: "absolute",bottom: 0, left: 0}} />
      </List>
    </Drawer>
  );
};

export default CompanySidebar;
