import FotocopyComponent from "@components/FotocopyComponent";
import Loading from "@components/loading";
import { ModalDelete } from "@components/modal/ModalDelete";
import ModalFotocopy from "@components/modal/ModalFotocopy";
import TableFotocopy from "@components/tableFotocopy";
import { AuthContext } from "@context/AuthContext";
import { dicideAccess } from "@helpers/help";
import { useFotocopy } from "@services/fotocopy";
import Dashboard from "layout/dashboard";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";

function Fotocopy({ userData }) {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [openCreateFotocopy, setOpenCreateFotocopy] = useState(false);
  const [showDeleteStudent, setShowDeleteStudent] = useState(false);
  const { data, isLoading, refetch, isFetching } = useFotocopy();

  // useEffect(() => {
  //   refetch();
  // }, [openCreateFotocopy, setShowDeleteStudent]);

  return (
    <Dashboard title="Fotocopy">
      <>
        <Head>
          <title>Fotocopy</title>
        </Head>
      </>

      <span>
        <button
          className="btn btn-accent"
          onClick={() => setOpenCreateFotocopy(true)}
        >
          <AiOutlinePlus className="w-6 h-6" />
          Tambah Fotocopy
        </button>
      </span>

      {dicideAccess(router.query.id, userData.role) ? (
        isLoading === false && data.length !== 0 && isFetching === false ? (
          <TableFotocopy
            datas={data}
            role={user.role}
            showDeleteStudent={showDeleteStudent}
            setShowDeleteStudent={setShowDeleteStudent}
            refetch={refetch}
          />
        ) : (
          <Loading />
        )
      ) : (
        <div className="text-xl text-black">
          Tidak dapet mengakses halaman ini
        </div>
      )}

      <ModalFotocopy
        open={openCreateFotocopy}
        onClose={() => setOpenCreateFotocopy(false)}
        refetch={refetch}
      />
    </Dashboard>
  );
}

export default Fotocopy;

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
  if (user.role !== "admin" && user.role !== "fotocopy") {
    return {
      redirect: {
        destination: pathByUnit(user.role), //usually the login page
        permanent: false,
      },
    };
  }
  // if (user.role === "fotocopy") {
  //   return {
  //     redirect: {
  //       destination: "/fotocopy", //usually the login page
  //       permanent: false,
  //     },
  //   };
  // }
  return {
    props: {
      userData: user,
    },
  };
};
