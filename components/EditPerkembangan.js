import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import Input from "./Input";
import range from "lodash/range";
import { getYear, getMonth } from "date-fns";

function EditPerkembangan({ data, id, onClose, handleMutate }) {
  const [startDate, setStartDate] = useState(new Date(data.diterimaTgl));
  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onHandleSubmit = async (data) => {
    const tanggal = `${
      startDate.getMonth() + 1
    }/${startDate.getDate()}/${startDate.getFullYear()}`;
    data.diterimaTgl = tanggal;
    data.id = id;
    handleMutate(data);
    onClose();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onHandleSubmit)} className="flex flex-col">
        <div className="flex gap-6">
          <div className="flex flex-col space-y-6">
            <div>
              <span className="text-lg text-black">
                Masuk menjadi peserta didik baru :{" "}
              </span>
            </div>

            <Input
              label="Asal Sekolah"
              value="asalSekolah"
              data={data}
              register={register}
            />
            <Input
              label="Nama Sekolah"
              value="namaSekolah"
              data={data}
              register={register}
            />
            <Input
              label="Tanggal dan Nomor Ijazaj/STTB"
              value="tglDanNmrIjzSTTB"
              data={data}
              register={register}
            />
          </div>
          <div className="flex flex-col space-y-6">
            <div>
              <span className="text-lg text-black">
                Pindahan dari sekolah lain :{" "}
              </span>
            </div>
            <Input
              label="Nama Sekolah Asal"
              value="namaSekolahAsal"
              data={data}
              register={register}
            />
            <Input
              label="Dari Tingkat"
              value="dariTingkat"
              data={data}
              register={register}
            />
            <label className="text-lg text-black">Diterima Tanggal: </label>

            <DatePicker
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                  >
                    {"<"}
                  </button>
                  <select
                    value={getYear(date)}
                    onChange={({ target: { value } }) => changeYear(value)}
                  >
                    {years.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <select
                    value={months[getMonth(date)]}
                    onChange={({ target: { value } }) =>
                      changeMonth(months.indexOf(value))
                    }
                  >
                    {months.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                  >
                    {">"}
                  </button>
                </div>
              )}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="p-2 text-center text-black border-2 border-black rounded-lg"
            />

            <Input
              label="No. Surat Keterangan"
              value="noSuratKet"
              data={data}
              register={register}
            />
          </div>
          {/* <div className="flex flex-col space-y-6">
            <Input
              label="No. Surat Keterangan"
              value="noSuratKet"
              data={data}
              register={register}
            />
          </div> */}
        </div>
        <div className="flex flex-row mt-10 space-x-6">
          <button type="submit" className=" btn btn-primary w-[50%]">
            Submit
          </button>
          <button
            type="button"
            className=" btn btn-secondary w-[50%]"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPerkembangan;
