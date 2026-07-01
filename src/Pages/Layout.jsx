import React from "react";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navbar />

      <main className="flex-grow p-3 sm:p-4 md:p-6 lg:p-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;