import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Footer from "./Footer";

export default function UserLayout() {
  return (
    <div className="flex flex-col w-screen h-screen dark:bg-dark-900 overflow-x-hidden">
      <Navbar />

      <div>{<Outlet />}</div>

      <Footer />
    </div>
  );
}
