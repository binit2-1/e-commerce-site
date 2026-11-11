import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import TopSignIn from "../components/layout/TopSignIn";

const RootLayout = () => (
  <div className="min-h-screen">
    <TopSignIn />
    <Navbar />
    <main>
      <Outlet />
    </main>
    <ScrollRestoration />
  </div>
);

export default RootLayout;
