import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import Input from "./Input";
import range from "lodash/range";
import { getYear, getMonth } from "date-fns";

function EditStudent({ data, id, onClose, handleMutate }) {
  const [startDate, setStartDate] = useState(new Date(data.birthDate));
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
    data.birthDate = tanggal;
    data.id = id;
    data.saudaraKandung = 0;
    data.saudaraAngkat = 0;
    data.saudaraTiri = 0;
    handleMutate(data);
    onClose();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onHandleSubmit)} className="flex flex-col">
        <div className="flex gap-10">
          <div className="flex flex-col gap-2">
            <Input label="Nama " value="name" data={data} register={register} />
            <Input
              label="Nama Panggilan"
              value="namaPanggilan"
              data={data}
              register={register}
            />
            <label className="text-lg text-black">Jenis Kelamin : </label>
            <select
              className="w-full max-w-xs select select-bordered"
              {...register("gender")}
              defaultValue={data.gender}
            >
              <option value="pria">Pria</option>
              <option value="wanita">Wanita</option>
            </select>

            <label className="text-lg text-black">Tanggal Lahir: </label>

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
                    margin: 10,
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
              label="Tempat Lahir"
              value="tempatLahir"
              data={data}
              register={register}
            />
            <Input
              label="Agama"
              value="agama"
              data={data}
              register={register}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Input
              label="Kewarganegaraan"
              value="kewarganegaraan"
              data={data}
              register={register}
            />
            <Input
              label="Anak Ke"
              value="anakKe"
              data={data}
              register={register}
            />
            <Input
              label="Golongan Darah"
              value="bloodType"
              data={data}
              register={register}
            />

            <div className="flex flex-col space-y-2">
              <Input
                label="Saudara Kandung"
                value="saudaraKandung"
                data={data}
                register={register}
                type="number"
              />
              <Input
                label="Saudara Tiri"
                value="saudaraTiri"
                data={data}
                register={register}
                type="number"
              />
              <Input
                label="Saudara Angkat"
                value="saudaraAngkat"
                data={data}
                register={register}
                type="number"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Input
              label="Alamat Saat Diterima"
              value="alamat"
              data={data}
              register={register}
            />
            <Input
              label="RT / RW"
              value="rtrw"
              data={data}
              register={register}
            />
            <Input
              label="Desa / Kelurahan"
              value="kelurahan"
              data={data}
              register={register}
            />
            <Input
              label="Kecamatan"
              value="kecamatan"
              data={data}
              register={register}
            />
            <Input
              label="Kabupaten/Kota"
              value="kota"
              data={data}
              register={register}
            />
            <Input
              label="Provinsi"
              value="provinsi"
              data={data}
              register={register}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Input
              label="Bahasa Sehari-hari"
              value="bahasaSeharihari"
              data={data}
              register={register}
            />
            <Input
              label="Kode Pos"
              value="kodepos"
              data={data}
              register={register}
            />
            <Input
              label="No telp"
              value="notelp"
              data={data}
              register={register}
            />
            <Input
              label="Bertempat tinggal pada"
              value="tinggalPada"
              data={data}
              register={register}
            />
            <Input
              label="Jarak ke Sekolah"
              value="jarakKeSekolah"
              data={data}
              register={register}
            />
          </div>
        </div>
        <div className="flex flex-row space-x-6">
          <button type="submit" className="mt-10 btn btn-primary w-[50%]">
            Submit
          </button>
          <button
            type="button"
            className="mt-10 btn btn-secondary w-[50%]"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditStudent;
