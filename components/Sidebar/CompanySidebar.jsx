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
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { useParams } from "next/navigation";
import { Button } from "@mui/material";
import TestProfileCard from "../testprofile/TestProfileCard";
import { getRequest } from "@/services/ApiRequestService";
import { useRouter } from "next/navigation";

const CompanySidebar = () => {
  const router = useRouter();

  const [openSettings, setOpenSettings] = useState(false);
  const [openReport, setOpenReport] = useState(false); // Add this line
  const { companyId } = useParams();
  const [selectedItem, setSelectedItem] = useState(null);

  const onLogoutClick = async (e) => {
    const logout = await getRequest(`/employer/logout`);
    if (logout) {
      localStorage.setItem("token", null);
      localStorage.setItem("user", null);
      return router.push("/login");
    }
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
      icon: HomeIcon,
    },
    {
      text: "Attendance",
      href: `/dashboard/company/${companyId}/attendance/`,
      icon: HomeIcon,
    },
    {
      text: "Report",
      icon: HomeIcon,
      sublinks: [
        {
          text: "Activity Report",
          href: `/dashboard/company/${companyId}/activityreport/`,
          icon: BusinessIcon,
        },
        {
          text: "Payments Reports",
          href: `/dashboard/company/${companyId}/paymentreport/`,
          icon: StarIcon,
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

          icon: BusinessIcon,
        },

        {
          text: "Missing Attendance",
          href: `/dashboard/company/${companyId}/missingattendance/`,

          icon: ChecklistIcon,
        },
        {
          text: "Missing Leave",
          href: `/dashboard/company/${companyId}/missingleave/`,

          icon: ChecklistIcon,
        },
        {
          text: "Add Approval",
          href: `/dashboard/company/${companyId}/addapproval/`,

          icon: SettingsIcon,
        },
        {
          text: "Update Holiday",
          href: `/dashboard/company/${companyId}/updateholiday/`,

          icon: SettingsIcon,
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
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          top: ["40px", "56px", "64px"],
          height: "auto",
          bottom: 0,
        },
      }}
    >
      <div style={{ marginLeft: "4px" }}>
        <TestProfileCard />
      </div>
      <List>
        {LINKS.map(({ text, href, icon: Icon, sublinks }) => (
          <div key={href || text}>
            <ListItem disablePadding>
              <ListItemButton
                component={href ? Link : undefined}
                href={href}
                onClick={() => {
                  if (sublinks) {
                    if (text === "Report") {
                      handleReportClick();
                    } else if (text === "Setting") {
                      handleSettingsClick();
                    }
                  } else {
                    setSelectedItem(href);
                  }
                }}
                style={{
                  backgroundColor:
                    selectedItem === href || router.pathname === href
                      ? "#eee"
                      : "transparent",
                }}
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
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
                      sx={{ pl: 4 }}
                    >
                      <ListItemIcon>
                        <SubIcon />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </Collapse>
            )}
          </div>
        ))}
      </List>

      <List style={{ marginTop: "220px" }}>
        <LogoutButton onClick={(e) => onLogoutClick(e)} />
      </List>
    </Drawer>
  );
};

export default CompanySidebar;
