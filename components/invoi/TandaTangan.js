import React from "react";
import {
  Text as PdfText,
  View as PdfView,
  StyleSheet,
} from "@react-pdf/renderer";
import { getBulan } from "@helpers/help";

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 20,
  },
  tanda: {
    width: "60%",
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  tangan: {
    width: "40%",
    paddingHorizontal: 4,
    paddingVertical: 8,
    marginTop: 10,
  },
  admin: {
    textAlign: "center",
  },
  kosong: {
    height: 100,
    width: 100,
  },
});

function TandaTangan() {
  return (
    <PdfView style={styles.header}>
      <PdfView style={styles.tanda}></PdfView>
      <PdfView style={styles.tangan}>
        <PdfText>
          Bekasi, {new Date().getDate()} {getBulan(new Date().getMonth() + 1)}{" "}
          {new Date().getFullYear()}
        </PdfText>
        <PdfText style={styles.admin}>Admin</PdfText>
        <PdfText style={styles.kosong}></PdfText>
        <PdfText style={styles.admin}>
          {"(                            )"}
        </PdfText>
      </PdfView>
    </PdfView>
  );
}

export default TandaTangan;
