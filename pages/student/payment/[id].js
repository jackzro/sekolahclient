import TablePayment from "@components/tablePayment";
import { AuthContext } from "@context/AuthContext";
import { dicideAccess } from "@helpers/help";
import { usePaymentStudentById } from "@services/student";
import Dashboard from "layout/dashboard";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";

function Payment({ userData }) {
  const router = useRouter();
  const { data, isLoading } = usePaymentStudentById(router.query.id);
  const { user } = useContext(AuthContext);

  return (
    <Dashboard title="School">
      <>
        <Head>
          <title>Payment Student</title>
        </Head>
      </>
      {dicideAccess(router.query.id, userData.role) ? (
        isLoading === false && data.length !== 0 ? (
          <TablePayment datas={data} role={user.role} />
        ) : (
          <div className="flex flex-col justify-center text-2xl text-black">
            <div className="flex justify-center">
              <p>Tidak ada tagihan yang belum dibayar</p>
            </div>

            <button className="btn btn-accent" onClick={() => router.back()}>
              Back
            </button>
          </div>
        )
      ) : (
        <div className="text-xl text-black">
          Tidak dapet mengakses halaman ini
        </div>
      )}
      {}
    </Dashboard>
  );
}

export default Payment;

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
