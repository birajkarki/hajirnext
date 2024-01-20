import CompanySidebar from "@/components/Sidebar/CompanySidebar";
import Header from "@/components/Sidebar/Header/Header";
import MainSidebar from "@/components/Sidebar/MainSidebar";
import Sidebar from "@/components/Sidebar/MainSidebar";
import HeaderCompany from "@/components/company/HeaderCompany";
import { Box } from "@mui/material";

export const metadata = {
  title: "Hajir's Next.js App",
  description: "A smart attadance system ",
};
const DRAWER_WIDTH = 240;

export default function CompanyLayout({ children }) {
  return (
    <>
      <Header />
      {/* <HeaderCompany /> */}
      <CompanySidebar />
      {/* <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          ml: `${DRAWER_WIDTH}px`,
          mt: ["48px", "56px", "64px"],
          p: 3,
          overflow: "auto", // Make the main content scrollable
        }}
      > */}
      {children}
      {/* </Box>{" "} */}
    </>
  );
}
