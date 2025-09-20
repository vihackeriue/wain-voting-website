import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { NAVBAR_USER_LINKS } from "../../../../constants/user/navigation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import PrimaryButton from "../../../ui/button/PrimaryButton";
import useAuth from "../../../../hooks/useAuth";

export default function ResponsiveMenu({ showMenu }) {
  const navigate = useNavigate();
  const { auth, logout } = useAuth();
  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white dark:bg-dark-100 dark:text-secondary-900 px-8 pb-6 pt-16 text-black transition-all duration-200 md:hidden rounded-r-xl shadow-md`}
    >
      <div className="card">
        {auth ? (
          <div className="flex items-center justify-start gap-3">
            {/* <FaUserCircle size={50} /> */}

            <img
              src="https://th.bing.com/th?q=IPhone+Avatar&w=120&h=120&c=1&rs=1&qlt=90&r=0&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-WW&cc=VN&setlang=en&adlt=moderate&t=1&mw=247"
              alt=""
              className="h-12 w-12 rounded-full object-cover border border-red-300"
            />
            <div>
              <h1>{auth?.username}</h1>
              {!auth.walletAddress && (
                <PrimaryButton className="text-sm">
                  Connect Wallet
                </PrimaryButton>
              )}
            </div>
          </div>
        ) : (
          <PrimaryButton onClick={() => navigate("/login")} className="w-full">
            Login
          </PrimaryButton>
        )}

        <div className="mt-12">
          <div className="space-y-4 text-xl">
            {NAVBAR_USER_LINKS.map((item) => (
              <NavbarLink key={item.key} item={item}></NavbarLink>
            ))}
          </div>
        </div>
      </div>
      {auth && (
        <PrimaryButton onClick={() => logout()}>Đăng xuất</PrimaryButton>
      )}
    </div>
  );
}

function NavbarLink({ item }) {
  const { pathname } = useLocation();
  return (
    <Link
      to={item.path}
      className={classNames(
        pathname === item.path ? "text-primary font-semibold" : "",
        "mb-5 inline-block w-full"
      )}
    >
      {item.label}
    </Link>
  );
}
