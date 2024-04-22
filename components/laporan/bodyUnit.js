import React from "react";
import {
  Text as PdfText,
  View as PdfView,
  StyleSheet,
} from "@react-pdf/renderer";
import CardSiswa from "./cardSiswa";

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 20,
    borderBottom: 1,
    marginTop: 5,
    marginBottom: 3,
  },
  kata: {
    fontSize: 14,
    marginBottom: 6,
  },
});

function BodyLaporanUnit({ data }) {
  return (
    <PdfView>
      {Object.entries(data).map((detail) => {
        return (
          <PdfView style={styles.main} key={detail[0]}>
            <PdfText style={styles.kata}>kelas: {detail[0]}</PdfText>
            {detail[1].map((student) => (
              <CardSiswa
                data={student}
                key={student.id}
                panjang={student.length}
              />
            ))}
          </PdfView>
        );
      })}
    </PdfView>
  );
}

export default BodyLaporanUnit;
