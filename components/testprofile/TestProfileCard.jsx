import React, { useState } from "react";
import { Avatar, Button, Typography } from "@mui/material";
import styled from "styled-components";
import ProfileDialog from "./ProfileDialog";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePhoneNumberMutation,
} from "@/services/api";

const ProfileContainer = styled(Button)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  cursor: "pointer",
});

const TestProfileCard = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { data: getProfileQuery, isLoading } = useGetProfileQuery();
  const profileData = getProfileQuery?.data;

  console.log("profilename new", profileData?.name);
  console.log("profilename new", profileData?.profile_image);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProfileContainer onClick={handleOpenDialog}>
        <label htmlFor="photo">
          <Avatar
            src={profileData?.profile_image || "/default-avatar.png"}
            sx={{
              width: 100,
              height: 100,
              cursor: "pointer", // Add cursor pointer for clickable effect
            }}
            alt="Profile Avatar"
          />
        </label>
        <Typography
          variant="h6"
          align="center"
          sx={{
            fontWeight: "semi-bold",
            mt: 1,
            color: "black",
            textTransform: "none",
          }}
        >
          {profileData?.name}
        </Typography>
        <Typography
          align="center"
          color="textSecondary"
          sx={{ textTransform: "none" }}
        >
          {profileData?.email}
        </Typography>
      </ProfileContainer>

      <ProfileDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        profileData={profileData}
      />
    </div>
  );
};

export default TestProfileCard;