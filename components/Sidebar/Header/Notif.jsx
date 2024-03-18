
// import React, { useState } from "react";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import { useGetAllNotificationsQuery } from "@/services/api";
// import { Divider } from "@mui/material";


// const NotificationDialog = ({ open, handleClose }) => {
//     const { data: getAllNotificationsQuery } = useGetAllNotificationsQuery(); // Pass the user's ID to the query
 
//     const notifications = getAllNotificationsQuery?.data;
//     const [selectedTab, setSelectedTab] = useState(0);
  
//     const handleTabChange = (event, newValue) => {
//         setSelectedTab(newValue);
//     };

//     return (
//         <Dialog open={open} onClose={handleClose} PaperProps={{ style: { position:"absolute", right:'0', width: '400px', marginRight: '0px', top:'30px' } }}>
//             <DialogTitle sx={{ fontSize:"24px", color:"rgba(76, 78, 100, 0.87)", fontWeight:"500" }}>Notifications</DialogTitle>
//             <Divider />
//             <Tabs value={selectedTab} onChange={handleTabChange}  textColor="primary" sx={{marginLeft:'26px',color:"rgba(76, 78, 100, 0.87)" }}>
//                 <Tab label="Messages" style={{color:"rgba(76, 78, 100, 0.87)" }}>
                    
//                 </Tab>
               
//             </Tabs>
//             <Divider />
         
//             {selectedTab === 0 && (
//              <>
           
//                 <DialogContent sx={{color:"rgba(76, 78, 100, 0.87)"}}>
//                     {notifications && notifications.notifications && notifications.notifications.length > 0 ? (
//                         notifications.notifications.map((notification, index) => (
//                             <div key={index}>
//                                 <Typography>{notification.title}</Typography>
//                                 <Typography>{notification.message}</Typography>
//                                 <br/>
//                                 <Divider/>
//                             </div>
//                         ))
//                     ) : (
//                         <Typography>No notifications found</Typography>
//                     )}
//                 </DialogContent>
//                 </>
//             )}
//             {/* Add additional DialogContent sections for other tabs */}
//             <DialogActions>
//                 <Button onClick={handleClose}>Close</Button>
//             </DialogActions>
//         </Dialog>
//     );
// };

// // // export default NotificationDialog;
import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useGetAllNotificationsQuery } from "@/services/api";
import { Divider, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Adjust this method based on your preferred date and time format
  };
  
const NotificationDialog = ({ open, handleClose }) => {
  const { data: getAllNotificationsQuery } = useGetAllNotificationsQuery();
  const notifications = getAllNotificationsQuery?.data?.notifications || [];
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={12000}
      onClose={handleClose}
      sx={{ position: "absolute", right: 0, width: "400px", top: "30px" }}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        // onClose={handleClose}
        severity="info"
        sx={{
          bgcolor: "#ffffff",
          color: "#000000",
          display: "flex",
          flexDirection: "column",
        //   justifyContent: "space-between"
        }} // Set background color to white and text color to black
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography
            sx={{ fontSize: "24px", color: "rgba(76, 78, 100, 0.87)", fontWeight: "500" }}
          >
            Notifications
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <Divider />
        <Tabs value={selectedTab} onChange={handleTabChange} textColor="primary">
          <Tab label="Messages" />
        </Tabs>
        <Divider />
        <div style={{ maxHeight: "700px", overflowY: "auto", paddingRight: "12px" }}>
          {selectedTab === 0 && (
            <div>
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <div key={index}>
                    <br />
                    <strong>{notification.title}</strong>
                    <br />
                    {notification.message}
                    <br />
              
                    {formatDate(notification.created_date)}

                    <br />
                    <Divider />
                  </div>
                ))
              ) : (
                <div>No notifications found</div>
              )}
            </div>
          )}
        </div>
      </MuiAlert>
    </Snackbar>
  );
};

export default NotificationDialog;
