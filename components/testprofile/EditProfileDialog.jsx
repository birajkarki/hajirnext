import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import {
  // useChangePhoneNumberMutation,
  useGetOtpChangeNumberMutation,
  useUpdateProfileMutation,
} from "@/services/api";
import LoopIcon from "@mui/icons-material/Loop";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";

const EditProfileDialog = ({ open, handleClose, profileData }) => {
  const [updateProfile] = useUpdateProfileMutation();
  // const [changePhoneNumber] = useChangePhoneNumberMutation();
  const [changePhoneMode, setChangePhoneMode] = React.useState(false);
  const handleCloseDialog = () => {
    handleClose();
  };
  const formikEdit = useFormik({
    initialValues: {
      name: profileData?.name || "",
      email: profileData?.email || "",
      title: profileData?.title || "Mr",
      dob: profileData?.dob || "",
      marital_status: profileData?.marital_status || "Married",
      uploadfile: profileData?.profile_image || null,
    },
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("title", values.title);
        formData.append("dob", values.dob);
        formData.append("marital_status", values.marital_status);
        formData.append("uploadfile", values.uploadfile);

        await updateProfile(formData);

        if (changePhoneMode) {
          const { data } = await getOtpChangeNumber({
            new_phone: values.new_phone,
          });
          setOtpValue(data);
          router.push(`/otp?phone=${values.phone}&otp=${data.data.otp}`);

          localStorage.removeItem("token");

          alert(`OTP sent successfully: ${data.data.otp}`);
        } else {
          alert("Profile updated successfully!");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Error updating profile. Please try again.");
      }
    },
  });

  const handleChangePhoneNumber = () => {
    setChangePhoneMode(!changePhoneMode);
  };

  const handlePhotoChange = (event) => {
    formikEdit.setFieldValue("uploadfile", event.target.files[0]);
  };
  const isScreenSmall = useMediaQuery("(max-width:1024px)");
  const isScreenExtraSmall = useMediaQuery("(max-width:732px)");
  const isScreenSmallest = useMediaQuery("(max-width:539px)");

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
     
      <DialogTitle sx={{ textAlign: "center" }}>Edit Profile</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleCloseDialog}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent>
        <form onSubmit={formikEdit.handleSubmit} encType="multipart/form-data">
          <input
            id="photo"
            name="uploadfile"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handlePhotoChange}
          />
          <label htmlFor="photo">
          <div style={{ display:'flex',justifyContent:'center'}}>
            <Avatar
              src={
                formikEdit.values.uploadfile instanceof File
                  ? URL.createObjectURL(formikEdit.values.uploadfile)
                  : profileData?.profile_image || ""
              }
              sx={{
                width: 105,
                height: 105,
                // marginLeft: "380px",
     
                cursor: "pointer",
                marginBottom:'20px'
              }}
              alt="Profile Avatar"
            />
            </div>
          </label>
          <Image
        src="/imageUpload.png"
        alt="Upload Image"
       
        width={28}
        height={22}
     
        onClick={() => document.getElementById('photo').click()}
        style={{
          position: "absolute",
          top: changePhoneMode ? "29.8%" :"32%",
          left:isScreenExtraSmall?"56%": " 53.8%",
          transform: "translate(-50%, -50%)",
          zIndex: 8,
          position: "absolute",
    
        }}
      />
         <div style={{marginTop:'-20px'}}>
         <span>Personal details</span>
         </div>
          <FormControl style={{width: isScreenExtraSmall ? "80px" : "120px", marginBottom: "20px" }}>
            <Select
              id="title"
              name="title"
              variant="outlined"
              value={formikEdit.values.title}
              onChange={formikEdit.handleChange}
              sx={{
                "& .MuiSelect-icon": {
                  color: "rgb(0, 0, 139)",
                },
                marginTop: "5px",
              }}
            >
              <MenuItem value="Mr">Mr</MenuItem>
              <MenuItem value="Miss">Miss</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            value={formikEdit.values.name}
            onChange={formikEdit.handleChange}
            sx={{
              width: isScreenExtraSmall ? "110px" : isScreenSmall ? "230px" : "310px",
              marginLeft: "20px",
              marginBottom: "20px",
              marginTop: "5px",
            }}
          />
          {isScreenSmallest && <br />} 
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            value={formikEdit.values.email}
            onChange={formikEdit.handleChange}
            sx={{
              marginTop: "5px",
              width: isScreenExtraSmall ? "195px" : isScreenSmall ? "230px" : "310px",
          
            marginLeft: isScreenSmallest ? "3px" :"20px",
              marginBottom: "20px",
            }}
          />
         {isScreenSmallest && <br />} 
          <TextField
            id="dob"
            name="dob"
            label="Date of birth"
            variant="outlined"
            type="date"
            value={formikEdit.values.dob}
            onChange={formikEdit.handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ 
              width: isScreenExtraSmall ? "215px" : isScreenSmall ? "370px" : "450px",
          }}
          />
            {isScreenSmallest && <br />} 
            {isScreenSmallest && <br />} 
           
          <FormControl>
            <Select
              id="marital_status"
              name="marital_status"
              variant="outlined"
              value={formikEdit.values.marital_status}
              onChange={formikEdit.handleChange}
              sx={{
                "& .MuiSelect-icon": {
                  color: "rgb(0, 0, 139)",
                },
                width: isScreenExtraSmall ? "195px" : isScreenSmall ? "230px" : "310px",
            
                
            marginLeft: isScreenSmallest ? "3px" :"20px",
              }}
            >
              <MenuItem value="Married">Married</MenuItem>
              <MenuItem value="unmarried">Unmarried</MenuItem>
            </Select>
          </FormControl>
          {isScreenSmallest && <br />}
          <TextField
            id="phone"
            name="phone"
            label="Phone Number"
            variant="outlined"
            value={formikEdit.values.phone}
            onChange={formikEdit.handleChange}
            sx={{ 
              width: isScreenExtraSmall ? "425px" : isScreenSmall ? "369px" : "450px", 
              marginTop: '10px' 
            }}
            
            disabled={changePhoneMode}
          />

          <div style={{ display: "flex", alignItems: "center" }}>
            {changePhoneMode ? (
              <CheckCircleIcon
                onClick={handleChangePhoneNumber}
                style={{ marginRight: "10px", color: "rgb(0, 0, 139)" }}
              />
            ) : (
              <CircleOutlinedIcon
                onClick={handleChangePhoneNumber}
                style={{ marginRight: "10px", color: "rgb(0, 0, 139)" }}
              />
            )}
            <h1
              onClick={handleChangePhoneNumber}
              style={{
                fontWeight: "100",
                fontSize: "17px",
                width: "200px",
              }}
            >
              Change Phone number
            </h1>
          </div>
          {changePhoneMode && (
            <div style={{marginTop:'-20px', display:'flex', flexDirection:'row'}}>
              <TextField
                label="Change number"
                margin="normal"
                id="new_phone"
                value={formikEdit.values.new_phone} // Capture new_phone value
                onChange={formikEdit.handleChange} // Update form state
                style={{ width: isScreenSmall ? "300px" : "450px" , marginRight: "20px" }}
              />
              <TextField
                label="Confirm Change Number"
                margin="normal"
                style={{ width: isScreenSmall ? "300px" : "450px"  }}
              />
            </div>
          )}
        </form>
        {isScreenSmallest && <br />}
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: "center",
          marginBottom: "5px",
          marginTop: "-10px",
        }}
      >
        <Button
          variant="contained"
          type="submit"
          onClick={formikEdit.handleSubmit}
          sx={{
            width: "150px",
            height: "40px",
            justifyContent: "center",
          }}
        >
          <LoopIcon />
          Update
        </Button>
      </DialogActions>
 
    </Dialog>
  );
};

export default EditProfileDialog;
