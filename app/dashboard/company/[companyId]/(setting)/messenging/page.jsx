// messaging/page.jsx
import React from "react";
import { Typography } from "@mui/material";
import Messaging from "@/components/messaging/Messaging";

const MessagingPage = () => {
  return (
    <div>
      <div>
        <span style={{ fontWeight: "500", fontSize: "28px" }}>
          Message Inbox
        </span>
        <div
          style={{
            display: "flex",
            fontWeight: "200",
            flexDirection: "row",
            fontSize: "20px",
            marginTop: "-20px",
            color: "gray",
          }}
        >
          <p style={{ fontWeight: "200", marginRight: "10px" }}>Home</p> <span style={{marginLeft:"10px"}}>/</span>
          <p style={{ fontWeight: "200", marginRight: "10px" }}>Setting</p> <span style={{marginLeft:"10px"}}>/</span>
          <p style={{ fontWeight: "200" }}>Message</p>
        </div>
      </div>
      <Typography
        style={{ marginBottom: "30px", marginTop: "20px", fontWeight: "500" }}
      >
        Messages
      </Typography>
      <Messaging style={{ marginBottom: "10px" }} />
    </div>
  );
};

export default MessagingPage;
