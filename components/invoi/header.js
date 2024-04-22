import React from "react";
import {
  Text as PdfText,
  View as PdfView,
  Image as PdfImage,
  StyleSheet,
} from "@react-pdf/renderer";
import { generateCodeInvoiceGrade } from "@helpers/help";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    color: "black",
  },
  section: {
    // margin: 10,
    padding: 10,
    display: "flex",
    flexDirection: "row",
  },
  viewer: {
    width: "100vw", //the pdf viewer will take up all of the width and height
    height: "100vh",
  },
  logo: {
    width: 80,
    height: 80,
  },
  textLogo: {
    fontSize: 16,
  },
  textall: {
    fontSize: 12,
    marginTop: 6,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderBottom: 10,
  },
  styleInvoice: {
    padding: 30,
  },
  line: {
    backgroundColor: "black",
    // width: "100%",
    height: 10,
    border: "white",
    borderWidth: 3,
  },
  cover: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    height: 10,
    backgroundColor: "black",
  },
});

function HeaderInvoice({ data }) {
  const codeGenerate = () => {
    const numberofGrade = generateCodeInvoiceGrade(data[0].student.grade);
    const numberofSiswaID = Number(data[0].student.id.charAt(4));
    const numberofDate = new Date().getDate();
    const finalNumber =
      Math.round((numberofDate + numberofGrade + numberofSiswaID) / 3) +
      (data.length - 1);
    return finalNumber;
  };
  return (
    <PdfView>
      <PdfView style={styles.header}>
        <PdfView style={styles.section}>
          <PdfView>
            <PdfImage
              src={{
                uri: "https://i.ibb.co/2tMP02r/ykb-logo.png",
              }}
              style={styles.logo}
            />
          </PdfView>
          <PdfView style={{ marginLeft: 10 }}>
            <PdfText style={[styles.textLogo, { fontWeight: "bold" }]}>
              YayasaN Keluarga Bunda.
            </PdfText>
            <PdfText style={styles.textall}>
              Jl. Galaxy RayA No 12 G-Jakasetia
            </PdfText>
            <PdfText style={styles.textall}>Bekasi</PdfText>
            <PdfText style={styles.textall}>0218203231</PdfText>
          </PdfView>
        </PdfView>
        <PdfView style={styles.styleInvoice}>
          <PdfText style={{ fontSize: 30, fontWeight: "bold" }}>
            INVOICE
          </PdfText>
        </PdfView>
      </PdfView>
      <PdfView style={styles.cover}>
        {Array(codeGenerate())
          .fill()
          .map((data, id) => (
            <PdfView style={styles.line} key={id}>
              <PdfView></PdfView>
            </PdfView>
          ))}
      </PdfView>
    </PdfView>
  );
}

export default HeaderInvoice;
