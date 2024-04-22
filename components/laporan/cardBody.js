import React from "react";
import {
  Text as PdfText,
  View as PdfView,
  StyleSheet,
} from "@react-pdf/renderer";
import { getBulan, numberWithCommas } from "@helpers/help";

const styles = StyleSheet.create({
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
    textAlign: "right",
  },
  total: {
    width: "15%",
    textAlign: "right",
  },
  denda: {
    width: "15%",
    textAlign: "right",
  },
});

function CardBody({ data, index }) {
  const bulanIuran = (tanggal) => {
    const pisah = tanggal.split("-");
    const bulan = getBulan(Number(pisah[1]));
    return bulan + " " + pisah[0];
  };
  return (
    <PdfView style={styles.header}>
      <PdfView style={styles.no}>
        <PdfText style={styles.kata}>{index + 1}</PdfText>
      </PdfView>
      <PdfView style={styles.desk}>
        <PdfText style={styles.kata}>
          {data.iuran} {bulanIuran(data.bulanIuran)}
        </PdfText>
      </PdfView>
      <PdfView style={styles.juml}>
        <PdfText style={styles.kata}>
          {numberWithCommas(data.jumlahTagihan)}
        </PdfText>
      </PdfView>
      <PdfView style={styles.denda}>
        <PdfText style={styles.kata}>
          {numberWithCommas(data.jumlahDenda)}
        </PdfText>
      </PdfView>
      <PdfView style={styles.total}>
        <PdfText style={styles.kata}>
          {numberWithCommas(data.jumlahTagihan + data.jumlahDenda)}
        </PdfText>
      </PdfView>
    </PdfView>
  );
}

export default CardBody;
