import { useEffect, useState } from "react";
import { Avatar, Button, Typography } from "@mui/material";
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
  const { data: getProfileQuery, isLoading, refetch } = useGetProfileQuery();
  // refetch();

  // Execute the query only if the token exists
  useEffect(() => {
    if (authUser && authUser.token) {
      // No need to call getProfileQuery() as it's not a function
      // Simply use getProfileQuery directly
      console.log(getProfileQuery); // Check if the data is fetched successfully
    }
  }, [authUser]);

  const profileData = getProfileQuery?.data;

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
