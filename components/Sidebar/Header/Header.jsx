import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Search from "./Search";
import ProfileMenu from "./ProfileMenu";
import HeaderMenu from "./HeaderMenu";
import Image from "next/image";
import Link from "next/link";

const Header = ({ onMenuIconClick }) => (
  <AppBar
    position="fixed"
    // elevation={1}
    color="inherit"
    // height="513px"
    sx={{ backgroundColor: "white" }}
  >
    <Toolbar>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexGrow: 1,
          marginLeft: "240px",
        }}
      >
        
        <Link href="/dashboard">

      <Image src="/hajir-logo.png" width={150} height={50} alt="Hajir Logo" />
   
  </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <HeaderMenu />
      </div>
    </Toolbar>

  </AppBar>
);

export default Header;
