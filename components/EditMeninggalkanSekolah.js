import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import Input from "./Input";
import range from "lodash/range";
import { getYear, getMonth } from "date-fns";

function EditMeninggalkanSekolah({ data, id, onClose, handleMutate }) {
  const [startDate, setStartDate] = useState(new Date(data.tglKeluar));
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
    data.tglKeluar = tanggal;
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
              <span className="text-lg text-black">Tamat Belajar/Lulus : </span>
            </div>

            <Input
              label="Tahun Tamat"
              value="tahunTamat"
              data={data}
              register={register}
            />
            <Input
              label="Nomor Ijazah/STTB"
              value="noIjzahSTTB"
              data={data}
              register={register}
            />
            <Input
              label="Melanjutkan ke Sekolah"
              value="melanjutKeSekolah"
              data={data}
              register={register}
            />
          </div>
          <div className="flex flex-col space-y-6">
            <div>
              <span className="text-lg text-black">Pindah Sekolah : </span>
            </div>
            <Input
              label="Tingkat/Kelas yang ditinggalkan"
              value="kelasDitinggalkan"
              data={data}
              register={register}
            />
            <Input
              label="Ke Sekolah"
              value="keSekolah"
              data={data}
              register={register}
            />

            <Input
              label="Ke Tingkat"
              value="keTingkat"
              data={data}
              register={register}
            />
          </div>
          <div className="flex flex-col space-y-6">
            <div>
              <span className="text-lg text-black">Keluar Sekolah : </span>
            </div>
            <Input
              label="Alasan Keluar Sekolah"
              value="alasanKeluarSekolah"
              data={data}
              register={register}
            />
            <label className="text-lg text-black">
              Tanggal Keluar Sekolah:{" "}
            </label>

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
          </div>
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

export default EditMeninggalkanSekolah;
