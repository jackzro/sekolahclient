import React, { useState, useEffect } from "react";
import {
  PDFViewer,
  Page as PdfPage,
  Text as PdfText,
  View as PdfView,
  Document as PdfDocument,
  StyleSheet,
} from "@react-pdf/renderer";
import Invoice from "@components/invoice";
import Invoi from "@components/invoi";
import Laporan from "@components/laporan";

// Create styles

// Create Document Component
const RwrwDocument = () => {
  const [flag, setflag] = useState(false);
  useEffect(() => {
    setflag(true);
  }, []);
  return (
    <>
      {flag && (
        <Laporan />
        // <PDFViewer style={styles.viewer}>
        //   <PdfDocument>
        //     <PdfPage size="A4" style={styles.page}>
        //       <PdfView style={styles.section}>
        //         <PdfText>Section #1</PdfText>
        //       </PdfView>
        //       <PdfView style={styles.section}>
        //         <PdfText>Section #2</PdfText>
        //       </PdfView>
        //     </PdfPage>
        //   </PdfDocument>
        // </PDFViewer>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    color: "black",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  viewer: {
    width: "100vw", //the pdf viewer will take up all of the width and height
    height: "100vh",
  },
});

export default RwrwDocument;
