import React from "react";
import Dashboard from "../layout/dashboard";
import Head from "next/head";
import * as xlsx from "xlsx";
import Raportea from "@components/raportcom/index";

function raport() {
  const handleUpload = async (e) => {
    e.preventDefault();
    const files = e.target.files[0];
    const data = await files.arrayBuffer();
    const workbook = xlsx.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonToData = xlsx.utils.sheet_to_json(worksheet);
    console.log(jsonToData);
  };
  return (
    // <Raportea />
    <Dashboard title="Raport">
      <>
        <Head>
          <title>Raport</title>
        </Head>
      </>
      <div className="flex items-center justify-between p-2">
        <form className="p-2 py-2 pb-10">
          <label htmlFor="upload" className="mr-5 text-center text-black">
            Upload File
          </label>
          <input
            type="file"
            name="upload"
            id="upload"
            onChange={handleUpload}
            className="text-center text-black "
          />
        </form>
        <button
          className="p-2 text-black rounded-lg btn-success"
          // onClick={updatePembayaran}
        >
          Update Pembayaran
        </button>
      </div>
    </Dashboard>
  );
}

export default raport;
