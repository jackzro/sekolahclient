import React from "react";
import {
  Text as PdfText,
  View as PdfView,
  Image as PdfImage,
  StyleSheet,
} from "@react-pdf/renderer";
import CardBody from "./cardBody";
import { numberWithCommas } from "@helpers/help";
import Footer from "./footer";

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  header: { display: "flex", flexDirection: "row", flexWrap: "nowrap" },
  kata: {
    fontSize: 12,
    marginBottom: 6,
  },
  no: {
    width: "5%",
  },
  desk: {
    width: "50%",
  },
  juml: {
    width: "15%",
  },
  total: {
    width: "15%",
    textAlign: "right",
  },
  jumlah: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
  },
  denda: {
    width: "15%",
    textAlign: "right",
  },
});

function CardSiswa({ data }) {
  const totalJumlah = () => {
    let res = 0;
    data.payments.map((payment) => {
      res += payment.jumlahTagihan;
      res += payment.jumlahDenda;
    });
    return numberWithCommas(res);
  };
  return (
    <PdfView style={styles.main}>
      <PdfText style={styles.kata}>Id Siswa : {data.id} </PdfText>
      <PdfView style={styles.jumlah}>
        <PdfText style={styles.kata}>Nama Siswa : {data.name}</PdfText>
        <PdfText style={styles.kata}>{totalJumlah()}</PdfText>
      </PdfView>

      <PdfView style={styles.header}>
        <PdfView style={styles.no}>
          <PdfText style={styles.kata}>No</PdfText>
        </PdfView>
        <PdfView style={styles.desk}>
          <PdfText style={styles.kata}>Deskripsi Tagihan</PdfText>
        </PdfView>
        <PdfView style={styles.juml}>
          <PdfText style={styles.kata}>Jml Tagihan</PdfText>
        </PdfView>
        <PdfView style={styles.denda}>
          <PdfText style={styles.kata}>Jml Denda</PdfText>
        </PdfView>
        <PdfView style={styles.total}>
          <PdfText style={styles.kata}>Total</PdfText>
        </PdfView>
      </PdfView>
      {data.length !== 0 &&
        data.payments.map((payment, index) => (
          <CardBody data={payment} index={index} key={payment.id} />
        ))}
    </PdfView>
  );
}

export default CardSiswa;
