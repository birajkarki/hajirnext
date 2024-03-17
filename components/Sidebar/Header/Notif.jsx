// // NotificationDialog.jsx
// import React from "react";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import { useGetAllNotificationsQuery } from "@/services/api";
// import { Divider } from "@mui/material";


// const NotificationDialog = ({ open, handleClose }) => {
//     const { data: getAllNotificationsQuery } = useGetAllNotificationsQuery(); // Pass the user's ID to the query
 
//     const notifications = getAllNotificationsQuery?.data;
  
//   return (
//     <Dialog open={open} onClose={handleClose} PaperProps={{ style: { position:"absolute", right:'0',width: '337.02px', marginRight: '0px', top:'30px' } }}>
//       <DialogTitle sx={{fontSize:"24px",color:"rgba(76, 78, 100, 0.87)", fontWeight:"500"}}>Notification</DialogTitle>
// <Divider/>
//       <DialogContent sx={{color:"rgba(76, 78, 100, 0.87)"}}>
            
//             {notifications && notifications.notifications && notifications.notifications.length > 0 ? (
//   notifications.notifications.map((notification, index) => (
//     <div key={index}>
    
//       <Typography>{notification.title}</Typography>
//       <Typography>{notification.message}</Typography>
//       <br/>
//       <Divider/>
//     </div>
//   ))
// ) : (
//   <Typography>No notifications found</Typography>
// )}

//           </DialogContent>

//       <DialogActions>
//         <Button onClick={handleClose}>Close</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default NotificationDialog;
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useGetAllNotificationsQuery } from "@/services/api";
import { Divider } from "@mui/material";


const NotificationDialog = ({ open, handleClose }) => {
    const { data: getAllNotificationsQuery } = useGetAllNotificationsQuery(); // Pass the user's ID to the query
 
    const notifications = getAllNotificationsQuery?.data;
    const [selectedTab, setSelectedTab] = useState(0);
  
    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ style: { position:"absolute", right:'0', width: '400px', marginRight: '0px', top:'30px' } }}>
            <DialogTitle sx={{ fontSize:"24px", color:"rgba(76, 78, 100, 0.87)", fontWeight:"500" }}>Notifications</DialogTitle>
            <Divider />
            <Tabs value={selectedTab} onChange={handleTabChange}  textColor="primary" sx={{marginLeft:'26px',color:"rgba(76, 78, 100, 0.87)" }}>
                <Tab label="Messages" style={{color:"rgba(76, 78, 100, 0.87)" }} />
               
            </Tabs>
            <Divider />
         
            {selectedTab === 0 && (
             <>
           
                <DialogContent sx={{color:"rgba(76, 78, 100, 0.87)"}}>
                    {notifications && notifications.notifications && notifications.notifications.length > 0 ? (
                        notifications.notifications.map((notification, index) => (
                            <div key={index}>
                                <Typography>{notification.title}</Typography>
                                <Typography>{notification.message}</Typography>
                                <br/>
                                <Divider/>
                            </div>
                        ))
                    ) : (
                        <Typography>No notifications found</Typography>
                    )}
                </DialogContent>
                </>
            )}
            {/* Add additional DialogContent sections for other tabs */}
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default NotificationDialog;
