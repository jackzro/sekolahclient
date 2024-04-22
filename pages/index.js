import Head from "next/head";
import { signOut } from "next-auth/react";
import Dashboard from "../layout/dashboard";
import * as xlsx from "xlsx";
import { useContext, useEffect, useState } from "react";
// import { getAllStudent, useStudents } from "@services/student";
import Table from "@components/table";
import { typeUnit } from "@helpers/unit";
import { AiOutlinePlus } from "react-icons/ai";
import { useToGetID } from "@services/student";
import ModalCreateStudent from "@components/modal/ModalCreateStudent";
import { ModalKegiatan } from "@components/modal/ModalKegiatan";
import { ModalUjian } from "@components/modal/ModalUjian";
import { AuthContext } from "@context/AuthContext";
import { useRouter } from "next/router";
import { pathByUnit } from "@helpers/help";

export default function Home() {
  const { user } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [show, setShow] = useState(false);
  const [showKeg, setShowKeg] = useState(false);
  const [showUjian, setShowUjian] = useState(false);
  const router = useRouter();
  // const { data: studentsList } = useStudents();
  // const { mutate: getData } = useToGetID();

  // const getInitialData = async () => {
  //   const data = await getAllStudent();
  //   setStudents(data);
  // };

  const logout = async (e) => {
    try {
      e.preventDefault();
      await signOut({ redirect: "false", callbackUrl: "/login" });
    } catch (error) {}
  };

  const readUploadFile = (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("file", e.target.files[0]);
    // console.log(e.target.files[0]);
    let res = [];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const arr = text.split("\n");
      let baru = [];
      let flag = false;
      arr.map((data) => {
        if (data.includes("SUB TOTAL TRANSAKSI")) {
          flag = false;
        }
        if (flag) {
          baru.push(data.trim().split(/\s+/g));
        }
        if (data.includes("SUB-COMP")) {
          flag = true;
        }
      });
      baru.map((datas) => {
        let newFormat = {};
        newFormat.no = datas[0];
        newFormat.studentId = datas[1];
        datas.map((data) => {
          if (data === newFormat.no) {
            return;
          }
          if (data === "IDR") {
            flag = false;
            return;
          }
          if (flag) {
            if (newFormat.name === undefined) {
              newFormat.name = `${data}`;
              return;
            } else {
              newFormat.name += ` ${data}`;
              return;
            }
          }
          if (data === newFormat.studentId) {
            flag = true;
            return;
          }
          if (newFormat.totalPembayaran === undefined) {
            newFormat.totalPembayaran = data
              .replace(".00", "")
              .replace(/,/g, "");
            return;
          } else if (newFormat.tanggalTransaksi === undefined) {
            newFormat.tanggalTransaksi = data;
            return;
          } else if (newFormat.waktuTransaksi === undefined) {
            newFormat.waktuTransaksi = data;
            return;
          } else if (newFormat.lokasi === undefined) {
            newFormat.lokasi = data;
            return;
          }
        });
        res.push(newFormat);
        return newFormat;
      });

      // console.log(text.split("\n")[10].trim().split(/\s+/g));
    };
    reader.readAsText(e.target.files[0]);
    // axios({
    //   method: "POST",
    //   url: "http://localhost:3001/students",
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    //   data: formData,
    // })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch(function (response) {
    //     //handle error
    //     console.log(response);
    //   });

    // if (e.target.files) {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     const data = e.target.result;
    //     const workbook = xlsx.read(data, { type: "array" });
    //     const sheetName = workbook.SheetNames[0];
    //     const worksheet = workbook.Sheets[sheetName];
    //     console.log(worksheet);
    //     const json = xlsx.utils.sheet_to_json(worksheet);
    //     console.log(json);
    //   };
    //   reader.readAsArrayBuffer(e.target.files[0]);
    // }
  };

  return (
    <Dashboard title="School">
      <>
        <Head>
          <title>School</title>
        </Head>
      </>
      {user === "null" ? (
        <></>
      ) : (
        user !== null &&
        user.role === "admin" && (
          <div className="flex flex-wrap space-y-1 md:flex-col lg:flex-row lg:space-x-2 lg:items-center lg:justify-center">
            <button className="btn btn-accent" onClick={() => setShow(true)}>
              <AiOutlinePlus className="w-6 h-6 mr-2" />
              Tambah Siswa
            </button>

            <button className="btn btn-accent" onClick={() => setShowKeg(true)}>
              <AiOutlinePlus className="w-6 h-6 mr-2" />
              Tambah Uang Lainnya
            </button>

            {/* <button
              className="btn btn-accent"
              onClick={() => setShowUjian(true)}
            >
              <AiOutlinePlus className="w-6 h-6 mr-2" />
              Tambah Payment dengan Excel File
            </button> */}
          </div>
        )
      )}

      {typeUnit.length !== 0 && <Table datas={typeUnit} />}
      <ModalCreateStudent
        open={show}
        onClose={() => setShow(false)}
      ></ModalCreateStudent>
      <ModalKegiatan
        open={showKeg}
        onClose={() => setShowKeg(false)}
      ></ModalKegiatan>
      <ModalUjian
        open={showUjian}
        onClose={() => setShowUjian(false)}
      ></ModalUjian>
    </Dashboard>
  );
}

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
    },
  };
};
