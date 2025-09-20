import React from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function ManagerLayout() {
  return (
    <div className="flex flex-row bg-dark-900 w-screen min-h-screen ">
      <SideBar />
      <div className="flex-1 ml-60">
        <Header />
        <div className="p-4 overflow-y-auto">{<Outlet />}</div>
      </div>
    </div>
  );
}
