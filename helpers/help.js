export const textToJson = (text) => {
  const arr = text.split("\n");
  let res = [];
  let baru = [];
  let flag = false;
  arr.map((data) => {
    if (data.includes("SUB TOTAL TRANSAKSI")) {
      flag = false;
    }
    if (flag) {
      baru.push(data.trim().split(/\s+/g));
    }
    if (data.includes("SUB-COMP")) {
      flag = true;
    }
  });
  baru.map((datas) => {
    let newFormat = {};
    newFormat.no = datas[0];
    newFormat.vBcaKode = datas[1];
    datas.map((data) => {
      if (data === newFormat.no) {
        return;
      }
      if (data === "IDR") {
        flag = false;
        return;
      }
      if (flag) {
        if (newFormat.name === undefined) {
          newFormat.name = `${data}`;
          return;
        } else {
          newFormat.name += ` ${data}`;
          return;
        }
      }
      if (data === newFormat.vBcaKode) {
        flag = true;
        return;
      }
      if (newFormat.totalPembayaran === undefined) {
        newFormat.totalPembayaran = Number(
          data.replace(".00", "").replace(/,/g, "")
        );
        return;
      } else if (newFormat.tanggalTransaksi === undefined) {
        newFormat.tanggalTransaksi = data;
        return;
      } else if (newFormat.waktuTransaksi === undefined) {
        newFormat.waktuTransaksi = data;
        return;
      } else if (newFormat.lokasi === undefined) {
        newFormat.lokasi = data;
        return;
      }
    });
    res.push(newFormat);
  });
  return res;
};

export const getBulan = (bulan) => {
  switch (bulan) {
    case 1:
      return "Januari";
    case 2:
      return "Februari";
    case 3:
      return "Maret";
    case 4:
      return "April";
    case 5:
      return "Mei";
    case 6:
      return "Juni";
    case 7:
      return "Juli";
    case 8:
      return "Agustus";
    case 9:
      return "September";
    case 10:
      return "Oktober";
    case 11:
      return "November";
    case 12:
      return "Desember";
  }
};

export const generateRandomNDigits = (n) => {
  return Math.floor(Math.random() * (9 * Math.pow(10, n))) + Math.pow(10, n);
};

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
};

export const detailKeterangan = (data) => {
  const bulan = getBulan(Number(data[1]));
  const tahun = data[0];
  return `${bulan} ${tahun}`;
};

export const findNthTerm = (a, d, n) => {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum = sum + a;
    a = a + d;
  }
  return sum;
};

export const formatUangAll = (data) => {
  let res = {};
  let finres = [];
  data.map((student) => {
    if (res[student.id] === undefined) {
      res[student.id] = {
        name: student.name,
        "Uang Sekolah": [],
        "Uang Kegiatan": [],
        "Uang Ujian": [],
        "Uang Ekstrakurikuler": [],
        "Uang Daftar Ulang": [],
        "Uang PMB": [],
        dendaActive: student.dendaActive,
      };
    }
    student.payments.map((payment) => {
      res[student.id][payment.iuran].push(payment);
    });
  });
  Object.keys(res).forEach((key, index) => {
    if (res[key]["Uang Sekolah"].length !== 0) {
      finres.push(
        formatUS(
          res[key]["Uang Sekolah"],
          res[key].name,
          key
          // (res[key].dendaActive = true)
        )
      );
    }
    if (res[key]["Uang Kegiatan"].length !== 0) {
      finres.push(
        formatUangKegiatan(res[key]["Uang Kegiatan"], res[key].name, key)
      );
    }
    if (res[key]["Uang Ujian"].length !== 0) {
      finres.push(formatUangUjian(res[key]["Uang Ujian"], res[key].name, key));
    }
    if (res[key]["Uang Daftar Ulang"].length !== 0) {
      finres.push(
        formatUangDaftarUlang(res[key]["Uang Daftar Ulang"], res[key].name, key)
      );
    }
    if (res[key]["Uang PMB"].length !== 0) {
      finres.push(formatUangPMB(res[key]["Uang PMB"], res[key].name, key));
    }
  });
  return finres;
};

export const formatUS = (data, name, id, dendaActive) => {
  let total = 0;
  let keterangan = "";
  let countDenda = 0;
  if (data.length > 1) {
    keterangan = `Uang Sekolah - ${getBulan(
      Number(data[0].bulanIuran.split("-")[1])
    )} ${data[0].bulanIuran.split("-")[0]} - ${getBulan(
      Number(data[data.length - 1].bulanIuran.split("-")[1])
    )} ${data[data.length - 1].bulanIuran.split("-")[0]}`;
  } else {
    keterangan = `Uang Sekolah - ${getBulan(
      Number(data[0].bulanIuran.split("-")[1])
    )} ${data[0].bulanIuran.split("-")[0]}`;
  }
  data.map((payment) => {
    if (
      new Date(payment.tglDenda) <=
      new Date(
        `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}`
      )
    ) {
      countDenda += 1;
    }

    total += payment.jumlahTagihan;
    total += payment.jumlahDenda;
  });

  if (dendaActive === true) {
    total = total + findNthTerm(25000, 25000, countDenda);
  }

  return {
    id_siswa: "1" + id,
    nama_siswa: name,
    total_tagihan: total,
    keterangan,
  };
};

export const formatUangKegiatan = (data, name, id) => {
  let total = 0;
  data.map((payment) => {
    total += payment.jumlahTagihan;
  });

  return {
    id_siswa: "2" + id,
    nama_siswa: name,
    total_tagihan: total,
    keterangan: "Uang Kegiatan",
  };
};

