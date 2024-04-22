import React from "react";
import {
  Text as PdfText,
  View as PdfView,
  Image as PdfImage,
  StyleSheet,
} from "@react-pdf/renderer";
import { numberWithCommas } from "@helpers/help";

const styles = StyleSheet.create({
  header: {
    borderTop: 2,
    padding: 10,
  },
  viewMain: {
    marginTop: 6,
  },
  total: {
    marginTop: 6,
  },
});

function FooterUnit({ data, jenis }) {
  const totalSemua = (murid) => {
    let res = 0;
    murid.map((student) => {
      student.payments.map((payment) => {
        const jumlahTotal = payment.jumlahTagihan + payment.jumlahDenda;
        return (res += jumlahTotal);
      });
    });

    return res;
  };

  // const totalDenda = (murid) => {
  //   let res = 0;
  //   murid.map((student) => {
  //     student.payments.map((payment) => (res += payment.jumlahDenda));
  //   });

  //   return res;
  // };

  const totalSemuaMurid = () => {
    let res = 0;
    console.log(data);
    Object.entries(data).map((detail) => {
      res += detail[1].length;
    });
    return res;
  };

  const totalSemuaUnit = () => {
    let obj = {};
    let result = 0;
    Object.entries(data).map((detail) => {
      if (obj[detail[0]] === undefined) {
        obj[detail[0]] = totalSemua(detail[1]);
      }
    });
    Object.entries(obj).map((jumlah) => {
      result += jumlah[1];
    });
    return result;
  };

  const totalSemuaDenda = () => {
    let obj = {};
    let result = 0;
    Object.entries(data).map((detail) => {
      if (obj[detail[0]] === undefined) {
        obj[detail[0]] = totalDenda(detail[1]);
      }
    });
    Object.entries(obj).map((jumlah) => {
      result += jumlah[1];
    });
    return result;
  };

  return (
    <PdfView style={styles.header}>
      {Object.entries(data).map((detail) => {
        return (
          <PdfView key={detail[0]} style={styles.viewMain}>
            <PdfText>
              Jumlah murid {detail[0]} : {detail[1].length}
            </PdfText>

            <PdfText>
              Total {jenis} {detail[0]} : Rp{" "}
              {numberWithCommas(totalSemua(detail[1]))}
            </PdfText>
          </PdfView>
        );
      })}
      <PdfText style={styles.total}>
        Total Murid : {numberWithCommas(totalSemuaMurid())}
      </PdfText>
      <PdfText style={styles.total}>
        Total {jenis} : Rp {numberWithCommas(totalSemuaUnit())}
      </PdfText>

      {/* <PdfText style={styles.total}>
        Total Denda : Rp {numberWithCommas(totalSemuaDenda())}
      </PdfText> */}
    </PdfView>
  );
}

export default FooterUnit;
