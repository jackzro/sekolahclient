import React, { useState } from "react";
import Dashboard from "../layout/dashboard";
import Head from "next/head";
import { useBikinExcelBca } from "@services/student";
import { useUpdateExcelPayment } from "@services/payment";
import { formatINA, formatUangAll, pathByUnit } from "@helpers/help";
import * as xlsx from "xlsx";
import DropDown from "@components/DropDown";
import { typeFile } from "@helpers/unit";

function File() {
  const { mutate: postExcelBca } = useBikinExcelBca();
  const { mutate: updateExcel } = useUpdateExcelPayment();

  const generateFile = (payment) => {
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(payment);
    xlsx.utils.book_append_sheet(wb, ws, "MyFile");
    xlsx.writeFile(
      wb,
      `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}.xlsx`
    );
  };

  const onHandleSubmit = () => {
    postExcelBca(
      {},
      {
        onSuccess: (result) => {
          let res;
          res = formatUangAll(result);
          generateFile(res);
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };
  const onHandleSubmitINA = () => {
    postExcelBca(
      {},
      {
        onSuccess: (result) => {
          let res = formatUangAll(result);
          let text = formatINA(res);
          const element = document.createElement("a");
          const file = new Blob(text, { type: "text/plain" });
          element.href = URL.createObjectURL(file);
          element.download = `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()}.txt`;
          document.body.appendChild(element);
          element.click();
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };

  const readUploadFile = (e) => {
    const fileEx = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      processExcel(fileReader.result);
    };
    fileReader.readAsBinaryString(fileEx);
  };

  function processExcel(data) {
    const workbook = xlsx.read(data, { type: "binary" });
    const firstSheet = workbook.SheetNames[0];
    const excelRows = xlsx.utils.sheet_to_row_object_array(
      workbook.Sheets[firstSheet]
    );
    updateExcel(excelRows);
  }

  return (
    <Dashboard title="File">
      <>
        <Head>
          <title>File</title>
        </Head>
      </>
      <div className="flex flex-col gap-2">
        <button
          className="text-black btn btn-success"
          type="button"
          onClick={onHandleSubmit}
        >
          Generate File BCA
        </button>
        <button
          className="text-black btn btn-success"
          type="button"
          onClick={onHandleSubmitINA}
        >
          Generate File INA
        </button>
      </div>

      {/* <DropDown
        datas={typeFile}
        onHandleSubmit={onHandleSubmit}
        setTipe={setTipe}
        tipe={tipe}
      /> */}
      {/* <form className="p-2 py-2 pb-10">
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
      </form> */}
      {/* {data !== undefined && (
        <button className="btn btn-success" onClick={generateFile}>
          Generate File Excel
        </button>
      )} */}
    </Dashboard>
  );
}

export default File;

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
