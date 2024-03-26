"use client";
import React, { useState } from "react";
import MessageBox from "./MessageBox";
import Image from "next/image";
import Mailsent from "@/public/messaging/Mailsent.png";
import { useMediaQuery } from "@mui/material";
import FullMessage from "./FullMessage";
import { useParams } from "next/navigation";
import { useGetCompanyCandidateLeavesQuery } from "@/services/api";
import { formatTimestamp } from "@/utils/FormatTimestamp";
import attached1 from "@/public/messaging/attached1.png";

const Messaging = ({ searchText }) => {
  const { companyId } = useParams();
  const { data: companyCandidateLeaves, isLoading: isLoading } =
    useGetCompanyCandidateLeavesQuery(companyId);

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messageBoxScrollPosition, setMessageBoxScrollPosition] = useState(0);
  const isScreenSm = useMediaQuery("(max-width:1255px)");
  const isScreenExtraSmall = useMediaQuery("(max-width:950px)");

  const handleMessageBoxClick = (message) => {
    setSelectedMessage(message);
  };

  const handleMessageBoxScroll = (e) => {
    setMessageBoxScrollPosition(e.target.scrollTop);
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          flex: 1,
          maxHeight: "80vh",
          overflowY: "auto",
          marginRight: "20px",
        }}
        onScroll={handleMessageBoxScroll}
      >
        {companyCandidateLeaves?.data?.candidates.map((msg, index) => (
          <MessageBox
            key={index}
            img={msg.profile_image || "attached1"}
            name={msg.name}
            time_ago={msg.created_at}
            timeAgo={formatTimestamp(msg.created_at)}
            // reason={msg.leave_type.title}
            reason={msg.leave_type ? msg.leave_type.title : "Unknown"}

            // message={msg.leave_type.desc || "No description"}
            message={msg.leave_type ? msg.leave_type.desc : "Unknown"}

            status={msg.status}
            onClick={() => handleMessageBoxClick(msg)}
            searchText={searchText}
          />
        ))}
      </div>

      <div style={{ flex: "1", width: isScreenSm ? "50%" : "650px" }}>
        {selectedMessage ? (
          <FullMessage
         
            message={selectedMessage ? selectedMessage.message : ""}
name={selectedMessage ? selectedMessage.name : ""}
img={selectedMessage ? selectedMessage.profile_image : ""}
status={selectedMessage ? selectedMessage.status : ""}
start_date={selectedMessage ? selectedMessage.start_date : ""}
end_date={selectedMessage ? selectedMessage.end_date : ""}
leave_id={selectedMessage ? selectedMessage.leave_id : ""}

          />
        ) : isScreenExtraSmall ? null : (
          <Image
            src={Mailsent}
            alt="Default"
            height={700}
            layout="responsive"
            style={{ marginTop: "-80px" }}
          />
        )}
      </div>
    </div>
  );
};

export default Messaging;
