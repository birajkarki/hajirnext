// "use client"
// import React, { useState } from "react";
// import MenuItem from "@mui/material/MenuItem";
// import IconButton from "@mui/material/IconButton";
// import Badge from "@mui/material/Badge";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import Button from "@mui/material/Button";
// import LanguageIcon from "@mui/icons-material/Language";
// import { useGetAllNotificationsQuery } from "@/services/api";
// import { useAuth } from "@/context/AuthContext";
// import { Typography } from "@mui/material";
// const HeaderMenu = () => {
  
//   const { data: getAllNotificationsQuery } = useGetAllNotificationsQuery();
//   const [openDialog, setOpenDialog] = useState(false);
// console.log("Notifications:", getAllNotificationsQuery);
// const notifications = getAllNotificationsQuery;

//   const handleNotificationClick = () => {
//     setOpenDialog(true);
//   };

//   const handleCloseNotification = () => {
//     setOpenDialog(false);
//   };

//   return (
//     <>
//     <div style={{ display: "flex", alignItems: "center" }}>
//       <MenuItem>
//         <IconButton
//           size="large"
//           aria-label="show 17 new notifications"
//           color="black"
//         >
//           <Badge badgeContent={"En"} color="info">
//             <LanguageIcon/>
//           </Badge>
//         </IconButton>
//       </MenuItem>
//       <MenuItem>
//         <IconButton
//           size="large"
//           aria-label="show notifications"
//           color="black"
//           onClick={handleNotificationClick}
//         >
//           <Badge

//             color="error"
//           >
//             <NotificationsIcon />
//           </Badge>
//         </IconButton>
//       </MenuItem>

//       <Dialog
//         open={openDialog}
//         onClose={handleCloseNotification}
//       >
//         <DialogTitle>Notifications</DialogTitle>

// <DialogContent>
//   {Array.isArray(notifications) ? (
//     notifications.map((notification, index) => (
//       <div key={index}>
//         <Typography variant="h6">{notification.type}</Typography>
//         <Typography>{notification.title}</Typography>
//         <Typography>{notification.message}</Typography>
//       </div>
//     ))
//   ) : (
//     <Typography>No notifications found</Typography>
//   )}
// </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseNotification}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//     </>
//   );
// };

// // export default HeaderMenu;
// "use client"
// import React, { useState, useEffect } from "react";
// import MenuItem from "@mui/material/MenuItem";
// import IconButton from "@mui/material/IconButton";
// import Badge from "@mui/material/Badge";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import Button from "@mui/material/Button";
// import LanguageIcon from "@mui/icons-material/Language";
// import { useGetAllNotificationsQuery } from "@/services/api";

// import { Typography } from "@mui/material";

// const HeaderMenu = () => {

//   const { data: getAllNotificationsQuery } = useGetAllNotificationsQuery(); // Pass the user's ID to the query
//   const [openDialog, setOpenDialog] = useState(false);
//   const notifications = getAllNotificationsQuery?.data;

//   const handleNotificationClick = () => {
//     setOpenDialog(true);
//   };

//   const handleCloseNotification = () => {
//     setOpenDialog(false);
//   };

//   return (
//     <>
//       <div style={{ display: "flex", alignItems: "center" }}>
//         <MenuItem>
//           <IconButton
//             size="large"
//             aria-label="show 17 new notifications"
//             color="black"
//           >
//             <Badge badgeContent={"En"} color="info">
//               <LanguageIcon />
//             </Badge>
//           </IconButton>
//         </MenuItem>
//         <MenuItem>
//           <IconButton
//             size="large"
//             aria-label="show notifications"
//             color="black"
//             onClick={handleNotificationClick}
//           >
//             <Badge color="error">
//               <NotificationsIcon />
//             </Badge>
//           </IconButton>
//         </MenuItem>

//         <Dialog open={openDialog} onClose={handleCloseNotification}>
//           <DialogTitle>Notifications</DialogTitle>
//           <DialogContent>
            
//             {notifications && notifications.notifications && notifications.notifications.length > 0 ? (
//   notifications.notifications.map((notification, index) => (
//     <div key={index}>
//       <Typography variant="h6">{notification.type}</Typography>
//       <Typography>{notification.title}</Typography>
//       <Typography>{notification.message}</Typography>
//     </div>
//   ))
// ) : (
//   <Typography>No notifications found</Typography>
// )}

//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCloseNotification}>Close</Button>
//           </DialogActions>
//         </Dialog>
//       </div>
//     </>
//   );
// };

// export default HeaderMenu;

"use client"
// HeaderMenu.jsx
import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationDialog from "./Notif";
import LanguageIcon from "@mui/icons-material/Language";
const HeaderMenu = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleNotificationClick = () => {
    setOpenDialog(true);
  };

  const handleCloseNotification = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <MenuItem>
          <IconButton size="large" aria-label="show 17 new notifications" color="black">
            <Badge badgeContent={"En"} color="info">
              <LanguageIcon />
            </Badge>
          </IconButton>
        </MenuItem>
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show notifications"
            color="black"
            onClick={handleNotificationClick}
          >
            <Badge color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </MenuItem>
      </div>
      <NotificationDialog open={openDialog} handleClose={handleCloseNotification} />
    </>
  );
};

export default HeaderMenu;
