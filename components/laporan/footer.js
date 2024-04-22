import React from "react";
import {
  Text as PdfText,
  View as PdfView,
  Image as PdfImage,
  StyleSheet,
} from "@react-pdf/renderer";
import { numberWithCommas } from "@helpers/help";

const styles = StyleSheet.create({
  header: {
    borderTop: 2,
    padding: 10,
  },
});

const datass = [
  {
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
    payments: [
      {
        id: 426,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 850000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2022-11",
        tglTagihan: "25-10-2022",
        tglDenda: "10-11-2022",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120640",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
      {
        id: 427,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 850000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2023-1",
        tglTagihan: "25-0-2023",
        tglDenda: "10-1-2023",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120640",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
      {
        id: 428,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 850000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2023-2",
        tglTagihan: "25-1-2023",
        tglDenda: "10-2-2023",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120640",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
      {
        id: 429,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 850000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2022-12",
        tglTagihan: "25-11-2022",
        tglDenda: "10-12-2022",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120640",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
      {
        id: 430,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 850000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2023-3",
        tglTagihan: "25-2-2023",
        tglDenda: "10-3-2023",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120640",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
      {
        id: 431,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 850000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2023-4",
        tglTagihan: "25-3-2023",
        tglDenda: "10-4-2023",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120640",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
      {
        id: 432,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 850000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2023-5",
        tglTagihan: "25-4-2023",
        tglDenda: "10-5-2023",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120640",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
      {
        id: 433,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 850000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2023-6",
        tglTagihan: "25-5-2023",
        tglDenda: "10-6-2023",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120640",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
    ],
  },
  {
    id: "20641",
    grade: "SD 5",
    unit: "SD MARIA FRANSISKA",
    name: "Angelica Gishella Novanda",
    gender: null,
    birthDate: null,
    motherName: null,
    motherNumber: null,
    fatherName: null,
    fatherNumber: null,
    joinDate: null,
    status: false,
    bloodType: null,
    uangSekolah: 255000,
    uangKegiatan: null,
    vBcaSekolah: "120641",
    vBcaKegiatan: "220641",
    keterangan: null,
    anakBaru: false,
    totalTunggakan: null,
    createdAt: "2022-05-12T07:17:20.675Z",
    updatedAt: "2022-05-12T07:17:20.675Z",
    payments: [
      {
        id: 434,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 255000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2022-7",
        tglTagihan: "25-6-2022",
        tglDenda: "10-7-2022",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120641",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
      {
        id: 435,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 255000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2022-8",
        tglTagihan: "25-7-2022",
        tglDenda: "10-8-2022",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120641",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
      {
        id: 436,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 255000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2022-10",
        tglTagihan: "25-9-2022",
        tglDenda: "10-10-2022",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120641",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
      {
        id: 437,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 255000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2022-11",
        tglTagihan: "25-10-2022",
        tglDenda: "10-11-2022",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120641",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
      {
        id: 438,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 255000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2022-9",
        tglTagihan: "25-8-2022",
        tglDenda: "10-9-2022",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120641",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
      {
        id: 439,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 255000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2022-12",
        tglTagihan: "25-11-2022",
        tglDenda: "10-12-2022",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120641",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
      {
        id: 440,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 255000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2023-1",
        tglTagihan: "25-0-2023",
        tglDenda: "10-1-2023",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120641",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
      {
        id: 441,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 255000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2023-2",
        tglTagihan: "25-1-2023",
        tglDenda: "10-2-2023",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120641",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
      {
        id: 442,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 255000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2023-3",
        tglTagihan: "25-2-2023",
        tglDenda: "10-3-2023",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120641",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
      {
        id: 443,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 255000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2023-4",
        tglTagihan: "25-3-2023",
        tglDenda: "10-4-2023",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120641",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
      {
        id: 444,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 255000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2023-6",
        tglTagihan: "25-5-2023",
        tglDenda: "10-6-2023",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120641",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
      {
        id: 446,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 255000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2023-5",
        tglTagihan: "25-4-2023",
        tglDenda: "10-5-2023",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120641",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
    ],
  },
  {
    id: "20642",
    grade: "SD 5",
    unit: "SD MARIA FRANSISKA",
    name: "Bella Caelestina Devina Sitohang",
    gender: null,
    birthDate: null,
    motherName: null,
    motherNumber: null,
    fatherName: null,
    fatherNumber: null,
    joinDate: null,
    status: false,
    bloodType: null,
    uangSekolah: 550000,
    uangKegiatan: null,
    vBcaSekolah: "120642",
    vBcaKegiatan: "220642",
    keterangan: null,
    anakBaru: false,
    totalTunggakan: null,
    createdAt: "2022-05-12T07:17:20.678Z",
    updatedAt: "2022-05-12T07:17:20.678Z",
    payments: [
      {
        id: 445,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 550000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2022-7",
        tglTagihan: "25-6-2022",
        tglDenda: "10-7-2022",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120642",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
      {
        id: 447,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 550000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2022-9",
        tglTagihan: "25-8-2022",
        tglDenda: "10-9-2022",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120642",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
      {
        id: 448,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 550000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2022-10",
        tglTagihan: "25-9-2022",
        tglDenda: "10-10-2022",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120642",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
      {
        id: 449,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 550000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2022-8",
        tglTagihan: "25-7-2022",
        tglDenda: "10-8-2022",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120642",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
      {
        id: 450,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 550000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2022-11",
        tglTagihan: "25-10-2022",
        tglDenda: "10-11-2022",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120642",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
      {
        id: 451,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 550000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2023-1",
        tglTagihan: "25-0-2023",
        tglDenda: "10-1-2023",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120642",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
      {
        id: 452,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 550000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2022-12",
        tglTagihan: "25-11-2022",
        tglDenda: "10-12-2022",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120642",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
      {
        id: 453,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 550000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2023-3",
        tglTagihan: "25-2-2023",
        tglDenda: "10-3-2023",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120642",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
      {
        id: 454,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 550000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2023-4",
        tglTagihan: "25-3-2023",
        tglDenda: "10-4-2023",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120642",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
      {
        id: 455,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 550000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2023-2",
        tglTagihan: "25-1-2023",
        tglDenda: "10-2-2023",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120642",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
      {
        id: 456,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 550000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2023-5",
        tglTagihan: "25-4-2023",
        tglDenda: "10-5-2023",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120642",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
      {
        id: 457,
        period: "Tahun Ajaran 2022/2023 ",
        unit: "SD MARIA FRANSISKA",
        iuran: "Uang Sekolah",
        jumlahTagihan: 550000,
        jumlahDenda: 0,
        jumlahAdmin: 5000,
        bulanIuran: "2023-6",
        tglTagihan: "25-5-2023",
        tglDenda: "10-6-2023",
        cicilanKe: 0,
        caraBayar: "",
        vBcaKode: "120642",
        tanggalBayar: "",
        jumlahBayar: "",
        userBayar: "",
        buktiBayar: "",
        statusBayar: false,
        keterangan: "",
      },
    ],
  },
];

function Footer({ data }) {
  const totalSemua = () => {
    let res = 0;
    data.map((student) => {
      student.payments.map((payment) => (res += payment.jumlahTagihan));
    });
    return numberWithCommas(res);
  };
  return (
    <PdfView style={styles.header}>
      <PdfText>Jumlah murid : {data.length}</PdfText>
      <PdfText>Total Uang Sekolah : {totalSemua()}</PdfText>
    </PdfView>
  );
}

export default Footer;
