import CompanySidebar from "@/components/Sidebar/CompanySidebar";
import Header from "@/components/Sidebar/Header/Header";

export const metadata = {
  title: "Hajir's Next.js App",
  description: "A smart attadance system ",
};

export default function CompanyLayout({ children }) {
  return (
    <>
      <Header />
      <CompanySidebar />

      {children}
    </>
  );
}
