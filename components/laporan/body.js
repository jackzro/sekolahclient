import React from "react";
import {
  Text as PdfText,
  View as PdfView,
  StyleSheet,
} from "@react-pdf/renderer";
import CardSiswa from "./cardSiswa";

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 20,
    borderBottom: 1,
  },
  kata: {
    fontSize: 14,
    marginBottom: 6,
  },
});

function BodyLaporan({ data }) {
  return (
    <PdfView>
      <PdfView style={styles.main}>
        <PdfText style={styles.kata}>Unit: {data[0].unit}</PdfText>
        <PdfText style={styles.kata}>kelas: {data[0].grade}</PdfText>
      </PdfView>
      {data.map((data) => (
        <CardSiswa data={data} key={data.id} panjang={data.length} />
      ))}
    </PdfView>
  );
}

export default BodyLaporan;
