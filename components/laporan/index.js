import React from "react";
import {
  PDFViewer,
  Page as PdfPage,
  Text as PdfText,
  View as PdfView,
  Document as PdfDocument,
  Image as PdfImage,
  StyleSheet,
} from "@react-pdf/renderer";
import HeaderLaporan from "./header";
import BodyLaporan from "./body";
import Footer from "./footer";
import BodyUnit from "./bodyUnit";
import FooterUnit from "./footerUnit";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    color: "black",
  },
  viewer: {
    width: "100vw", //the pdf viewer will take up all of the width and height
    height: "100vh",
  },
});

function Laporan({ data, jenis }) {
  return (
    // <PDFViewer style={styles.viewer}>
    <PdfDocument>
      <PdfPage size="A4" style={styles.page}>
        <HeaderLaporan />
        <BodyUnit data={data} />
        <FooterUnit data={data} jenis={jenis} />
      </PdfPage>
    </PdfDocument>
    // </PDFViewer>
  );
}

export default Laporan;
