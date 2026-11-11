import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import TopSignIn from "../components/layout/TopSignIn";

const RootLayout = () => (
  <div className="w-screen h-screen relative">
    <div className="sticky top-0 z-50 bg-white shadow-sm transition-transform duration-300">
      <TopSignIn />
      <Navbar />
    </div>
    <div className="relative z-20">
      <Outlet />
    </div>
  </div>
);

export default RootLayout;
