import React, { useEffect, useState } from "react";
import { Avatar, Button, Typography, Skeleton, Stack } from "@mui/material";
import styled from "styled-components";
import ProfileDialog from "./ProfileDialog";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePhoneNumberMutation,
} from "@/services/api";
import { useAuth } from "@/context/AuthContext";

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
  const { authUser } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const {
    data: getProfileQuery,
    isLoading,
    error,
    refetch,
  } = useGetProfileQuery();

  const profileData = getProfileQuery?.data;

  useEffect(() => {
    if (authUser && authUser.token) {
      console.log(getProfileQuery);
      refetch();
    }
  }, [authUser]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <ProfileContainer
        sx={{
          width: "210px",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          cursor: "pointer",
          justifyContent: "center",
          textAlign: "center",
        }}
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
      </ProfileContainer>
      {openDialog && (
        <ProfileDialog
          open={openDialog}
          handleClose={handleCloseDialog}
          profileData={profileData}
        />
      )}
    </>
  );
};

export default TestProfileCard;
