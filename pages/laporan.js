import React from "react";
import Dashboard from "../layout/dashboard";
import Head from "next/head";
import LaporanView from "@components/LaporanView";
import Invoice from "@components/invoice";
import LaporanPDfView from "@components/laporan";
import { datass } from "helpers/demo";
import { pathByUnit } from "@helpers/help";

function Laporan({ user }) {
  return (
    <Dashboard title="Laporan">
      <>
        <Head>
          <title>Laporan</title>
        </Head>
      </>
      {/* <LaporanPDfView data={datass} /> */}
      <LaporanView user={user} />
      {/* <Invoice /> */}
    </Dashboard>
  );
}

export default Laporan;

export const getServerSideProps = async (ctx) => {
  if (ctx.req.cookies["nextauth.user"] === undefined) {
    return {
      redirect: {
        destination: "/login", //usually the login page
        permanent: false,
      },
    };
  }
  const user = JSON.parse(await ctx.req.cookies["nextauth.user"]);
  if (user.role === "fotocopy") {
    return {
      redirect: {
        destination: "/fotocopy", //usually the login page
        permanent: false,
      },
    };
  }
  return {
    props: {
      authenticated: true,
      user: user,
    },
  };
};
