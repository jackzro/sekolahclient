import React from "react";
import {
  Text as PdfText,
  View as PdfView,
  StyleSheet,
} from "@react-pdf/renderer";
import { detailKeterangan, numberWithCommas } from "@helpers/help";

const stylesTableBody = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    marginLeft: 20,
    marginRight: 20,
    padding: 4,
  },
  no: {
    width: "10%",
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  keterangan: {
    width: "60%",
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  jumlah: {
    width: "30%",
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
});

function TableBody({ data, no }) {
  return (
    <PdfView style={stylesTableBody.header}>
      <PdfView style={stylesTableBody.no}>
        <PdfText>{no + 1}</PdfText>
      </PdfView>
      <PdfView style={stylesTableBody.keterangan}>
        <PdfText>
          {data.iuran} {detailKeterangan(data.bulanIuran.split("-"))}
        </PdfText>
      </PdfView>
      <PdfView style={stylesTableBody.jumlah}>
        <PdfText>Rp. {numberWithCommas(data.jumlahTagihan)}</PdfText>
      </PdfView>
    </PdfView>
  );
}

export default TableBody;
