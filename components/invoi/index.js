import React, { useEffect, useState, useCallback } from "react";
import {
  PDFViewer,
  Page as PdfPage,
  Text as PdfText,
  View as PdfView,
  Document as PdfDocument,
  Image as PdfImage,
  StyleSheet,
} from "@react-pdf/renderer";
import Logo from "../../assets/images/ykb-logo.png";
import HeaderInvoice from "./header";
import BodyInvoice from "./BodyInvoice";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import Total from "./Total";
import TandaTangan from "./TandaTangan";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    color: "black",
    padding: 10,
  },
  viewer: {
    width: "100vw", //the pdf viewer will take up all of the width and height
    height: "100vh",
  },
});

const datasss = [
  {
    id: 421,
    period: "Tahun Ajaran 2022/2023 ",
    unit: "SD MARIA FRANSISKA",
    iuran: "Uang Sekolah",
    jumlahTagihan: 850000,
    jumlahDenda: 0,
    jumlahAdmin: 5000,
    bulanIuran: "2022-7",
    tglTagihan: "25-6-2022",
    tglDenda: "10-7-2022",
    cicilanKe: 0,
    caraBayar: "",
    vBcaKode: "120640",
    tanggalBayar: "",
    jumlahBayar: "",
    userBayar: "",
    buktiBayar: "",
    statusBayar: false,
    keterangan: "",
    student: {
      id: "20640",
      grade: "SD 5",
      unit: "SD MARIA FRANSISKA",
      name: "Andrew Koji Maduma Sihotang ",
      gender: null,
      birthDate: null,
      motherName: null,
      motherNumber: null,
      fatherName: null,
      fatherNumber: null,
      joinDate: null,
      status: false,
      bloodType: null,
      uangSekolah: 850000,
      uangKegiatan: null,
      vBcaSekolah: "120640",
      vBcaKegiatan: "220640",
      keterangan: null,
      anakBaru: false,
      totalTunggakan: null,
      createdAt: "2022-05-12T07:17:20.675Z",
      updatedAt: "2022-05-12T07:17:20.675Z",
    },
  },
  {
    id: 422,
    period: "Tahun Ajaran 2022/2023 ",
    unit: "SD MARIA FRANSISKA",
    iuran: "Uang Sekolah",
    jumlahTagihan: 850000,
    jumlahDenda: 0,
    jumlahAdmin: 5000,
    bulanIuran: "2022-8",
    tglTagihan: "25-7-2022",
    tglDenda: "10-8-2022",
    cicilanKe: 0,
    caraBayar: "",
    vBcaKode: "120640",
    tanggalBayar: "",
    jumlahBayar: "",
    userBayar: "",
    buktiBayar: "",
    statusBayar: false,
    keterangan: "",
    student: {
      id: "20640",
      grade: "SD 5",
      unit: "SD MARIA FRANSISKA",
      name: "Andrew Koji Maduma Sihotang ",
      gender: null,
      birthDate: null,
      motherName: null,
      motherNumber: null,
      fatherName: null,
      fatherNumber: null,
      joinDate: null,
      status: false,
      bloodType: null,
      uangSekolah: 850000,
      uangKegiatan: null,
      vBcaSekolah: "120640",
      vBcaKegiatan: "220640",
      keterangan: null,
      anakBaru: false,
      totalTunggakan: null,
      createdAt: "2022-05-12T07:17:20.675Z",
      updatedAt: "2022-05-12T07:17:20.675Z",
    },
  },
];

function Invoi({ data }) {
  const [totalTag, setTotalTag] = useState(0);

  useEffect(() => {
    handleTotal();
  }, [data]);

  const handleTotal = () => {
    let total = 0;
    data.map((bayaran) => {
      total += bayaran.jumlahTagihan;
    });
    setTotalTag(total);
  };
  return (
    // <PDFViewer style={styles.viewer}>
    <PdfDocument>
      <PdfPage style={styles.page} wrap>
        <HeaderInvoice data={data} />
        <BodyInvoice data={data} />
        <TableHead />
        {data.map((bayaran, index) => (
          <TableBody data={bayaran} no={index} key={bayaran.id} />
        ))}

        <Total total={totalTag} />
        {/* <TandaTangan /> */}
      </PdfPage>
    </PdfDocument>
    // </PDFViewer>
  );
}

export default Invoi;
