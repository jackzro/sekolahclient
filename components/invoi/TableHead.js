import React from "react";
import {
  Text as PdfText,
  View as PdfView,
  StyleSheet,
} from "@react-pdf/renderer";

const stylesTableHead = StyleSheet.create({
  header: {
    backgroundColor: "#666",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    marginHorizontal: 20,
    padding: 4,
  },
  no: {
    width: "10%",
    paddingHorizontal: 4,
    paddingVertical: 8,
    color: "white",
  },
  keterangan: {
    width: "60%",
    paddingHorizontal: 4,
    paddingVertical: 8,
    color: "white",
  },
  jumlah: {
    width: "30%",
    paddingHorizontal: 4,
    paddingVertical: 8,
    color: "white",
  },
});

function TableHead() {
  return (
    <PdfView style={stylesTableHead.header}>
      <PdfView style={stylesTableHead.no}>
        <PdfText>No</PdfText>
      </PdfView>
      <PdfView style={stylesTableHead.keterangan}>
        <PdfText>Keterangan</PdfText>
      </PdfView>
      <PdfView style={stylesTableHead.jumlah}>
        <PdfText>Jumlah</PdfText>
      </PdfView>
    </PdfView>
  );
}

export default TableHead;
