import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Subscribe from "../components/Subscribe_Section";

function WebsiteLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Subscribe />
      <Footer />
    </div>
  );
}

export default WebsiteLayout;
