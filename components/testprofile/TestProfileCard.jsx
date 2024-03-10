import React, { useEffect, useState } from "react";
import { Avatar, Button, Typography, Skeleton, Stack } from "@mui/material";
import styled from "styled-components";
import ProfileDialog from "./ProfileDialog";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePhoneNumberMutation,
} from "@/services/api";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/authSlice"; // Import the selector for current user

const ProfileContainer = styled(Button)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  cursor: "pointer",
  justifyContent: "center",
  textAlign: "center",
});

const TestProfileCard = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [openDialog, setOpenDialog] = useState(false);
  const { data: getProfileQuery, isLoading, error } = useGetProfileQuery();

  const profileData = getProfileQuery?.data;

  useEffect(() => {
    if (currentUser && currentUser.token) {
      console.log(getProfileQuery);
    }
  }, [currentUser, getProfileQuery]); // Include getProfileQuery in the dependency array

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <ProfileContainer
      sx={{ width: "210px", marginTop: "20px" }}
      onClick={handleOpenDialog}
    >
      {isLoading ? (
        <Stack spacing={1}>
          <Skeleton
            variant="circular"
            sx={{
              width: 100,
              height: 100,
              cursor: "pointer",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Stack>
      ) : (
        <>
          <label htmlFor="photo">
            <Avatar
              src={profileData?.profile_image || "/default-avatar.png"}
              sx={{
                width: 100,
                height: 100,
                cursor: "pointer",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
              alt="Profile Avatar"
            />
          </label>
          <Typography
            variant="h6"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "200px",
              fontSize: "16px",
              color: "black",
              textTransform: "none",
            }}
          >
            {profileData?.name || "Name not available"}
          </Typography>
          <Typography
            sx={{ fontSize: "14px", color: "black", textTransform: "none" }}
          >
            {profileData?.email || "Email not available"}
          </Typography>
        </>
      )}
      <ProfileDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        profileData={profileData}
      />
    </ProfileContainer>
  );
};

export default TestProfileCard;
