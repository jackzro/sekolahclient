import CustomTable from "@components/tablePembayaran/customTable";
import { pathByUnit, textToJson } from "@helpers/help";
import { useUpdateStatusPaymentViaFile } from "@services/student";
import Head from "next/head";
import React, { useState, useCallback } from "react";
import Dashboard from "../layout/dashboard";
import { toast } from "react-toastify";
import ReactDatePicker from "react-datepicker";

function Pembayaran() {
  const [datas, setDatas] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const { mutate: paymentViaFile } = useUpdateStatusPaymentViaFile();
  const readUploadedFileAsText = (inputFile) => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsText(inputFile);
    });
  };

  const readUploadFile = useCallback(
    async (e) => {
      e.preventDefault();
      const text = await readUploadedFileAsText(e.target.files[0]);
      const result = textToJson(text);
      await setDatas(result);
    },
    [datas]
  );

  const handleChange = (date) => {
    setStartDate(date);
    setShow(true);
  };

  const updatePembayaran = () => {
    try {
      paymentViaFile({
        dataBayaran: datas,
        tanggalBatas: startDate,
      });
      toast.success("Data sudah berhasil diupdate");
    } catch (error) {}
  };

  return (
    <Dashboard title="Pembayaran">
      <>
        <Head>
          <title>Pembayaran</title>
        </Head>
      </>
      <div className="flex flex-col items-center justify-between p-2">
        {/* <div className="min-w-full mb-2 text-black">
          <span>Pilih batas tanggal Pembayaran : </span>
          <ReactDatePicker
            selected={startDate}
            onChange={handleChange}
            className="w-full text-center text-black border-2 rounded-lg"
          />
        </div>
        {show ? ( */}
        <form className="flex flex-row items-center justify-between min-w-full p-2 py-2 pb-10">
          <span>
            <label htmlFor="upload" className="mr-5 text-center text-black">
              Upload File
            </label>
            <input
              type="file"
              name="upload"
              id="upload"
              onChange={readUploadFile}
              className="text-center text-black "
            />
          </span>
          <span>
            <button
              className="p-2 text-black rounded-lg btn-success"
              onClick={updatePembayaran}
            >
              Update Pembayaran
            </button>
          </span>
        </form>
        {/* ) : null} */}
      </div>
      {datas.length !== 0 && <CustomTable datas={datas} />}
    </Dashboard>
  );
}

export default Pembayaran;

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
