import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/navigation/Navbar";
import Sidebar from "../components/navigation/Sidebar";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "@components/loading";
import { AuthContext } from "@context/AuthContext";
import { pathByUnit } from "@helpers/help";

export const Dashboard = ({ title, children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, user } = useContext(AuthContext);
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    } else {
      setIsLoading(false);
    }
  }, []);
  // const { data: session, status } = useSession();

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/login");
  //   }
  // }, []);

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/login");
  //   }
  // }, [status, session]);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading type="points" />
      </div>
    );
  }

  return (
    <>
      <div>
        <Sidebar role={user.role} />
        {/* <div className="relative md:ml-64 bg-blueGray-100"> */}
        <div className="relative flex min-h-screen bg-white md:ml-64">
          <div className="w-full px-4 pt-8 mx-auto md:px-10">
            <Navbar title={title} role={user.role} username={user.name} />
            <div className={"relative mt-20 mb-10"}>{children}</div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default Dashboard;
