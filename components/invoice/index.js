import { PDFViewer, StyleSheet } from "@react-pdf/renderer";
import React from "react";
import PDFDocument from "./Document";
import ImagePdf from "./ImagePdf";
import Page from "./Page";
import Text from "./Text";
import View from "./View";

function Invoice(props) {
  console.log(props);
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
      width: window.innerWidth, //the pdf viewer will take up all of the width and height
      height: window.innerHeight,
    },
  });
  return (
    <PDFViewer style={styles.viewer}>
      <PDFDocument pdfMode={true}>
        <Page className="invoice-wrapper">
          <View className="flex">
            <View className="w-50">
              <ImagePdf />
            </View>
            <View>
              <Text>lolol</Text>
            </View>
          </View>
        </Page>
      </PDFDocument>
    </PDFViewer>
  );
}

export default Invoice;