export const formatUangUjian = (data, name, id) => {
  let total = 0;
  data.map((payment) => {
    total += payment.jumlahTagihan;
  });

  return {
    id_siswa: "3" + id,
    nama_siswa: name,
    total_tagihan: total,
    keterangan: "Uang Ujian",
  };
};

export const formatUangDaftarUlang = (data, name, id) => {
  let total = 0;
  data.map((payment) => {
    total += payment.jumlahTagihan;
  });

  return {
    id_siswa: "4" + id,
    nama_siswa: name,
    total_tagihan: total,
    keterangan: "Uang Daftar Ulang",
  };
};

export const formatUangPMB = (data, name, id) => {
  let total = 0;
  data.map((payment) => {
    total += payment.jumlahTagihan;
  });

  return {
    id_siswa: "5" + id,
    nama_siswa: name,
    total_tagihan: total,
    keterangan: "Uang PMB",
  };
};

export const formatUangSekolahExcel = (data) => {
  const res = data.map((student) => {
    let total = 0;
    let keterangan = "";
    if (student.payments.length > 1) {
      keterangan = `Uang Sekolah - ${getBulan(
        Number(student.payments[0].bulanIuran.split("-")[1])
      )} ${student.payments[0].bulanIuran.split("-")[0]} - ${getBulan(
        Number(
          student.payments[student.payments.length - 1].bulanIuran.split("-")[1]
        )
      )} ${student.payments[0].bulanIuran.split("-")[0]}`;
    } else {
      keterangan = `Uang Sekolah - ${getBulan(
        Number(student.payments[0].bulanIuran.split("-")[1])
      )} ${student.payments[0].bulanIuran.split("-")[0]}`;
    }

    student.payments.map((payment) => {
      total += payment.jumlahTagihan;
    });
    return {
      id_siswa: student.vBcaSekolah,
      nama_siswa: student.name,
      total_tagihan: total,
      keterangan,
    };
  });
  return res;
};

export const formatUangKegiatanExcel = (data) => {
  const res = data.map((student) => {
    let total = 0;
    student.payments.map((payment) => {
      total += payment.jumlahTagihan;
    });
    return {
      id_siswa: "2" + student.id,
      nama_siswa: student.name,
      total_tagihan: total,
      keterangan: "Uang Kegiatan",
    };
  });
  return res;
};

export const formatUangUjianExcel = (data) => {
  const res = data.map((student) => {
    let total = 0;
    student.payments.map((payment) => {
      total += payment.jumlahTagihan;
    });
    return {
      id_siswa: "3" + student.id,
      nama_siswa: student.name,
      total_tagihan: total,
      keterangan: "Uang Ujian",
    };
  });
  return res;
};

export const pathByUnit = (role) => {
  switch (role) {
    case "tk":
      return "/unit/KB&TK%20MARIA%20YACHINTA";
    case "sd":
      return "/unit/SD%20MARIA%20FRANSISKA";
    case "smp":
      return "/unit/SMP%20PAX%20ECCLESIA";
    case "sma":
      return "/unit/SMA%20PAX%20PATRIAE";
  }
};

export const chooseByUnit = (role) => {
  switch (role) {
    case "tk":
      return "KB/TK MARIA YACHINTA";
    case "sd":
      return "SD MARIA FRANSISKA";
    case "smp":
      return "SMP PAX ECCLESIA";
    case "sma":
      return "SMA PAX PATRIAE";
  }
};

export const dicideAccess = (id, role) => {
  if (role === "admin" || role === "fotocopy") {
    return true;
  }

  if (id[0] === "1" && role === "tk") {
    return true;
  } else if (id[0] === "2" && role === "sd") {
    return true;
  } else if (id[0] === "3" && role === "smp") {
    return true;
  } else if (id[0] === "4" && role === "sma") {
    return true;
  }
  return false;
};

export const pathBlock = (path, role) => {
  if (path === "KB&TK MARIA YACHINTA" && role === "tk") {
    return true;
  } else if (path === "SD MARIA FRANSISKA" && role === "sd") {
    return true;
  } else if (path === "SMP PAX ECCLESIA" && role === "smp") {
    return true;
  } else if (path === "SMA PAX PATRIAE" && role === "sma") {
    return true;
  }

  return false;
};

export const generateCodeInvoiceGrade = (grade) => {
  switch (grade) {
    case "PG":
      return 15;
    case "TKA":
      return 1;
    case "TKB":
      return 3;
    case "SD 1":
      return 5;
    case "SD 2":
      return 7;
    case "SD 3":
      return 9;
    case "SD 4":
      return 11;
    case "SD 5":
      return 13;
    case "SD 6":
      return 2;
    case "SMP 7":
      return 4;
    case "SMP 8":
      return 6;
    case "SMP 9":
      return 8;
    case "SMA 10":
      return 10;
    case "SMA 11":
      return 12;
    case "SMA 12":
      return 14;
  }
};

export const formatINA = (datas) => {
  const fullYear = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  let res = [];
  console.log((month % 12) + 1, (month % 12) + 1 < 10);
  datas.map((data) => {
    let text = `77788000000${data.id_siswa},${data.nama_siswa},${
      data.total_tagihan
    },${fullYear}-${month < 10 ? `0${month}` : month}-${
      new Date().getDate() < 10
        ? `0${new Date().getDate()}`
        : new Date().getDate()
    },${fullYear}-${
      (month % 12) + 1 < 10 ? `0${(month % 12) + 1}` : (month % 12) + 1
    }-${daysInMonth(month, fullYear)},${fullYear}-${
      month < 10 ? `0${month + 1}` : month + 1
    }\n`;
    res.push(text);
  });
  return res;
};

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}
