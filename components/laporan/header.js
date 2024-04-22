import React from "react";
import {
  Text as PdfText,
  View as PdfView,
  Image as PdfImage,
  StyleSheet,
} from "@react-pdf/renderer";

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
  },
  styleInvoice: {
    padding: 30,
  },
  terluar: {
    // padding: 10,
  },
  print: {
    paddingHorizontal: 20,
  },
});

function HeaderLaporan() {
  return (
    <PdfView style={styles.terluar}>
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
          <PdfView style={{ marginLeft: 4 }}>
            <PdfText style={[styles.textLogo, { fontWeight: "bold" }]}>
              Yayasan Keluarga Bunda
            </PdfText>
            <PdfText style={styles.textall}>
              Jl. Galaxy Raya No 12 G-Jakasetia
            </PdfText>
            <PdfText style={styles.textall}>Bekasi</PdfText>
            <PdfText style={styles.textall}>0218203231</PdfText>
          </PdfView>
        </PdfView>
        <PdfView style={styles.styleInvoice}>
          <PdfText style={{ fontSize: 20, fontWeight: "bold" }}>
            Laporan Tunggakan
          </PdfText>
        </PdfView>
      </PdfView>
      <PdfView style={styles.print}>
        <PdfText style={{ fontSize: 14 }}>
          Print: {new Date().getDate()}/{new Date().getMonth() + 1}/
          {new Date().getFullYear()}
        </PdfText>
      </PdfView>
    </PdfView>
  );
}

export default HeaderLaporan;
