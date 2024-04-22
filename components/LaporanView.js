import { laporanUnit, typeUnit } from "@helpers/unit";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useLaporan, useLaporanUnit } from "@services/student";
import Laporan from "@components/laporan";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { typeFile } from "@helpers/unit";
import Loading from "./loading";
import { chooseByUnit } from "@helpers/help";

function LaporanView({ user }) {
  const { mutate: generateLaporan } = useLaporan();
  const { mutate: generateLaporanUnit } = useLaporanUnit();
  const [unit, setUnit] = useState([]);
  const [jenis, setJenis] = useState("");
  const [laporan, setLaporan] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (user.role !== "admin") {
      unitHandler(chooseByUnit(user.role));
    }
  }, []);

  const unitHandler = (value) => {
    switch (value) {
      case "KB/TK MARIA YACHINTA":
        setUnit(laporanUnit[0].grade);
        break;
      case "SD MARIA FRANSISKA":
        setUnit(laporanUnit[1].grade);
        break;
      case "SMP PAX ECCLESIA":
        setUnit(laporanUnit[2].grade);
        break;
      case "SMA PAX PATRIAE":
        setUnit(laporanUnit[3].grade);
        break;
    }
    setLaporan([]);
    return;
  };

  const onHandleSubmit = async (detail) => {
    setLaporan([]);
    generateLaporanUnit(detail, {
      onSuccess: async (data) => {
        const obj = {};
        unit.map((kelas) => {
          obj[kelas] = [];
        });

        data.map((student) => {
          if (obj[student.grade] === undefined) {
            obj[student.grade] = [];
            obj[student.grade].push(student);
          } else {
            obj[student.grade].push(student);
          }
        });

        setLaporan(obj);
        toast("Data sudah di update ke " + jenis + " " + detail.type);
      },
      onError: async (error) => {
        console.log(error);
      },
    });
    // generateLaporan(detail, {
    //   onSuccess: async (data) => {
    //     console.log(data);
    //     setLaporan(data);
    //     toast("Data sudah di update ke " + detail.grade);
    //   },
    //   onError: async (error) => {
    //     console.log(error);
    //   },
    // });
  };
  return (
    <div>
      <form className="flex space-x-6" onSubmit={handleSubmit(onHandleSubmit)}>
        {user.role !== "admin" ? (
          <select
            className="w-full max-w-xs select select-bordered"
            {...register("type")}
            defaultValue={chooseByUnit(user.role)}
          >
            <option value={chooseByUnit(user.role)}>
              {chooseByUnit(user.role)}
            </option>
            {/* {laporanUnit.map((data) => (
              <option value={data.name} key={data.id}>
                {data.name}
              </option>
            ))} */}
          </select>
        ) : (
          <select
            className="w-full max-w-xs select select-bordered"
            {...register("type")}
            onChange={(e) => unitHandler(e.target.value)}
          >
            <option value="">Unit</option>
            {laporanUnit.map((data) => (
              <option value={data.name} key={data.id}>
                {data.name}
              </option>
            ))}
          </select>
        )}

        {unit.length !== 0 && (
          <select
            className="w-full max-w-xs select select-bordered"
            {...register("jenis")}
            onChange={(e) => setJenis(e.target.value)}
          >
            <option value="">Jenis</option>
            {typeFile.map((data) => (
              <option value={data.name} key={data.id}>
                {data.name}
              </option>
            ))}
          </select>
        )}

        {/* {unit.length !== 0 && (
          <select
            className="w-full max-w-xs select select-bordered"
            {...register("grade")}
            onChange={() => setLaporan([])}
          >
            <option value="">Kelas</option>
            {unit.map((data) => (
              <option value={data} key={data}>
                {data}
              </option>
            ))}
          </select>
        )} */}
        {jenis.length !== 0 && (
          <button className="text-black btn btn-success" type="submit">
            Generate
          </button>
        )}
      </form>

      {laporan.length !== 0 ? (
        <PDFDownloadLink
          document={<Laporan data={laporan} jenis={jenis} />}
          fileName={`laporan.pdf`}
          aria-label="Save PDF"
        >
          <div className="mt-6">
            <span className="text-black">File ready to Download</span>
            <button className="w-full text-white btn">Download</button>
          </div>
        </PDFDownloadLink>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default LaporanView;
