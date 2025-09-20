import React from "react";
import {
  MANAGER_SIDEBAR_FOOTER_LINKS,
  MANAGER_SIDEBAR_LINKS,
} from "../../../constants/manager/navigation";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { FcBullish } from "react-icons/fc";
const linkClasses =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";

function SideBar() {
  return (
    <div className="fixed top-0 left-0 flex flex-col bg-neutral-900 w-60  h-screen p-3 text-white">
      <div className="flex items-center gap-2 px-1 py-3">
        <FcBullish fontSize={24} />
        <span className="text-neutral-100 font-bold text-lg">Wain Voting</span>
      </div>
      <div className="flex-1 py-8 flex flex-col gap-0.5">
        {MANAGER_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item}></SidebarLink>
        ))}
      </div>
      <div className="flex flex-col gap-0.5 border-t border-neutral-700 pt-2">
        {MANAGER_SIDEBAR_FOOTER_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item}></SidebarLink>
        ))}
        {/* Button logout */}
        <div className={classNames("text-red-500 cursor-pointer", linkClasses)}>
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          Logout
        </div>
      </div>
    </div>
  );
}
function SidebarLink({ item }) {
  const { pathname } = useLocation();
  return (
    <Link
      to={item.path}
      className={classNames(
        pathname === item.path
          ? "bg-neutral-700 text-white"
          : "text-neutral-400",
        linkClasses
      )}
    >
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
}

export default SideBar;
