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

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    color: "black",
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  viewer: {
    width: "100vw", //the pdf viewer will take up all of the width and height
    height: "100vh",
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

function detailDocument() {
  return (
    <PDFViewer style={styles.viewer}>
      <PdfDocument>
        <PdfPage size="A4" style={styles.page}>
          <PdfView style={styles.section}>
            <PdfText>Section #1</PdfText>
            <PdfView style={styles.cover}>
              {Array(40)
                .fill()
                .map((data, id) => (
                  <PdfView style={styles.line} key={id}>
                    <PdfView></PdfView>
                  </PdfView>
                ))}
            </PdfView>
          </PdfView>
        </PdfPage>
      </PdfDocument>
    </PDFViewer>
  );
}

export default detailDocument;
