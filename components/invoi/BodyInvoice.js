import React from "react";
import {
  Text as PdfText,
  View as PdfView,
  StyleSheet,
} from "@react-pdf/renderer";
import { generateRandomNDigits, getRandomIntInclusive } from "@helpers/help";

const stylesBody = StyleSheet.create({
  header: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 6,
    // borderBottom: 6,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  rightSection: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 20,
    paddingTop: 10,
  },
  leftSection: {
    display: "flex",
    flexDirection: "row",
    marginRight: 60,
    paddingTop: 10,
  },
});

function BodyInvoice({ data }) {
  return (
    <PdfView style={stylesBody.header}>
      <PdfView style={stylesBody.rightSection}>
        <PdfView>
          <PdfText style={stylesBody.text}>Nama Siswa </PdfText>
          <PdfText style={stylesBody.text}>Siswa ID </PdfText>
          <PdfText style={stylesBody.text}>Kelas </PdfText>
        </PdfView>
        <PdfView style={{ marginLeft: 10 }}>
          <PdfText style={stylesBody.text}>: {data[0].student.name} </PdfText>
          <PdfText style={stylesBody.text}>: {data[0].student.id} </PdfText>
          <PdfText style={stylesBody.text}>: {data[0].student.grade} </PdfText>
        </PdfView>
      </PdfView>
      <PdfView>
        <PdfView style={stylesBody.leftSection}>
          <PdfView>
            {/* <PdfText style={stylesBody.text}>No Trans </PdfText> */}
            <PdfText style={stylesBody.text}>Tanggal </PdfText>
            <PdfText style={stylesBody.text}>Jam Cetak </PdfText>
          </PdfView>
          <PdfView style={{ marginLeft: 10 }}>
            {/* <PdfText style={stylesBody.text}>
              : {generateRandomNDigits(5)}
            </PdfText> */}
            <PdfText style={stylesBody.text}>
              : {new Date().getDate()}/{new Date().getMonth() + 1}/
              {new Date().getFullYear()}{" "}
            </PdfText>
            <PdfText style={stylesBody.text}>
              : {new Date().toLocaleTimeString()}
            </PdfText>
          </PdfView>
        </PdfView>
      </PdfView>
    </PdfView>
  );
}

export default BodyInvoice;
