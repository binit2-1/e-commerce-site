import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import TopSignIn from "../components/layout/TopSignIn";

const RootLayout = () => (
  <div className="min-h-screen">
    <TopSignIn />
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
    <ScrollRestoration />
  </div>
);

export default RootLayout;
