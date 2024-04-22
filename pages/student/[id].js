import { ModalEditStudent } from "@components/modal/ModalEditStudent";
import { ModalEditOrtu } from "@components/modal/ModalEditOrtu";
import { ModalEditPerkembangan } from "@components/modal/ModalPerkembangan";
import { useStudentById, useEditStudent } from "@services/student";
import Dashboard from "layout/dashboard";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useMemo, useContext } from "react";
import {
  FcMoneyTransfer,
  FcPortraitMode,
  FcFilingCabinet,
  FcBullish,
  FcExport,
  FcDeleteDatabase,
} from "react-icons/fc";
import { ModalEditMeninggalkanSekolah } from "@components/modal/ModalMeninggalkanSekolah";
import { ModalKeuangan } from "@components/modal/ModalKeuangan";
import { ModalPayment } from "@components/modal/ModalPayment";
import { AuthContext } from "@context/AuthContext";
import { dicideAccess } from "@helpers/help";

function Student({ userData }) {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { data, isLoading } = useStudentById(router.query.id);
  const { mutate: updateStudent } = useEditStudent();
  const [openSiswa, setOpenSiswa] = useState(false);
  const [openOrtu, setOpenOrtu] = useState(false);
  const [openPerkembangan, setOpenPerkembangan] = useState(false);
  const [openMeninggalkanSekolah, setOpenMeninggalkanSekolah] = useState(false);
  const [openKeuangan, setOpenKeuangan] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [paid, setPaid] = useState(false);
  const [dataSiswa, setdataSiswa] = useState();
  const [dataPayment, setDataPayment] = useState();
  const [detail, setDetail] = useState(false);

  const handleData = useMemo(() => {
    setdataSiswa(data);
  }, [isLoading]);

  const handleMutate = (data) => {
    updateStudent(data, {
      onSuccess: async (data) => {
        setdataSiswa(data);
      },
      onError: async (data) => {
        console.log(data);
      },
    });
  };

  return (
    <Dashboard title="School">
      <>
        <Head>
          <title>Edit Student</title>
        </Head>
      </>
      {dicideAccess(router.query.id, userData.role) ? (
        isLoading === false && (
          <div className="grid grid-flow-col grid-rows-3 gap-4 text-xl text-black">
            <div className="grid grid-flow-row grid-cols-2 row-span-1 gap-40 px-10">
              <button
                className="flex flex-row items-center p-10 py-20 space-x-6 bg-blue-500 rounded-lg cursor-pointer"
                onClick={() => setOpenSiswa(true)}
              >
                <FcFilingCabinet className="w-12 h-12" />
                <span className="text-white">Data Siswa</span>
              </button>

              <button
                className="flex flex-row items-center p-10 py-20 space-x-6 bg-green-800 rounded-lg cursor-pointer"
                onClick={() => setOpenOrtu(true)}
              >
                <FcPortraitMode className="w-12 h-12 text-white" />
                <span className="text-white">Data Orang Tua / Wali</span>
              </button>
            </div>

            <button
              className="flex flex-row items-center p-10 py-20 space-x-6 bg-yellow-800 rounded-lg cursor-pointer"
              onClick={() => setOpenKeuangan(true)}
            >
              <FcMoneyTransfer className="w-12 h-12" />
              <span className="text-white">Daftar Keuangan</span>
            </button>

            <div className="grid grid-flow-row grid-cols-2 row-span-1 gap-40 px-10">
              <button
                className="flex flex-row items-center p-10 py-20 space-x-6 bg-orange-600 rounded-lg cursor-pointer"
                onClick={() => setOpenPerkembangan(true)}
              >
                <FcBullish className="w-12 h-12" />
                <span className="text-white">Perkembangan Peserta Didik</span>
              </button>

              <button
                className="flex flex-row items-center p-10 py-20 space-x-6 bg-gray-600 rounded-lg cursor-pointer"
                onClick={() => setOpenMeninggalkanSekolah(true)}
              >
                <FcExport className="w-12 h-12" />
                <span className="text-white">Meninggalkan Sekolah</span>
              </button>
            </div>
          </div>
        )
      ) : (
        <div className="text-xl text-black">
          Tidak dapet mengakses halaman ini
        </div>
      )}

      {dataSiswa !== undefined && (
        <ModalEditStudent
          open={openSiswa}
          onClose={() => setOpenSiswa(false)}
          data={dataSiswa}
          id={router.query.id}
          handleMutate={handleMutate}
        />
      )}

      {dataSiswa !== undefined && (
        <ModalEditOrtu
          open={openOrtu}
          onClose={() => setOpenOrtu(false)}
          data={dataSiswa}
          id={router.query.id}
          handleMutate={handleMutate}
        />
      )}

      {dataSiswa !== undefined && (
        <ModalEditPerkembangan
          open={openPerkembangan}
          onClose={() => setOpenPerkembangan(false)}
          data={dataSiswa}
          id={router.query.id}
          handleMutate={handleMutate}
        />
      )}

      {dataSiswa !== undefined && (
        <ModalEditMeninggalkanSekolah
          open={openMeninggalkanSekolah}
          onClose={() => setOpenMeninggalkanSekolah(false)}
          data={dataSiswa}
          id={router.query.id}
          handleMutate={handleMutate}
        />
      )}

      <ModalKeuangan
        open={openKeuangan}
        onClose={() => setOpenKeuangan(false)}
        id={router.query.id}
        handleMutate={handleMutate}
        setDetail={setDetail}
        setDataPayment={setDataPayment}
        setOpenPayment={setOpenPayment}
        setPaid={setPaid}
      />
      {dataPayment !== undefined && (
        <ModalPayment
          open={openPayment}
          onClose={() => setOpenPayment(false)}
          data={dataPayment}
          detail={paid}
          role={user.role}
        />
      )}
    </Dashboard>
  );
}

export default Student;

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
