// messaging/page.jsx
"use client"
import React, { useState } from "react";
import { TextField, Typography } from "@mui/material";
import Messaging from "@/components/messaging/Messaging";
import Link from "next/link";
import { useParams } from "next/navigation";
const MessagingPage = () => {
  const { companyId } = useParams();
  const [searchText, setSearchText] = useState("");

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div>
      <div>
        <span style={{ fontWeight: "500", fontSize: "24px" }}>
          Message Inbox
        </span>
        <div
          style={{
            display: "flex",
            fontWeight: "200",
            flexDirection: "row",
            fontSize: "20px",
            marginTop: "3px",
           
          }}
        >
 <Link href="/dashboard" style={{textDecoration:"none", color:"#434345"}}>
          <span style={{ fontWeight: "400", marginRight: "10px", fontSize:"16px" }}>Home</span> <span style={{marginLeft:"10px",marginRight:"10px"}}>/</span>
         </Link>
         <Link href=""  style={{textDecoration:"none",color:"#434345"}}>
          <span style={{ fontWeight: "400", marginRight: "10px" , marginLeft:"10px",fontSize:"16px"}}>Setting</span> <span style={{marginLeft:"10px",marginRight:"10px"}}>/</span>
          </Link>
          <Link href={`/dashboard/company/${companyId}/messaginginbox`}  style={{textDecoration:"none", color:"gray"}}>
          <span style={{ fontWeight: "400" ,fontSize:"16px",marginLeft:"10px"}}>Message Box</span>
          </Link>
        </div>
      </div>
      <TextField
        label="search message"
        variant="outlined"
        size="small"
        onChange={handleSearchTextChange}
        value={searchText}
      />{" "}
      <Typography
        style={{ marginBottom: "30px", marginTop: "20px", fontWeight: "500" }}
      >
        Messages
      </Typography>
      <Messaging searchText={searchText} style={{ marginBottom: "10px" }} />
    </div>
  );
};

export default MessagingPage;
