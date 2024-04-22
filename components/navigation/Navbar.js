import React, { useContext } from "react";
import { FaUser } from "react-icons/fa";
// import { signOut, useSession } from "next-auth/react";
import { AuthContext } from "@context/AuthContext";

const Navbar = ({ title, role, username }) => {
  const { logout } = useContext(AuthContext);
  const handleSignOut = async () => {
    logout();
    // await signOut({ redirect: false, callbackUrl: "/login" });
  };
  return (
    <>
      <nav className="absolute top-0 left-0 flex items-center w-full p-4 bg-black shadow z-1 md:flex-row md:flex-nowrap md:justify-start">
        <div className="flex flex-wrap items-center justify-between w-full px-4 mx-autp md:flex-nowrap md:px-10">
          <a
            className="hidden text-sm font-semibold text-white uppercase lg:inline-block"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            {title}
          </a>
          <div className="text-right">
            <div className="border-2 rounded-xl dropdown">
              <label
                tabIndex="0"
                className="gap-2 cursor-pointer btn btn-ghost"
              >
                {role !== "admin" ? username.toUpperCase() : "Admin"}
                <FaUser className="inline" />
              </label>
              <ul
                tabIndex="0"
                className="p-2 shadow menu dropdown-content bg-base-100 rounded-box min-w-fit"
              >
                <li>
                  <a onClick={handleSignOut}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
};

export default Navbar;
