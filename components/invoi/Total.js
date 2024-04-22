import React from "react";
import {
  Text as PdfText,
  View as PdfView,
  StyleSheet,
} from "@react-pdf/renderer";
import { numberWithCommas } from "@helpers/help";

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 20,
  },
  grand: {
    width: "60%",
    paddingHorizontal: 4,
    paddingVertical: 8,
    textAlign: "right",
  },
  total: {
    width: "30%",
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  help: {
    width: "10%",
  },
});

function Total({ total }) {
  return (
    <PdfView style={styles.header}>
      <PdfView style={styles.grand}>
        <PdfText>Grand Total: </PdfText>
      </PdfView>
      <PdfView style={styles.help}></PdfView>
      <PdfView style={styles.total}>
        <PdfText>Rp. {numberWithCommas(total)} </PdfText>
      </PdfView>
    </PdfView>
  );
}

export default Total;
