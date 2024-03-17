
import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import Image from "next/image";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";

const DashboardFirstComponent = () => {
  const isScreenSmall = useMediaQuery("(max-width: 1430px)");
  const isScreenSm = useMediaQuery("(max-width: 1430px)");
  return (
    <Box sx={{ width: "100%", height: "417px" }}>
      <Paper
        sx={{
          flexGrow: 1,
          backgroundColor: "rgba(34, 64, 139, 0.15)",
          elevation: 0,
          maxWidth: isScreenSmall ? "100%" : "528px",

          justifyContent: 'space-between',
          height: '326px',
          position: "relative",
          borderRadius: '10px',
          width: "88%", // Adjusted to occupy full width
          '@media (max-width: 960px)': {
            width: isScreenSmall ? "calc(100% - 60px)" : "100%", // Adjusted for small screens
          },
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", paddingTop: "45px", paddingLeft: "40px" }}>
          <div style={{ marginBottom: "88px" }}>
            <Typography sx={{ fontSize: "24px", fontWeight: "500", width: "269px", height: "62px", color: "#22408B" }}>
              Welcome to Hajir 👋
            </Typography>
            <Typography
              sx={{ fontSize: "16px", fontWeight: "400", color: "#353737", marginTop:'-20px' }}
            >
              {format(new Date(), "EEEE, MMMM d, y")}
            </Typography>
       
            <Typography
              sx={{ fontSize: "16px", width: "265px", height: "98px", color: "#434345", marginTop:"32px" }}
            >
              Manage and organize your workplace with the best management system. <br /> Good luck!!
            </Typography>
          </div>
          <div style={{ marginLeft: isScreenSmall ? "-60px" : "-40px", marginTop: '-40px', width: "415px", height: "417px", display: isScreenSmall ? "none" : "block" }}>
            <Image
              width={390}
              height={432}
              alt="complex"
              src="/left-img.png"
            />
          </div>

        </div>
      </Paper>
    </Box>
  );
}

export default DashboardFirstComponent;
