import TableStudent from "@components/tableStudent";
import { pathBlock, pathByUnit } from "@helpers/help";
import { useStudentByUnit } from "@services/student";
import Dashboard from "layout/dashboard";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Unit({ userData }) {
  const router = useRouter();
  const { unit } = router.query;
  const { data: student, isLoading } = useStudentByUnit(unit);

  useEffect(() => {
    if (pathBlock(unit, userData.role)) {
      return;
    } else {
      if (userData.role === "admin") {
        return;
      } else {
        router.push(pathByUnit(userData.role));
      }
    }
  }, []);

  return (
    <Dashboard title={"School"}>
      <>
        <Head>
          <title>Unit School</title>
        </Head>
      </>
      {isLoading === false && <TableStudent datas={student} />}
    </Dashboard>
  );
}

export default Unit;

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
  return {
    props: {
      userData: user,
    },
  };
};
